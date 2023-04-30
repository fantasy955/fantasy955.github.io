function retryPromise(fn, retries = 3, delay = 2000) {
    return new Promise((resolve, reject) => {
        fn().then(resolve).catch((error) => {
            if (retries === 0) {
                reject(error);
            } else {
                setTimeout(() => {
                    retryPromise(fn, retries - 1, delay).then(resolve).catch(reject);
                }, delay);
            }
        });
    });
}

let i = 0;
let fn = () => new Promise((resolve, reject) => {
    if (i < 3) {
        i++;
        reject();
    } else {
        resolve('???');
    }
})