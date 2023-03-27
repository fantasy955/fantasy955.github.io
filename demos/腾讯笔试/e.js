const rl = require('readline').createInterface({ input: process.stdin });
const iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;


(async function () {
    let aa = '[Month] da [Day]';
    // ? 表示非贪婪模式
    let res = aa.match(/\[(.*?)\]/g);
    console.log('@@', res[0]);

    let format = (await readline());
    let ms = parseInt((await readline()));
    let date = new Date(ms);
    let year = '' + date.getFullYear();
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    console.log(year, month, day);
    format = format.replace(/YYYY/g, year);
    format = format.replace(/YY/g, year.slice(2));
    format = format.replace(/MM/g, month.padStart(2, '0'));
    format = format.replace(/M/g, month);
    format = format.replace(/DD/g, day.padStart(2, '0'));
    format = format.replace(/D/g, day);



    console.log(format);
})();