// 延迟触发事件
// 一定时间内重复触发，只执行最后一次触发
export const debounce = function (callback, timeout) {
    let job = undefined;
    // 不能使用箭头函数（没有this指针）
    return function (...args) {
        let that = this;
        // console.log(that);
        if (job !== undefined) {
            clearTimeout(job);
        }
        job = setTimeout(() => {
            callback.apply(that, args);
        }, timeout);
    }
}

// 一定时间只执行一次
// 重复的触发被忽略
export const throttle = function (fn, delay) {
    let flag = true;
    return function (...args) {
        let that = this;
        if (!flag) {
            return false;
        }
        // 工作时间，执行函数并且在间隔期内把状态位设为无效
        flag = false;
        fn.apply(that, ...args);
        setTimeout(() => {
            flag = true;
        }, delay)
    }
}