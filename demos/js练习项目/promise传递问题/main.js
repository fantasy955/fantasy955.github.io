const m = require('./module.js')

let promises = [];
for (let i = 0; i < 100; i++) {
    // m.run(() => new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         if (Math.random() < 0.5) {
    //             reject('random error');
    //         } else {
    //             resolve('success');
    //         }
    //     }, Math.random() * 1000);
    // }));
    m.runPromise(new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.5) {
                reject('random error');
            } else {
                resolve('success');
            }
        }, Math.random() * 1000);
    }));
}

