// 构造函数也是函数
function student(name, age){
    console.log(this)
    this.name = name
    this.age = age
    console.log(this)
    return 111 // 使用new操作符的话，如果构造函数返回对象，最终得到的是返回的这个对象；如果构造函数返回的不是对象，则返回值不生效
}

// 代替new
function create(fn, ...args){
    let obj = {} // 创建一个空对象
    // let = Object.create({})  另一种创建空对象的方式
    // Object.setPrototypeOf(obj, fn.prototype)
    var result = fn.apply(obj, args)  // 接收构造函数返回值
    return result instanceof Object ? result : obj 
}

console.log( create(student, 'wjl', 22) )