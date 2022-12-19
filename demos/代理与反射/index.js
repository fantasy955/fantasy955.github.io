const arr = [
    'wjl',
    {
        name: 'wjl',
        age: 13
    },
    [1, '2', 3]
]

const arrProxy = new Proxy(arr, {
    get: (taget, p, reciver)=>{
        console.log('get')
        return Reflect.get(taget, p, reciver)
    },
    set: (taget, p, reciver)=>{
        console.log('set')
        return Reflect.set(taget, p, reciver)
    }
})

arrProxy.push('hello world')
arrProxy.unshift(0)
