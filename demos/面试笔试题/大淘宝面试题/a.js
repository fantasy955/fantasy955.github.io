class Cash{
    constructor(num){
        this.num = '' + num;
    }
    toString(){
        console.log('toString')
        return this.num;
    }
    valueOf(){
        console.log('valueOf')
        return Symbol(1);
    }
}

const a = new Cash(1.2);
const b = new Cash(3.3);
const c = new Cash(1);

// console.log(a);
// console.log(a+b);

console.log(1 == c)