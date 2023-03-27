const rl = require('readline').createInterface({ input: process.stdin });
const iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

(async function () {
    let n = parseInt((await readline()));
    let arr = (await readline()).split(' ').map((num) => parseInt(num));
    let q = parseInt((await readline()));
    let max = Math.floor((arr.length - 1 - 1) / 2);
    let map = new Map();
    for (let i = 0; i < arr.length; i++) {
        map.set(arr[i], i);
    }
    while (q--) {
        let x = parseInt((await readline()));
        if (map.has(x)) {
            let i = map.get(x);
            let isLeaf = true;
            if (i <= max) {
                isLeaf = false;
            }
            console.log('YES');
            if (isLeaf) {
                console.log('LEAF');
            } else {
                console.log(arr[i * 2 + 1], arr[i * 2 + 2]);
            }
        } else {
            console.log('NO');
        }
    }
})();