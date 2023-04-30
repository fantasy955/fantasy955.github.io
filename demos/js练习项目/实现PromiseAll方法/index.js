function promiseAll(promises) {
    return new Promise(function (resolve, reject) {
        if (!Array.isArray(promises)) {
            return reject(new TypeError('arguments must be an array'));
        }
        var resolvedCounter = 0;
        var promiseNum = promises.length;
        var resolvedValues = new Array(promiseNum);
        for (var i = 0; i < promiseNum; i++) {
            (function (i) {
                // 幂等性
                Promise.resolve(promises[i]).then(function (value) {
                    resolvedCounter++
                    resolvedValues[i] = value
                    if (resolvedCounter == promiseNum) {
                        resolve(resolvedValues)
                    }
                }, function (reason) {
                    reject(reason)
                })
            })(i)
        }
    })
}


let i = 0;
let promises = new Array(100).fill(0).map(() => new Promise((resolve, reject) => {
    if (Math.random() < 0.2) {
        reject('random error');
    } else {
        resolve(i++);
    }
}))

promiseAll(promises).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
})