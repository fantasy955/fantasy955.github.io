import m from './module.mjs'

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
    let task = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.5) {
                reject('random error '+i);
            } else {
                resolve('success ' + i);
            }
        }, Math.random() * 1000);
    });
    m.runPromise(task);
}

