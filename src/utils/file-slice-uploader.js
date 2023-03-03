import emitter from 'emitter-tiny';
import v from 'assert-tiny'
import axios from 'axios';
import fileHandler from './fileHandler';
import SparkMD5 from 'spark-md5';


let createTimer = (ms = 200) => new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, ms);
});

/**
 * 创建上传流
 * @param {*} file 
 * @param {*} chunkSize 
 * @param {*} event 
 * @param {Promise} doChunkUpload
 * @returns 
 */
function createFlow(file, chunkSize, maxReqest = 6, event = new emitter(), uploadPath) {
    const { getChunk, chunkNums } = fileHandler(file, chunkSize, false)
    let cancel = false;
    let pause = false;
    // eslint-disable-next-line no-extra-boolean-cast
    maxReqest = !!maxReqest ? maxReqest : 1;
    return {
        async start(md5) {
            console.log(`总块数 ${chunkNums}`)
            let remaining = new Array(chunkNums).fill(0).map((_, i) => i);
            let taskPoll = [];
            while (remaining.length || taskPoll.length) {
                if (cancel) {
                    return;
                }
                while (pause) {
                    await createTimer();
                }
                while (!remaining.length && taskPoll.length) {
                    // 等待所有剩余任务做完
                    await createTimer();
                }
                if (!remaining.length && !taskPoll.length) {
                    break;
                }
                let sendIndex = remaining.shift();
                // console.log(`发送 ${sendIndex}`, remaining);
                const chunk = getChunk(sendIndex);
                const formData = new FormData()
                formData.append('chunkFile', chunk)
                formData.append('hash', md5)
                formData.append('all', `${chunkNums}`)
                const task =
                    // axios.post(uploadPath, formData, {
                    //     timeout: 2000,
                    // })
                    new Promise((resolve, reject) => {
                        if (Math.random() < 0.5) {
                            reject(sendIndex);
                        } else {
                            setTimeout(() => {
                                resolve(sendIndex);
                            }, 200);
                        }
                    })
                        .then(() => {
                            event.emit('chunk-uploaded', { chunk, file, index: sendIndex, md5 });
                            event.emit('progress', { file, done: sendIndex, all: chunkNums, type: 'upload' });
                            taskPoll.splice(taskPoll.findIndex(i => i === task), 1);
                        }).catch((e) => {
                            // 由于Promise内的代码是同步执行的，因此为了确保能够捕获到错误，需要在定义promise时进行链式调用。
                            // console.log(`${sendIndex} 出错`);
                            remaining.push(sendIndex);
                            // console.log(`重传${sendIndex}`);
                            event.emit('resend', { chunk, file, index: sendIndex });
                            taskPoll.splice(taskPoll.findIndex(i => i === task), 1);
                        });
                taskPoll.push(task);
                if (maxReqest === taskPoll.length) {
                    await Promise.race(taskPoll);
                }
                // sendIndex++;
            }
            // await Promise.all(taskPoll);
            event.emit('finish', { file, md5, all: chunkNums, chunkSize })
        },
        async cancel() {
            cancel = true
        },
        async pause() {
            pause = true;
        },
        async continueFlow() {
            pause = false;
        }
    }
}

/**
 * 计算文件md5值
 * @param {File} file 
 * @param {number} chunkSize 
 * @param {} event 
 * @returns 
 */
const md5 = (file, chunkSize, event = new emitter()) => {
    const computer = new SparkMD5.ArrayBuffer();
    const { getChunk, chunkNums } = fileHandler(file, chunkSize, true)
    let cancel = false;
    let pause = false;
    return {
        startCompute: async () => {
            return new Promise((res) => {
                cancel = false
                const reader = new FileReader()
                let i = 0
                reader.onload = async (e) => {
                    if (cancel) return res(false)
                    while (pause) {
                        await createTimer();
                    }
                    const content = e.target.result
                    computer.append(content)
                    event.emit('progress', { done: ++i, all: chunkNums, type: 'md5', file })
                    if (i < chunkNums) {
                        // 递归 onload
                        reader.readAsArrayBuffer(getChunk(i))
                    } else {
                        // 结束分片
                        // 完成md5的计算，返回十六进制结果。
                        res(computer.end())
                    }
                }
                reader.readAsArrayBuffer(getChunk(i))
            })
        },
        cancelCompute: () => cancel = true,
        pauseCompute: () => pause = true,
        continueCompute: () => {
            pause = false;
        }
    }
}


class FileSliceUploader {
    // private file: File
    // private ajax: IAjax
    // private cancelUpload: () => void
    // private event = new emitter()

    /**
     * @param {number} chunkSize  期望片大小 byte
     */
    constructor(maxReqest = 6, chunkSize = 1024 * 1024) {
        this.file = null;
        this.axios = null;
        this.chunkSize = chunkSize;
        this.emitter = new emitter();
        this.emitter.on('start', () => {
            this.busy = true;
        });
        this.emitter.on('finish', () => {
            this.busy = false;
        });
        this.emitter.on('cancel', () => {
            this.busy = false;
        })
        this.doChunkUpload = null;
        // eslint-disable-next-line no-extra-boolean-cast
        this.maxReqest = !!maxReqest ? maxReqest : 1;
        this.busy = false;
    }

    on = (eventName, handler) => {
        v(handler).isTypeOf(Function, 'handler expect function type')
        this.emitter.on(eventName, handler)
        return this
    }

    /** event close listen */
    off = (eventName, handler) => {
        v(handler).isTypeOf(Function, 'handler expect function type')
        this.emitter.off(eventName, handler)
        return this
    }

    /**
     * 支持链式调用
     * @param {File} file 
     */
    setFile(file) {
        this.file = file;
        return this;
    }

    setUploadPath(path) {
        this.uploadPath = path;
        return this;
    }

    getFile() {
        return this.file;
    }

    /**
     * 
     * @param {string} chunkController 分片文件上传接口
     * @param {string} mergeController 合并请求接口
     */
    async start(chunkController, mergeController) {
        const {
            file,
            chunkSize,
            emitter,
            uploadPath,
            maxReqest,
        } = this;
        const { startCompute, cancelCompute, pauseCompute, continueCompute } = md5(file, chunkSize, emitter)
        const { start, cancel, pause, continueFlow } = createFlow(file, chunkSize, maxReqest, emitter, uploadPath)
        this.cancelUpload = () => {
            cancelCompute()
            cancel()
        }
        this.pauseUpload = () => {
            pauseCompute();
            pause();
        }
        this.continueUpload = () => {
            continueCompute();
            continueFlow();
        }
        // 触发start事件，此时还没有分片和上传
        emitter.emit('start', { file, chunkSize })
        // 所有文件分片
        const md5Str = await startCompute()
        if (typeof md5Str === 'string') start(md5Str)
    }

    close() {
        //
    }

    cancel() {
        if (!this.busy) return;
        const {
            cancelUpload,
            emitter,
            file,
            chunkSize
        } = this
        if (typeof cancelUpload === 'function') {
            cancelUpload()
        }
        emitter.emit('cancel', { file, chunkSize })
    }

    pause() {
        this.pauseUpload();
    }

    conotinue() {
        this.continueUpload();
    }
}

export default FileSliceUploader;