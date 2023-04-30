const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    let n = parseInt((await readline()));
    if (n === 1 || n === 2) {
        console.log(1, 1);
    } else {
        let min = n; // x = 1
        let res_x = 1, res_y = 1;
        let x = 3;
        let left = 6;
        while ((left - 1) < n) {
            let y = Math.round(n / (left - 1));
            let diff = Math.abs((left - 1) * y - n);
            if (diff < min) {
                min = diff;
                res_x = x;
                res_y = y;
            }
            x++;
            left *= x;
        }
        let y = Math.round(n / (left - 1));
        let diff = Math.abs((left - 1) * y - n);
        if (diff < min) {
            min = diff;
            res_x = x;
            res_y = y;
        }
        console.log(res_x, res_y, min);
    }
}();