
// Function.prototype.myCall = function (target, ...args) {
//     const temp = target.fn;
//     target.fn = this;
//     let res = target.fn(...args);
//     if(temp){
//         target.fn = temp;
//     }
//     return res;
// }


// let obj1 = {
//     name: 'a',
//     say: function(){
//         console.log(this.name);
//     }
// }

// let obj2 = {
//     name: 'b',
// }

// obj1.say.myCall(obj2);

function climb(n) {
    if (n === 2) {
        return 2;
    }
    if (n === 1) {
        return 1;
    }
    if (n <= 0) {
        return 0;
    }
    
    return climb(n - 1) + climb(n - 2);
}

console.log(climb(1));
console.log(climb(3));
console.log(climb(10));
console.log(climb(100));

