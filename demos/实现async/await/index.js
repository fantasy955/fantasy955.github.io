

function myAsync(fn) {
    return function (..._args) {
        // console.log(this, _args);
        return new Promise((resolve, reject) => {
            // fn 是一个Generator函数
            // 内部可以使用yield
            // gen一开始不会执行
            // 只有调用next方法时才执行，遇到yeild关键字后返回值，然后暂停
            const gen = fn.apply(this, _args);

            function step(key, arg) {
                let result;
                try {
                    // 执行next方法 假设返回一个Promise
                    // 或者执行throw方法
                    result = gen[key](arg);
                } catch (error) {
                    reject(error);
                    return;
                }

                const { value, done } = result;

                if (done) {
                    resolve(value);
                } else {
                    // fn函数还没有运行结束
                    // 当上一个promise执行完成后，将它的返回值传递回原理的位置
                    // 继续执行fn函数
                    // 如果value是一个Promise，则由于Promise的幂等性，等价于value.then()
                    // 否则将其转换为Promise
                    Promise.resolve(value).then(
                        (val) => {
                            step("next", val);
                        },
                        (err) => {
                            step("throw", err);
                        }
                    );
                }
            }

            step("next");
        });
    };
}

function myAwait(promise) {
    if (promise instanceof Promise) {
        return promise;
    }

    return new Promise((resolve) => {
        resolve(promise);
    });
}


const fetchSomething = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("something");
            // reject("some error");
        }, 1000);
    });
};


// 将函数转换为async函数
const myAsyncFunction = myAsync(function* (a, b) {
    const result = yield myAwait(fetchSomething());
    console.log(a, b);
    console.log(result);
});

try {
    myAsyncFunction(1, 2);
} catch (e) {
    console.log('@@@', e);
}

function Person(name) {
    this.name = name;
    this.say = function* () {
        yield 1;
        console.log(`${this.name} say`);
    }
}
const wjl = new Person('wjl');

// 包含this
myAsync(wjl.say)();