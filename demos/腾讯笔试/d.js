const rl = require('readline').createInterface({ input: process.stdin });
const iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

(async function () {
    let num1 = await readline();
    let num2 = await readline();
    if (num1.length > num2.length) {
        num2 = new Array(num1.length - num2.length).fill('0').join('') + num2;
    }
    let pre = 0;
    let res = new Array(num1.length).fill(0);
    for (let i = num1.length - 1; i >= 0; i--) {
        let a = parseInt(num1[i]);
        let b = parseInt(num2[i]);
        a -= pre;
        let diff = a - b;
        if (diff < 0) {
            diff += 10;
            pre = 1;
        } else {
            pre = 0;
        }
        res[i] = diff;
    }
    while (res.length && res[0] == '0') {
        res.shift();
    }
    if (res.length) {
        console.log(res.join(''));

    } else {
        console.log(0);
    }
})();