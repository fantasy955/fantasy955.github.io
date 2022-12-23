export const debounce = function (callback, timeout) {
    let job = undefined;
    return (...args) => {
        if (job !== undefined) {
            clearTimeout(job);
        }
        job = setTimeout(() => {
            callback(...args);
        }, timeout);
    }
}

export const throttle = function (fn, delay) {
    let flag = true;
    return function (...args) {
        if (!flag) {
            return false;
        }
        // 工作时间，执行函数并且在间隔期内把状态位设为无效
        flag = false;
        setTimeout(() => {
            fn(...args);
            flag = true;
        }, delay)
    }
}