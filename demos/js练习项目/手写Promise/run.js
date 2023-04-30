const MyPromise = require("./Promise");


let task = new MyPromise((resolve, reject) => {
    if (Math.random() < 0.5) {
        reject('random error');
    }
    resolve('success');
});

task.then((msg) => {
    console.log('ok', msg)
}, (reason) => {
    console.log('faild', reason)
})

