// 匿名函数自调用 (anonymous function)(parameters);
// (function(a) {
//     console.log(a)
// })(function(){
//     console.log(2)
// });

// console.log(jQuery());

// class Person{
//     constructor(name, age){
//         this.name = name;
//         this.age = age;
//     }
//     run(){
//         console.log("i'm running");
//     }
// }
// Person.prototype.say = () => {
//     console.log('我是父类的原型函数');
// };
// class Player extends Person{
//     constructor(name, age, job){
//         super(name, age);
//         this.job = job;
//     }
//     do(){
//         console.log(`i can play ${this.job}`);
//     }
// }

function fun(a){
    console.log(a);
}
fun(123);