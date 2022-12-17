const arr = [
    {
        code: 101,
        name: '北京',
    },
    {
        code: 102,
        name: '石家庄',
    },
    {
        code: 102,
        name: '江苏',
        children: [{
            code: 102,
            name: '南京',
        }, {
            code: 102,
            name: '连云港',
        }]
    }
]
const arr2obj = (arr) => {
    let obj = {}
    return arr.forEach((item) => {
        if (item.children !== undefined) {
            console.log('@')
            item.children = arr2obj(item.children)
        }
        console.log(item)
        return {
            [item.name]: item
        }

    });
}

function toObj(arr) {
    let obj = {};
    for (let item of arr) {
        if (item['children'] !== undefined) {
            obj = { ...toObj(item['children']), ...obj };
        } else {
            obj[item.name] = item;
        }

    }
    return obj;
}

console.log(toObj(arr))