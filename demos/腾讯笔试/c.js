const rl = require('readline').createInterface({ input: process.stdin });
const iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

let text = 'abcdefghijklmnopqrstuvwxyz';
(async function () {
    let [n, m] = (await readline()).split(' ').map((num) => parseInt(num));
    let map = new Array(n);
    for (let i = 0; i < n; i++) {
        map[i] = (await readline()).split('');
    }
    let mod = 1e9 + 7;
    let res = 0;
    let state = new Array(n).fill(0).map(() => new Array(m).fill(-1));
    function dfs(i, j, tmpRes) {
        if (i === n - 1 && j === m - 1) {
            tmpRes = (tmpRes + 1) % mod;
            return tmpRes;
        }
        let ijSum = 0;
        for (let len = 1; i + len < n && map[i + len][j] !== '#'; len++) {
            if (state[i + len][j] === -1) {
                let tempSum = dfs(i + len, j, 0);
                ijSum = (ijSum + tempSum) % mod;
                state[i + len][j] = tempSum;
            } else {
                ijSum = (ijSum + state[i + len][j]) % mod;
            }

        }
        for (let len = 1; j + len < m && map[i][j + len] !== '#'; len++) {
            if (state[i][j + len] === -1) {
                let tempSum = dfs(i, j + len, 0);
                ijSum = (ijSum + tempSum) % mod;
                state[i][j + len] = tempSum;
            } else {
                ijSum = (ijSum + state[i][j + len]) % mod;
            }

        }
        state[i][j] = ijSum;
        return ijSum;
    }
    dfs(0, 0);
    console.log(state[0][0]);
})();