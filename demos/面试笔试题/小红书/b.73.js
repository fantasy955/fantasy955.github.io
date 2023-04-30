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
        // console.log(sortedArr);
        let diff = 0;
        let end = n - 1;
        while (end >= 0) {
            if (sortedArr[end] !== arr[end]) {
                break;
            }
            end--;
        }
        let start = 0;
        while (start < end) {
            if (sortedArr[start] !== arr[start]) {
                break;
            }
            start++;
        }
        console.log(Math.ceil((end - start + 1) / k));
        // console.log(start, end, arr.slice(start, end + 1));
    }
})();