const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    let [n, k] = (await readline()).split(' ').map((num) => parseInt(num));
    let end = (k - 1) * 2;
    let max = n;
    let res = new Array(n).fill(0).map((_, i) => i + 1);
    let cache = [];
    let flag = new Array(n).fill(0);
    for (let i = end; i >= 0; i -= 2) {
        cache.push(res[i]);
        flag[i] = 1;
        res[i] = max;
        max -= 1;
    }
    cache = cache.filter((num) => num <= max);
    console.log(cache);
    let i = n - 1;
    while (cache.length) {
        if (!flag[i]) {
            res[i] = cache.pop();
        }
        i--;
    }
    console.log(res.join(' '));
}();