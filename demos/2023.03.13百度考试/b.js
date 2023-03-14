var name = 'wjl'
function fun1(){
    console.log(this.name);
}

(()=>{
    "usestrict";
    fun1();  //wjl
})();

'usestric';
function fun2(){
    console.log(this.name);  // wjl
}

fun2.apply(this);