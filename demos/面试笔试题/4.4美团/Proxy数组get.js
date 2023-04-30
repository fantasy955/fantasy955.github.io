let arr = [1, 2, 3];
let proxy = new Proxy(arr, {
    get: function (target, key, reveiver) {
        console.log(target, key, reveiver);
        if (key === 'push') {
            return function (...args) {
                console.log('拦截push方法');
                return Reflect.apply(target[key], target, args);
            }
        }
        return Reflect.get(target, key);
    },
    set: function (target, key, value, reveiver) {

    }
})

proxy.push('1233');
console.log(arr);

// 备注： 假设有一段代码执行 obj.name = "jen"，
// obj 不是一个 proxy，且自身不含 name 属性，
// 但是它的原型链上有一个 proxy，那么，那个 proxy 的 set() 处理器会被调用，
// 而此时，obj 会作为 receiver 参数传进来。