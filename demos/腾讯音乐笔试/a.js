let num1 = 50;
let num2 = 51;
let nodeNum = num1 + num2;
let nums = new Array(nodeNum).fill(0).map((_, i) => i + 1);
let totalSum = (1 + nodeNum) * nodeNum / 2;
let part1 = [];
let part2 = [];
let used = new Array(nodeNum + 1).fill(0);

let part1Sum = 0;

function range(count) {
    for(let i=0; i<num1; i++){
        
    }
    return false
}

// console.log(nums);
let res = range(0, 0);
part2 = nums.filter(num => part1.indexOf(num) === -1);
console.log(res, part1, part2);




// function fun(root) {
//     let num1 = 0; // 奇数层节点数量
//     let num2 = 0; // 偶数层节点数量
//     let flag = 0;
//     let nodeList = [root];
//     while (nodeList.length) {
//         let n = nodeList.length;
//         for (let i = 0; i < n; i++) {
//             let node = nodeList.shift();
//             if (node.left) {
//                 nodeList.push(node.left);
//             }
//             if (node.right) {
//                 nodeList.push(node.right);
//             }
//             if (flag % 2 === 0) {
//                 num1++;
//             } else {
//                 num2++;
//             }
//         }
//         flag++;
//     }
//     if (Math.abs(num1 - num2) > 1) {
//         return null;
//     }
//     let nodeNum = num1 + num2;
//     let nums = new Array(nodeNum).fill(0).map((_, i) => i + 1);
//     let totalSum = ((1 + nodeNum) * nodeNum) / 2;
//     let part1 = [];
//     let part2 = [];
//     let used = new Array(nodeNum + 1).fill(0);

//     function range(count, tempSum) {
//         if (tempSum === Math.floor(totalSum / 2)) {
//             if (count === num1) {
//                 return true;
//             }
//             return false;
//         }
//         if (tempSum > Math.floor(totalSum / 2)) {
//             return false;
//         }
//         for (let i = 1; i <= nodeNum; i++) {
//             if (!used[i]) {
//                 used[i] = 1;
//                 part1.push(i);
//                 if (range(count + 1, tempSum + i)) {
//                     return true;
//                 }
//                 part1.pop();
//                 used[i] = 0;
//             }
//         }
//         return false;
//     }
//     let res = range(0, 0);
//     if (!res) {
//         return null;
//     }
//     part2 = nums.filter((num) => part1.indexOf(num) === -1);
//     console.log(num1, num2, part1, part2)

//     let _num1 = 0;
//     let _num2 = 0;
//     flag = 0;
//     nodeList = [root];
//     while (nodeList.length) {
//         let n = nodeList.length;
//         for (let i = 0; i < n; i++) {
//             let node = nodeList.shift();
//             if (node.left) {
//                 nodeList.push(node.left);
//             }
//             if (node.right) {
//                 nodeList.push(node.right);
//             }
//             if (flag % 2 === 0) {
//                 // 奇数层
//                 node.val = part1[_num1];
//                 _num1++;
//             } else {
//                 // 偶数层
//                 node.val = part2[_num2];
//                 _num2++;
//             }
//         }
//         flag++;
//     }

//     return root;
// }

// let a = {val: -1, left: null, right: null};
// let b = {val: -1, left: null, right: null};
// let c = {val: -1, left: null, right: null};
// let d = {val: -1, left: null, right: null};
// let e = {val: -1, left: null, right: null};
// a.left = b;
// a.right = c;
// b.right = d;
// c.left = e;

// fun(a);
