class TrackablePromise extends Promise {
    constructor(executor) {
        const notifyHandlers = [];
        // 相当于 
        // new Promise((resolve, reject) => {
        //     return executor(resolve, reject, (status) => {
        //         notifyHandlers.map((handler) => handler(status));
        //     });
        // });

        // excutor是外部传入的函数，除了普通Promise的resolve, reject处理程序，还有一个额外的处理程序，用于追踪执行
        super((resolve, reject) => {
            return executor(resolve, reject, (status) => {
                notifyHandlers.map((handler) => handler(status));
            });
        });
        this.notifyHandlers = notifyHandlers;
    }
    // notify传入事件处理程序，类似于then和catch
    notify(notifyHandler) {
        this.notifyHandlers.push(notifyHandler);
        return this;
    }
}

let p = new TrackablePromise((resolve, reject, notify) => {
    function countdown(x) {
        console.log(x)
        if (x > 0) {
            notify(`${20 * x}% remaining`);  // 传入status
            setTimeout(() => countdown(x - 1), 1000);
        } else {
            resolve();
        }
    }
    countdown(5);
});
// executor
// 异步函数主体
// x > 0时调用notify处理程序
// x = 0时，进入兑现状态
// let executor = (resolve, reject, notify) => {
//     function countdown(x) {
//         if (x > 0) {
//             notify(`${20 * x}% remaining`);
//             setTimeout(() => countdown(x - 1), 1000);
//         } else {
//             resolve();
//         }
//     }
//     countdown(5);
// }

// 传入事件处理程序，x是期约进度
// notify的handler
p.notify((status) => {  
    return setTimeout(console.log, 0, 'progress:', status)  // console.log('progress: ${x}')
}
);
p.then(() => setTimeout(console.log, 0, 'completed'));