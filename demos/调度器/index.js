
class Scheduler {
    constructor() {
        this.queue = [];
        this.currentTask = null;
        this.running = false;
        this.maxTask = 2;
        this.runningTaskNum = 0;
    }

    add(promiseCreator) {
        // 返回一个promise，使用函数的形式保存了参数
        // 进而实现不立即创建promise
        // 而返回promise的状态也由promiseCreator 创建的promise进行控制
        return new Promise((resolve, reject) => {
            this.queue.push(() => {
                const promise = promiseCreator();
                return promise.then(resolve, reject);
            });

            if (!this.running) {
                this.run();
            }
        });
    }

    async run() {
        console.log('run')
        if (this.queue.length === 0) {
            return;
        }

        this.running = true;
        let thisTaskPoll = [];
        while (this.queue.length) {
            if (this.runningTaskNum < this.maxTask) {
                const task = this.queue.shift();
                const promise = task().finally(() => {
                    this.runningTaskNum--;
                    thisTaskPoll.splice(thisTaskPoll.indexOf(promise), 1);
                    if (this.runningTaskNum === 0) {
                        this.running = false;
                        this.run();
                    }
                });
                this.runningTaskNum++;
                thisTaskPoll.push(promise);
            }
            if (this.runningTaskNum === this.maxTask) {
                await Promise.race(thisTaskPoll);
            }
        }
    }
}

function timeout(delay) {
    return new Promise((resolve, reject) => {
        if (Math.random() < 0.5) {
            reject()
        } else {
            setTimeout(resolve, delay);
        }
    });
}


const scheduler = new Scheduler();

scheduler.add(() => timeout(1000).then(() => {
    console.log('task 1');
}).catch((e) => {
    console.log('task 1 failed')
})).then(()=>{
    console.log('promise task 1');
}).catch(()=>{
    console.log('promise task 1 failed');
});
scheduler.add(() => timeout(2000).then(() => {
    console.log('task 2');
}).catch((e) => {
    console.log('task 2 faild')
})).then(()=>{
    console.log('promise task 2');
}).catch(()=>{
    console.log('promise task 2 failed');
});

scheduler.add(() => timeout(3000).then(() => {
    console.log('task 3');
}).catch((e) => {
    console.log('task3 faild')
})).then(()=>{
    console.log('promise task 3');
}).catch(()=>{
    console.log('promise task 3 failed');
});

scheduler.add(() => timeout(5000).then(() => {
    console.log('task 4');
}).catch((e) => {
    console.log('task 4 faild')
})).then(()=>{
    console.log('promise task 4');
}).catch(()=>{
    console.log('promise task 4 failed');
});

scheduler.add(() => timeout(0).then(() => {
    console.log('task 5');
}).catch((e) => {
    console.log('task 5 faild')
})).then(()=>{
    console.log('promise task 5');
}).catch(()=>{
    console.log('promise task 5 failed');
});
// 1 3 5 2 4
// 1 2队列中
// 1 完成 3 4 5 按次进入队列
// 最后完成 4