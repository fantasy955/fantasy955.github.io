let obj = {
    name: 'wjl',
    age: 12,
    toString() {
        console.log('o1 string');
        return `${this.age}`
    },

    valueOf() {
        console.log('o1 value');
        // return 0; // 如果valueOf返回原始值，就不会考虑toString
        return {};  
    }
}


let obj2 = {
    name: 'zj',
    age: 1212,
    toString() {
        console.log('o2 string');
        return `${this.age}`
    },

    valueOf() {
        console.log('o2 value');
        // return 0; // 如果valueOf返回原始值，就不会考虑toString
        return {};  
    }
}

// obj == Symbol(0)
// obj == 0
obj + obj2
