function Foo(){
    getName = function(){ console.log(1); };
    return this;
}
Foo.getName = function(){ console.log(2); };
Foo.prototype.getName = function(){ console.log(3); };
var getName = function(){ console.log(4); };
function getName(){ console.log(5) };

Foo.getName();     // 2      
getName(); // 4       
// 判断错误
Foo().getName();  // 1  var getName = function(){ console.log(1); };  return this: window
getName();         // 1
// end

new Foo.getName();    // 2

// 判断错误
new Foo().getName();   // undefined  --> 3
new new Foo().getName();  // undefined   ---> 3
// end