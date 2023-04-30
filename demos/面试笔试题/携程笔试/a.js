const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

const helper = [1, 0, 0, 0, 0, 0, 1, 0, 2, 1];
void async function () {
    let arr = (await readline()).split('').map((num) => parseInt(num));
    let n = arr.length;
    let res = 0;
    for (let i = 0; i < n; i++) {
        res += helper[arr[i]];
    }
    console.log(res);
}();