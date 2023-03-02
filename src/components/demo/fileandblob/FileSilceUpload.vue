<template>
    <el-dialog v-model="showProgress" :close-on-click-modal="false" :close-on-press-escape="false" title="上传文件"
        @close="onModalClosed">
        <el-progress :percentage="percent" />
        <template #footer>
            <span class="dialog-footer">
                <el-button v-if="status === 'busy'" @click="handlePause">{{ paused ? '继续' : '暂停' }}</el-button>
                <el-button @click="onModalClosed">Cancel</el-button>
            </span>
        </template>
    </el-dialog>
    <el-row>
        <span class="label-input">分片上传地址</span>
        <el-input v-model="server" class="w-50 m-2 input" placeholder="set api port" />
    </el-row>
    <el-upload ref="upload" class="upload-demo" :action="server" :onchange="handleChange" :limit="1"
        :on-exceed="handleExceed" :auto-upload="false" :http-request="handleHttpRequest" :disabled="status === 'busy'"
        :on-success="handleSuccess">
        <template #trigger>
            <el-button type="primary">select file</el-button>
        </template>
        <el-button class="ml-3" type="success" @click="submitUpload">
            upload to server
        </el-button>
        <template #tip>
            <div class="el-upload__tip text-red">
                limit 1 file, new file will cover the old file
            </div>
        </template>
    </el-upload>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import FileSliceUploader from '@/utils/file-slice-uploader';
import { genFileId } from 'element-plus';
import axios from 'axios';
import { throttle } from '@/utils/common';

const server = ref('http://43.139.126.249:5000/api/upload')
const uploader = new FileSliceUploader();
const percent = ref(0);
const upload = ref(null);
const status = ref('idle');
const paused = ref(false);
const showProgress = ref(false);
watch(status, ()=>{
    if (status.value !== 'idle'){
        showProgress.value = true;
    }else{
        showProgress.value = false;
    }
})

const handleChange = (e) => {
    if (e.type === 'change') {
        //
    }
}

const handlePause = throttle(() => {
    if (uploader.busy) {
        if (paused.value) {
            uploader.conotinue();
        } else {
            uploader.pause();
        }
        paused.value = !paused.value;
    }
}, 200)

/**
 * 
 * @param {*} options 
 * @return {XMLHttpRequest | Promise<unknown>}
 */
const handleHttpRequest = (options) => {
    const { file, method } = options;
    percent.value = 0;
    status.value = 'busy';
    const chunkUploadTask = new Promise((resolve, reject) => {
        uploader.setFile(file).setUpload(async ({ chunk, md5, all }) => {
            const formData = new FormData()
            formData.append('chunkFile', chunk)
            formData.append('hash', md5)
            formData.append('all', `${all}`)
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve()
                }, 200);
            })
            // return axios.post(`${server.value}`, formData)
        }).on('progress', (e) => {
            // 得到分片回调
            if (e.type === 'md5') {
                percent.value = Math.ceil(30 * e.done / e.all);
            }
            // 分片上传回调
            if (e.type === 'upload') {
                percent.value = percent.value > Math.ceil(30 + 49 * e.done / e.all) ? percent.value : Math.ceil(30 + 49 * e.done / e.all);
            }
        }).on('finish', async ({ md5, file, all }) => {
            const formData = new FormData()
            formData.append('hash', md5)
            formData.append('fileName', file.name)
            formData.append('all', `${all}`)
            resolve();
        }).on('error', () => {
            reject();
        });
        uploader.start();
    }).then(() => {
        return new Promise((resolve) => {
            percent.value = 100;
            status.value = 'finish';
            resolve(1); // will pass to handleSuccess
        })
    }).catch(() => {

    });
    return chunkUploadTask;
}

const handleExceed = (files) => {
    percent.value = 0;
    upload.value.clearFiles()
    const file = files[0]
    file.uid = genFileId()
    upload.value.handleStart(file)
}

const submitUpload = () => {
    if (uploader.busy) {
        return;
    }
    upload.value.submit()
}

const handleSuccess = (response, uploadFile) => {
    // console.log(response);
}

const onModalClosed = () => {
    showProgress.value = false;
    status.value = 'idle';
    if (uploader.busy) {
        uploader.cancel();
    }
}

</script>

<style scoped>
.label-input {
    vertical-align: middle;
}

.label-input::after {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
}
</style>