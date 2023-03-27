const rl = require('readline').createInterface({ input: process.stdin });
const iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

(async function () {
    let T = parseInt((await readline()));
    while (T--) {
        let [n, k] = (await readline()).split(' ').map((num) => parseInt(num));
        let arr = (await readline()).split(' ').map((num) => parseInt(num));
        let sortedArr = Array.from(arr);
        sortedArr.sort((a, b) => a - b);
        let res = 0;
        // eslint-disable-next-line no-constant-condition
        while (true) {
            let end = arr.length - 1;
            let start = 0;
            while (start <= end) {
                if (sortedArr[start] !== arr[start]) {
                    break;
                }
                start++;
            }
            let diff = end - start + 1;
            if (diff === 0) {
                break;
            }
            if (diff <= k) {
                res++;
                break;
            } else {
                arr = arr.splice(start, end + 1);
                arr = arr.filter((num) => sortedArr.indexOf(num) <= end - k);
                res++;
            }
        }
        console.log(res);
    }
})();