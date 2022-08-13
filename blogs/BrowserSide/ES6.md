# 块级作用域

`var`  声明的变量是全局作用域；

## 问题

### 变量提升

- var 命令会发生变量提升，即先使用后定义：

<script type="text/javascript">
{
    console.log(p1);
}
var p1 = 2;

输出： `undefined`

- let，const：

<script type="text/javascript">
{
    console.log(p1);
}
let p1 = 2;
</script>

输出：`Cannot access 'p1' before initialization`

## ES5

只有函数作用域和全局作用域，导致内层变量覆盖外层变量：

<script type="text/javascript">
var name = 'wjl';
var demo = () => {
    console.log(name); // undefined
    var name = 'test'; 
    console.log(name); // test
}
demo();
</script>

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

```html
<script type="text/javascript">
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
</script>
```

- 对象形式声明变量

```html
<script type="text/javascript">
let {foo, bar} = {foo: '123', bar: '456'};
console.log(foo);  //123
console.log(bar);  //456
  
let {foo, bar} = {a: '123', n: '456'};
console.log(foo);  //undefined
console.log(bar);  //undefined
</script>
```

1-1对应，
