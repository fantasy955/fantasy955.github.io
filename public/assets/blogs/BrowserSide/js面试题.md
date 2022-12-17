# new 操作符

## new操作符干了什么

- 创建一个空对象
- 将对象的原型指向构造函数的原型
- 将空对象作为构造函数的上下文（改变this指向）
- 对构造函数返回值进行判断

## 模拟实现new操作

```javascript
// 构造函数也是函数
function student(name, age){
    this.name = name
    this.age = age
    return 111 // 使用new操作符的话，如果构造函数返回对象，最终得到的是返回的这个对象；如果构造函数返回的不是对象，则返回值不生效
}

// 代替new
function create(fn, ...args){
    let obj = {} // 创建一个空对象
    // let = Object.create({})  另一种创建空对象的方式
    Object.setPrototypeOf(obj, fn.prototype)  // 设置原型
    var result = fn.apply(obj, args)  // 接收构造函数返回值
    return result instanceof Object ? result : obj 
}

console.log( create(student, 'wjl', 22) )
```

## apply函数

[Function.prototype.apply() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

`apply()` 方法调用一个具有给定 `this` 值的函数，以及以一个数组（或一个[类数组对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#working_with_array-like_objects)）的形式提供的参数。

```javascript
const numbers = [5, 6, 2, 3, 7];

const max = Math.max.apply(null, numbers);

console.log(max);
// expected output: 7

const min = Math.min.apply(null, numbers);

console.log(min);
// expected output: 2
```

### 参数

- `thisArg`

  在 `func` 函数运行时使用的 `this` 值。请注意，`this` 可能不是该方法看到的实际值：如果这个函数处于[非严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)下，则指定为 `null` 或 `undefined` 时会自动替换为指向全局对象，原始值会被包装。

- `argsArray` 可选

  一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 `func` 函数。如果该参数的值为 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null) 或 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)，则表示不需要传入任何参数。从 ECMAScript 5 开始可以使用类数组对象。[浏览器兼容性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply#浏览器兼容性)请参阅本文底部内容。

### 返回值

调用有指定 **`this`** 值和参数的函数的结果。

### 分析

`Math.max.apply(null, numbers);`相当于调用`Math.max`函数，参数是`numbers`，而这个函数返回数组的最大值。

`fn.apply(obj, args)`在例子中即`student.apply(obj, args)`；将`student`函数的`this`赋值为`obj`，而构造函数的参数为`args`。

在`student`内执行

```javascript
obj.name = name
obj.age = age
```

在构造函数内输出`this`:

**注释掉设置原型语句**

```javascript
// 构造函数也是函数
function student(name, age){
    console.log(this) // {}， this为空对象
    this.name = name
    this.age = age
    console.log(this)
    return 111 // 使用new操作符的话，如果构造函数返回对象，最终得到的是返回的这个对象；如果构造函数返回的不是对象，则返回值不生效
}

// 代替new
// fn 构造函数
// args 构造函数参数
function create(fn, ...args){
    let obj = {} // 创建一个空对象
    // let = Object.create({})  另一种创建空对象的方式
    // Object.setPrototypeOf(obj, fn.prototype)
    
    // 将fn构造函数内的this改为obj
    var result = fn.apply(obj, args)  // 接收构造函数返回值
 		
    return result instanceof Object ? result : obj 
}

console.log( create(student, 'wjl', 22) )
```



# 异常捕获

## 如何给所有的async函数添加try/catch？

[阿里面试官：如何给所有的async函数添加try/catch？ - 掘金 (juejin.cn)](https://juejin.cn/post/7155434131831128094#comment)

- babel，从代码角度添加
- 事件捕获，添加全局事件

```tsx
async function fn() {
await new Promise((resolve, reject) => { reject(new Errot('message')); });
}
fn();

window.addEventListener('unhandledrejection', function (event) {
console.log('event', event);
console.log('message', event.message);
event.preventDefault()
});
```

需要reject Error，才能在全局事件中拿到信息。

- 封装接口的时候全部resolve掉，然后处理错误信息，这样就不用写丑陋的trycatch

- 可以参考一下vue中Vue.config.errorHandler的实现，其实我个人理解 面试官问你这道题 其实是想问你埋点监控相关的东西，全局捕获异常可以结合埋点做一些后续的开发。。。

# 深拷贝

[深拷贝](./对象拷贝.md)

# 防抖和节流

[编程篇(018)-手写防抖(debounce)和节流(throttle) - 腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/2186216#:~:text=区别：,防抖动是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行。)

**区别：**防抖动是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行。

使用一个高阶函数，将传入的函数转换成防抖或节流函数。
