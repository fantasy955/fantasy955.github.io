function bigMulti(num1, num2) {
    let res = new Array(num1.length + num2.length + 1).fill(0);
    num1 = num1.split('').map((num) => parseInt(num));
    num2 = num2.split('').map((num) => parseInt(num));
    let base_i = 0;
    let over = 0;
    for (let i = num1.length - 1; i >= 0; i--) {
        let idx = 0;
        for (let j = num2.length - 1; j >= 0; j--) {
            let t = num1[i] * num2[j] + over + res[base_i + idx];
            if (t >= 10) {
                over = Math.floor(t / 10);
                t %= 10;
            } else {
                over = 0;
            }
            res[base_i + idx] = t;
            idx++;
        }
        while (over) {
            let t = over + res[base_i + idx];
            if (t >= 10) {
                over = Math.floor(t / 10);
                t %= 10;
            } else {
                over = 0;
            }
            res[base_i + idx] = t;
            idx++;
        }
        base_i++;
    }
    res = res.reverse();
    while (res.length > 1 && res[0] === 0) {
        res.shift();
    }
    console.log(res.join(''));
    return res.join('');
}
console.log(1234567 * 99);
bigMulti('1234567', '99');
bigMulti('99', '1234567');
bigMulti('0001', '200');
bigMulti('0', '0');
bigMulti('0', '3');
bigMulti('3', '0');
bigMulti('301', '101');
console.log(301 * 101)

