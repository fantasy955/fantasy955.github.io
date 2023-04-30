// class BigInt{
//     constructor(numStr){
//         this.str = numStr;
//     }
//     multiply(bInt) {
//         let [a, b] = bInt.str.length > this.str.length ? [bInt.str, this.str] : [this.str, bInt.str];
//         let diff = a.length - b.length;
//         if(diff){
//             b = new Array(diff).fill(0).join() + b;
//         }
//         let add = 0;
//         let res = '';
//         for(let i=a.length-1; i>=0; i--){
//             let n1 = parseInt(a[i]);
//             let n2 = parseInt(b[i]);
//             let tmpRes = (n1 * n2) + add;
//             let thisN = tmpRes % 10;
//             add = Math.floor(tmpRes / 10);
//             res = '' + thisN + res;
//             // console.log(thisN, add, res);

//         }
//         if (add){
//             res = '' + add  + res;
//         }
//         return res;
//     }
// }

// let bigint1 = new BigInt('1234232453525454546445458814343421545454545454');
// let bigint2 = new BigInt('1234232453525454546445459914343421536654545454');

// console.log(bigint1.multiply(bigint2));


// class Cash{
//     constructor(num){

//     }
// }

var genCssSelector = function (el) {
    let id = el.getAttribute('id');
    let classStr = Array.from(el.classList).map((c) => `.${c}`).join(' ');
    let tag = el.tagName;
    let selector = '';
    if (id) {
        selector = `#${id}`;
    } else if (classStr) {
        selector = classStr;
    } else {
        selector = tag;
    }
    if (el.parent) {
        let parentSelector = genCssSelector(el.parent);
        selector = `${parentSelector} > ${selector}`;
    }
    return selector;
}