class Person {
    constructor(name){
        this.name = name
    }
    create(){
        return new Person('wjl');
    }
}

console.log(Person.prototype.create())