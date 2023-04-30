const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    let n = parseInt((await readline()));
    let edgeMap = new Map();
    let deg = new Array(n + 1).fill(0);
    let weight = new Array(n + 1).fill(0).map(() => new Array(n + 1).fill(0));
    for (let i = 0; i < n - 1; i++) {
        let [u, v, w] = (await readline()).split(' ').map((num) => parseInt(num));
        if (u > v) {
            [u, v] = [v, u];
        }
        if (!edgeMap.has(u)) {
            edgeMap.set(u, []);
        }
        // 单向，小指向大
        edgeMap.get(u).push(v);
        deg[u]++;
        deg[v]++;
        weight[u][v] = w;
    }
    function dfs(s, flag, preRes) {
        let tempMax = 0;
        if (edgeMap.has(s) && edgeMap.get(s).length) {
            for (let t of edgeMap.get(s)) {
                if (!flag) { // 可以选择边，有两种情况
                    let res1 = dfs(t, true, weight[s][t]);
                    let res2 = dfs(t, false, 0);
                    let thisMax = res1 > res2 ? res1 : res2;
                    tempMax = tempMax > thisMax ? tempMax : thisMax;
                } else {
                    let res2 = dfs(t, false, 0);
                    tempMax = tempMax > res2 ? tempMax : res2;
                }
            }
        }
        return preRes + tempMax;
    }
    let res = dfs(1, false, 0);
    console.log(res);
}();