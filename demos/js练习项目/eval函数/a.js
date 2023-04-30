var code = 'function createPerson(name, age) { return { "name": name, "age": age }; } createPerson("John", 30);';
var obj = eval(code);
console.log(obj); // 输出: { name: 'John', age: 30 }

// eval函数的返回值是字符串中最后一条语句的返回值。如果字符串中最后一条语句没有返回值，那么eval函数会返回undefined。
// 在浏览器中，eval()函数内部能访问全局作用域下的变量。