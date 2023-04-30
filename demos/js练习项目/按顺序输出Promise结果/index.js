function asyncCreator(i) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.3) {
                reject(i + ' random error');
            }
            resolve(i + ' success');
        }, Math.random() * 1000);
    });
}


let done = 0;
let res = new Array(10);
new Promise((resolve, reject) => {
    for (let i = 0; i < 10; i++) {
        asyncCreator(i).then((msg) => {
            // console.log(msg);
            res[i] = msg;
        }).catch((reason) => {
            // console.log(reason);
            res[i] = reason;
        }).finally(() => {
            done++;
            if (done === 10) {
                resolve();
            }
        })
    }
}).then(() => {
    for (let item of res) {
        console.log(item);
    }
})

