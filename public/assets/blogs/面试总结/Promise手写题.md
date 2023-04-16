## 调度器

```js
class Sheduler {
    constructor(max) {
        this.max = max;
        this.taskPool = [];
        this.activeTasks = []
        this.running = false;
    }

    add(fn) {
        this.taskPool.push(fn);
        if (!this.running) {
            this.run();
        }
    }

    async run() {
        this.running = true;
        while (this.taskPool.length) {
            if (this.activeTasks.length === max) {
                await Promise.race(this.activeTasks);
            }
            let task = (this.taskPool.shift())();
            this.activeTasks.push(task);
            task.finally(() => {
                this.activeTasks.splice(this.activeTasks.findIndex((item) => item === task));
            });
        }
        this.running = false;
    }
}
```

### 进阶：add方法返回一个promise

```js
    add(fn) {
        return new Promise((resolve, reject) => {
            let _fn = () => {
                let task = fn();
                return task.then(resolve, reject);  // 当task状态改变时，会调用resolve或reject
            }
            this.taskPool.push(_fn);

            if (!this.running) {
                this.run();
            }
        });
    }
```

## retry函数

```js
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
```

**关键是**`retryPromise(fn, retries - 1, delay).then(resolve).catch(reject);`

这里相当于进行了递归调用；

## 实现Promise

```

```

## node服务器

### express中间件

Express框架也是基于中间件的，但是它的**中间件模型为线型**，而不是洋葱模型。Express的中间件函数有三个参数：request对象、response对象和next函数，其中next函数用于将控制权转移给下一个中间件。Express内置了许多中间件可供使用，包括路由、视图渲染等特性。如果你想要自定义中间件，可以使用app.use()方法来添加自定义中间件。

```js

```

### koa2中间件
