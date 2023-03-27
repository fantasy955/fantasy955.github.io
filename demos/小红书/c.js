const rl = require('readline').createInterface({ input: process.stdin });
const iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

(async function () {
    let N = parseInt((await readline()));
    let arr = (await readline()).split(' ').map((num) => parseInt(num));
    let M = parseInt((await readline()));
    let leftArr = (await readline()).split(' ').map((num) => parseInt(num));
    let rightArr = (await readline()).split(' ').map((num) => parseInt(num));
    let operations = (await readline()).split('');
    let xArr = (await readline()).split(' ').map((num) => parseInt(num));
    // console.log(N)
    // console.log(arr)
    // console.log(M)
    // console.log(leftArr)
    // console.log(rightArr)
    // console.log(operations)
    // console.log(xArr);
    for (let i = 0; i < M; i++) {
        let op = operations[i];
        let l = leftArr[i] - 1;
        let r = rightArr[i] - 1;
        let x = xArr[i];
        if (op === '|') {
            for (let j = l; j <= r; j++) {
                arr[j] |= x;
            }
        } else if (op === '&') {
            for (let j = l; j <= r; j++) {
                arr[j] &= x;
            }
        } else if (op === '=') {
            for (let j = l; j <= r; j++) {
                arr[j] = x;
            }
        } else {
            console.log('err');
        }
    }
    console.log(arr.join(' '));
})();
