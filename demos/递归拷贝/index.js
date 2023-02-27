function getType(obj) {
    // [object *****]
    return Object.prototype.toString.call(obj).slice(8, -1);
}

function deepCopy(any) {
    console.log(any);
    if (typeof any === 'object') {
        if (Array.isArray(any)) {
            return any.map((item) => deepCopy(item))
        } else if (getType(any) === 'Function') {
            return new Function(`return ${any.toString()}`)
        } else {
            const newObj = {}
            for(const key in any){
                newObj[key] = deepCopy(any[key])
            }
            return newObj;
        }
    }
    return any
}

const person = {
    name: 'tom',
    age: 12,
    son: [
        { name: 'a' }, { name: 'b' }, 123
    ],
    walk: () => {
        console.log('走路')
    }
}

const personCopy = deepCopy(person);
console.log(personCopy)