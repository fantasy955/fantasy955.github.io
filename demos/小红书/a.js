const rl = require('readline').createInterface({ input: process.stdin });
const iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

let text = 'abcdefghijklmnopqrstuvwxyz';
(async function () {
    let N = parseInt((await readline()));
    let str = (await readline()).split('');
    for (let i = 0; i < N; i++) {
        let raw = text.indexOf(str[i]);
        console.log(raw, str[i]);
        raw -= 3;
        if (raw < 0) {
            raw = 26 + raw;
        }
        str[i] = text[raw];
    }
    console.log(str.join(''));
})();