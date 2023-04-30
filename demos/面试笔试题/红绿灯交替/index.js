function red() {
    console.log('red');
}
function green() {
    console.log('green');
}
function yellow() {
    console.log('yellow');
}
// 红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次；
let t = 0;
function run() {
    green();
    if (t === 1) {
        yellow();
    }
    if (t === 2) {
        t = -1;
        red();
    }
    new Promise((resolve) => {
        setTimeout(() => {
            t++;
            run();
        }, 1000);
    })
}

run();