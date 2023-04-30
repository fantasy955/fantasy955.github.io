// 'use strict'
var opt ={
    name: 'wjl',
    name2: this.name,  // undefined
    say(){
        console.log(this.name2);
    }
}
console.log('1', this.opt);
opt.say();