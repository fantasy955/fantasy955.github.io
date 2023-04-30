function Person(name) {
    this.name = name
}


Person.prototype.walk = function () {
    console.log(`${this.name} wakl`)
}

function inheritPrototype(subClass, superClass) {
    const prototype = Object.create(superClass.prototype)
    prototype.constructor = subClass
    subClass.prototype = prototype
}

function Man(name) {
    Person.call(this, name);
    this.sex = '男'
}
inheritPrototype(Man, Person)
// 要先修改原型，再给原型添加属性
Man.prototype.say = function () {
    console.log(`man ${this.name} say`)
}


const wjl = new Man('wjl');
wjl.walk();
wjl.say();
