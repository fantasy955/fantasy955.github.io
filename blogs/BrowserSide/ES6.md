# 块级作用域

`var`  声明的变量是全局作用域；

## 问题

### 变量提升

- var 命令会发生变量提升，即先使用后定义：

{
    console.log(p1);
}
var p1 = 2;


输出： `undefined`

- let，const：

{
    console.log(p1);
}
let p1 = 2;


输出：`Cannot access 'p1' before initialization`

## ES5

只有函数作用域和全局作用域，导致内层变量覆盖外层变量：

var name = 'wjl';
var demo = () => {
    console.log(name); // undefined
    var name = 'test'; 
    console.log(name); // test
}
demo();


由于变量提升，函数内部name覆盖了外层name, 而name后定义.

## ES6

```javascript
 {
   // 块级作用域
	var p1 = 1;
	let p2 = 2;
	const p3 = 3;
}
console.log(p1);
// console.log(p2);
console.log(p3);
```

![image-20220813220546143](assets/image-20220813220546143.png)![image-20220813220555731](assets/image-20220813220555731.png)

p2, p3在全局作用域不能访问。

# 解构赋值

- 数组形式声明变量

```javascript
  let [a, [b, [c]]] = [1, [2, [3]], 4];
  console.log(a); //1
  console.log(b); //2
  console.log(c); //3
  let [a, [, [c]]] = [1, [2, [3]], 4];
  console.log(a); //1
  console.log(c); //3

  let [a, [, b, [c]]] = [1, [2, [3]], 4];
  console.log(a); //Uncaught TypeError: undefined is not iterable (cannot read property Symbol(Symbol.iterator))
  console.log(c); 

  // 默认值
  let [a=3] = [1];
	console.log(a);  //1

  let [a] = [];
	console.log(a);  //undefined
```

- 对象形式声明变量

```javascript
let {foo, bar} = {foo: '123', bar: '456'};
console.log(foo);  //123
console.log(bar);  //456
  
let {foo, bar} = {a: '123', n: '456'};
console.log(foo);  //undefined
console.log(bar);  //undefined
 
// 从对象中取值
let user = {name: 'wjl', age: 23};
let {name: a} = user;
console.log(a);  // wjl
```

1-1对应，

- 函数结构赋值

  - 方便交换变量

    ```html
    let x=1; let y=2;
    [x, y] = [y, x];
    ```
    
  - 提取json数据

    ```html
    let json_data = {
        name: 'wjl',
        age: 20,
        data: [123, 456]
    };
      // 属性名和变量名一致可以省去 key_name: p_name 
    let {name, age, data: num} = json_data;
    console.log(name, age, num);  // wjl 20 [123, 456]
    ```

# for循环

  `in`拿下标，`of`拿元素

```html
let p = ['12', '32'];
for(i in p){
    console.log(i); // 0, 1
}

for(i of p){
    console.log(i); // 12, 32
}
```

# 字符串

## 模板字符串

```html
let name = 'wjl';
let str = `i'm ${wjl}`;
```

## 新增方法

`trim`：去除首位空白, `trimStart`, `trimEnd`, `startsWith`, `endsWith`, `padEnd`, `padStart`, `padEnd`

# 数组扩展

## 展开运算符

`...`

```javascript
let arr1 = [1, 2, 3, 4];
let arr2 = [5, 6, 7, 8];
console.log(...arr1);  // 1 2 3 4

console.log([...arr1, ...arr2]);  // [1, 2, 3, 4, 5, 6, 7, 8]

function plus (...params) {
    console.log(params);
}
plus(1, 2, 3, 4, 5, 6);  //[1, 2, 3, 4, 5, 6]
```

##　将类似数组对象和可迭代对象转换成数组

数组的key是下标

```javascript
// 可迭代对象
var arr1 = [4,3, 2, 1];
let a = arr1.keys();  // iterator
let b = arr1.values();  // iterator
let c = arr1.entries();  // iterator
console.log(c);
let arr2 = Array.from(c);
console.log(arr2);
```

![image-20220814104949842](assets/image-20220814104949842.png)

![image-20220814104842371](assets/image-20220814104842371.png)

```javascript
function plus(){
  console.log(arguments);
  let d = Array.from(arguments);
  console.log(d);
}
plus(1, 2, 3);
```

![image-20220814105443226](assets/image-20220814105443226.png)

## 创建数组

```javascript
let arr1 = new Array();
console.log(arr1);
let arr2 = new Array(5);  //单个内容有歧异
console.log(arr2); // [empty * 5]
let arr21 = Array.of(5); 
console.log(arr21); // [5]
let arr3 = new Array(1,2,3);
console.log(arr3);
```

![image-20220814110102019](assets/image-20220814110102019.png)

- 深拷贝

  ```javascript
  let name = 'wjl';
  let a = {
      name: 'wjl',
  };
  let arr = Array.of(name, a);
  console.log(arr);
  let arr_b = JSON.parse(JSON.stringify(arr));
  console.log(arr_b);
  ```

  ![image-20220814122251949](assets/image-20220814122251949.png)

```javascript
let name = 'wjl';
let a = {
    name: 'wjl',
};
let arr = Array.of(name, a);
console.log(arr);
let arr_b = JSON.parse(JSON.stringify(arr));
console.log(arr_b);
arr[0] = 1;
console.log(arr_b);
```

![image-20220814122351372](assets/image-20220814122351372.png)

```javascript
let name = 'wjl';
let a = {
    name: 'wjl',
};
let arr = Array.of(name, a);
console.log(arr);

let arr1 = arr;
arr1[0] = 1;
console.log(arr);
```

![image-20220814122456405](assets/image-20220814122456405.png)

## copyWithin()

原地替换

```javascript
let arr = [1, 2];
arr.copyWithin(0,1);
console.log(arr);  // [2, 2]
```

## find(), findIndex()

查找第一个满足条件的元素

```javascript
let arr = [1, 2, 3];
console.log(arr.find((n) => {
    return n > 2;
}));  // 3
console.log(arr.findIndex((n) => {
    return n > 2;
}));  // 2
```

# 对象扩展

## 相等判断

- ES5只有`==`和`===`，前者会自动转换数据类型，后者是严格相等。
- ES6添加Object.is()；非原型方法，与`===`行为级别一致，对于两个对象，一定不相等，因为地址不相等。

```javascript
console.log(0===-0);  //t
console.log(NaN===NaN); //f
console.log(Object.is(0, -0)); //f
console.log(Object.is(NaN, NaN)); //t
console.log(typeof(NaN));  //number object
```

