// 3[a]2[bc]
function fun(s) {
    let n = s.length;
    const numStack = [];
    const strStack = [];
    let curCount = 0;
    let curStr = '';
    let resStr = '';
    for (let i = 0; i < n; i++) {
        if (s[i] === '[') {
            numStack.push(curCount);
            curCount = 0;
        } else if (s[i] === ']') {
            let count = numStack.shift();
            // let str = strStack.shift();
            if (count === 0) {
                continue;
            } else {
                let _str = new Array(count).fill(curStr).join('');
                if (numStack.length) {
                    _str = numStack.shift() + _str;
                }
                resStr += _str;
            }
        } else if (s[i].charCodeAt() >= '0'.charCodeAt() && s[i].charCodeAt() <= '9'.charCodeAt()) {
            if (curStr !== '') {
                strStack.push(curStr);
                curStr = '';
            }
            let n = s[i].charCodeAt() - '0'.charCodeAt();
            curCount = curCount * 10 + n;
        } else {
            curStr += s[i];
        }
    }
    if (curStr !== '') {
        resStr += curStr;
    }
    // console.log(resStr);
}

// fun('2[abc]3[cd]ef')


function fun2(s) {
    // let group = s.match(//, )
    s.replce(/\d+\[.*\]/g, (str) => {
        let countStr = str.slice(0, str.indexOf('['));
        let child = str.slice(str.indexOf('[') + 1, str.lastIndexOf(']'));
        if (child.indexOf('[') !== -1) {
            return new Array(parseInt(countStr)).fill(fun2(child)).join('');
        } else {
            return new Array(parseInt(countStr)).fill(child).join('');
        }
    });
}