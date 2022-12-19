const person = {
    name: 'tom', age: 12, son: [
        { name: 'a' }, { name: 'b' }, 123
    ], walk: () => {
        console.log('走路')
    }
}


function getType(any) {
    return Object.prototype.toString.call(any).slice(8, -1);
}


// person instanceof Object: true
// person.walk instanceof Object: true
// person.walk instanceof Function: true

// typeof的返回值
// undefined、boolean、string、number、object、function、symbol
function deepCopy(any) {
    if (any.constructor === Array) {
        let arr = any.map((item) => deepCopy(item))
        return arr
    } else if (getType(any) ===  'Object') { 
        let o = {}
        for (let key in any) {
            o[key] = deepCopy(any[key])
        }
        return o
    } else if (getType(any) === 'Function') { // 拷贝函数
        return new Function('return ' + any.toString())
    }
    return any
}

let cPerson = deepCopy(person)
console.log(cPerson);
cPerson.son[0].name = '测试'
console.log(cPerson)
console.log(person)

person.walk()
console.log(')))')
// 不添加call(this)不会输出
cPerson.walk()