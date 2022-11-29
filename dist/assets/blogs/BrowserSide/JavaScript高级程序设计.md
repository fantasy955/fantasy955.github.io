# 符号

Symbol 是原始值（基础数据类型），且 Symbol 实例是唯一、不可变的。它的产生是因为要用来唯一的标记，进而用作**非字符串形式**的**对象属性**，是确保对象属性使用唯一标识符，不会发生属性冲突的危险。

## 全局符号

```javascript
let fooGlobalSymbol = Symbol.for("foo"); // 创建新符号
let otherFooGlobalSymbol = Symbol.for("foo"); // 重用已有符号
console.log(fooGlobalSymbol === otherFooGlobalSymbol); // true
```

## 符号作为属性

```
let s1 = Symbol('foo');
let o = {
	[s1]: 'foo val'
};
```

# 函数

## *函数

function * name（） 这种函数命名方式会定义一个生成器函数 (generator function)，它返回一个 Generator 对象。
调用一个生成器函数并不会马上执行它里面的语句，而是返回一个这个生成器的 迭代器 （ iterator ）对象。当这个迭代器的 next() 方法被首次（后续）调用时，其内的语句会执行到第一个（后续）出现yield的位置为止，yield 后紧跟迭代器要返回的值。或者如果用的是 yield*（多了个星号），则表示将执行权移交给另一个生成器函数（当前生成器暂停执行）。
next()方法返回一个对象，这个对象包含两个属性：value 和 done，value 属性表示本次 yield 表达式的返回值，done 属性为布尔类型，表示生成器后续是否还有 yield 语句，即生成器函数是否已经执行完毕并返回。

**普通迭代器**

```javascript
class Emitter {
	constructor (max){
		this.max = max;
		this.idx = 0;
		
	}
	* [Symbol.iterator](){
		while(this.idx < this.max){
			yield this.idx++;
		}
	}
}

let emitter = new Emitter(5);
for(const x of emitter){
	console.log(x);
}
```

# 语言基础

## 数据类型

### Null类型

Null 类型同样只有一个值，即特殊值 null。逻辑上讲，**null 值表示一个空对象指针**，这也是给 typeof 传一个 null 会返回"object"的原因。

### Number类型

Number 类型使用 **IEEE 754 格式**表示整 数和浮点值（在某些语言中也叫双精度值）。不同的**数值类型**相应地也有不同的**数值字面量格式**。

字面量格式：

- 整数

```
let intNum = 55; // 整数
```

- 八进制和十六进制

整数也可以用八进制（以 8 为基数）或十六进制（以 16 为基数）字面量表示。对于八进制字面量， 第一个数字必须是零（0），然后是相应的八进制数字（数值 0~7）。如果字面量中包含的数字超出了应 有的范围，就会忽略前缀的零，后面的数字序列会被当成十进制数，如下所示：

```
let octalNum1 = 070; // 八进制的 56 
let octalNum2 = 079; // 无效的八进制值，当成 79 处理
let octalNum3 = 08; // 无效的八进制值，当成 8 处理
```

ECMAScript 2015 或 ES6 中的八进制值通过前缀 0o 来表示；严格模式下，前缀 0 会被视为语法错误，如果要表示 八进制值，应该使用前缀 0o。——译者注

```
let hexNum1 = 0xA; // 十六进制 10 
let hexNum2 = 0x1f; // 十六进制 31
```

使用八进制和十六进制格式创建的数值在所有数学操作中都被视为十进制数值。

- 浮点值

要定义浮点值，数值中**必须包含小数点**，而且**小数点后面必须至少有一个数字**。虽然小数点前面**不是必须有整数**，但推荐加上。

## 数值转换

### 字符串

- 如果字符串包含数值字符，包括数值字符前面带加、减号的情况，则转换为一个十进制数值。 因此，Number("1")返回 1，Number("123")返回 123，Number("011")返回 11（忽略前面 的零）
- 如果字符串包含有效的浮点值格式如"1.1"，则会转换为相应的浮点值（同样，忽略前面的零）。
- 如果字符串包含有效的十六进制格式如"0xf"，则会转换为与该十六进制值对应的十进制整 数值。
- 如果是空字符串（不包含字符），则返回 0。
- 如果字符串包含除上述情况之外的其他字符，则返回 NaN。

### 对象

对象，调用 valueOf()方法，并按照上述规则转换返回的值。如果转换结果是 NaN，则调用 toString()方法，再按照转换字符串的规则转换。

# 循环

## for-in 和 for-of

`for-in`遍历对象所有**属性**，`for-of`遍历对象所有**可迭代元素**；

因此，对于一个Array对象，`for-in`会输出下标，因为会将Array进行转换：

![image-20220912225616461](assets/image-20220912225616461.png)



# Cap.4 变量、作用域与内存

## 原始值与引用值

ECMAScript 变量可以包含两种不同类型的数据：原始值和引用值。原始值（primitive value）就是 最简单的数据，引用值（reference value）则是由多个值构成的对象。

原始值数据类型：Undefined、Null、Boolean、Number、String 和 Symbol（7中数据类型中的6个，只要Object不是原始值类型）。与其他语义不同，字符串不是用对象表示的。因此在JS中，我们不能对原始字符串进行修改，只能创建新的字符串。

只有引用值可以动态添加**后面可以使用的属性**，即添加时不会报错，但之后无法使用。

### 参数传递

JS中所有函数的参数都是按值传递，但函数参数是一个对象时，这个对象的引用被复制到另一个变量，因此在函数内部我们能够改变原始对象的值。如果我们将参数重新赋值时，不会影响保存对象引用的原始变量。

```
function setName(obj) { 
 obj.name = "Nicholas"; 
 obj = new Object(); 
 obj.name = "Greg"; 
} 
let person = new Object(); 
setName(person); 
console.log(person.name);  // "Nicholas" 
```

### 确定类型

`typeof`适合用来判断变量是否是原始类型，更确切地说，它是判断一 个变量是否为字符串、数值、布尔值或 undefined 的最好方式。**不包括null**

如果值是null或对象，typeof返回`object`。

如果值是对象，ECMAScript 提供了 instanceof 操作符：

```
console.log(person instanceof Object); // 变量 person 是 Object 吗？
console.log(colors instanceof Array); // 变量 colors 是 Array 吗？
console.log(pattern instanceof RegExp); // 变量 pattern 是 RegExp 吗？
```

按照定义，所有引用值都是 Object 的实例，**因此通过 instanceof 操作符检测任何引用值和 Object 构造函数都会返回 true**。类似地，如果用 instanceof 检测原始值，则始终会返回 false， 因为原始值不是对象。

![image-20221121164107073](assets/image-20221121164107073.png)

## 执行上下文与作用域

执行上下文简称上下文，每个上下文都有一个关联的**变量对象**，而这个上下文中定义的**所有变量和函数**都存在于这个对象上。虽然**无法通过代码**访问变量对象，但后台 处理数据会用到它。

全局上下文是最外层的上下文，在浏览器中全局上下文是window对象；

每个函数都有自己的上下文，其**活动对象**用作变量对象，活动对象最初只有 一个定义变量：arguments。（**活动对象**：在JavaScript 中 ，**当一个 函数 被调用 的 时候，就会产生一个特殊 的对象** ： 活动对象 。 这个 对象中 包含了参数列表和arguments 对象 等属性。 由于 活动对象 是 变量对象的 特例，因此它包含 变量对象 所有 的 属性，如 变量 定义， 函数 定义等。）

```
var color = "blue"; 
function changeColor() { 
 let anotherColor = "red"; 
 function swapColors() { 
 let tempColor = anotherColor; 
 anotherColor = color; 
 color = tempColor; 
 // 这里可以访问 color、anotherColor 和 tempColor 
 } 
 // 这里可以访问 color 和 anotherColor，但访问不到 tempColor 
 swapColors(); 
} 
// 这里只能访问 color 
changeColor(); 
```

![image-20221121165825114](assets/image-20221121165825114.png)

### 作用域链增强

执行上下文主要有**全局上下文**和**函数上下文**两种（eval()调用内部存在第三种上下文），但有 其他方式来增强作用域链。某些语句会导致在作用**域链**前端临时添加一个上下文，这个上下文在代码执 行后会被删除：

- try/catch
- with

对 with 语句来说，会向作用域链前端添加**指定的对象**；对 catch 语句而言，则会创建一个新的变量对象，这个变量对象会包含要抛出的错误 对象的声明：

```
function buildUrl() { 
 	let qs = "?debug=true"; 
 with(location){ 
 	let url = href + qs; 
 } 
 return url; 
} 
```

location是一个对象，例如react-router中的location。

这里，with 语句将 location 对象作为上下文，因此 location 会被添加到作用域链前端。 buildUrl()函数中定义了一个变量 qs。当 with 语句中的代码引用变量 href 时，实际上引用的是 location.href，也就是自己变量对象的属性。在引用 qs 时，引用的则是定义在 buildUrl()中的那 个变量，它定义在函数上下文的变量对象上。而在 with 语句中使用 var 声明的变量 url 会成为函数 上下文的一部分，可以作为函数的值被返回；但像这里使用 let 声明的变量 url，因为被限制在**块级作 用域**（稍后介绍），所以在 with 块之外没有定义。

![image-20221121172239512](assets/image-20221121172239512.png)

### 变量声明

使用var声明变量，**变量会添加到最接近的上下文**。

```
{
    var name = '123'
}
console.log(name) // 123
```

以上说明普通的块并不会产生一个上下文，name被添加到全局上下文中。

```
{
    let name = '123'
}
console.log(name)
```

![image-20221121172818087](assets/image-20221121172818087.png)

全局上下文没有定义name。而let声明的变量只在当前作用域内可以访问，不会添加到上下文。

## 垃圾回收

JavaScript 是使用垃圾回收的语言，也就是说**执行环境**（浏览器，V8引擎）负责在代码执行时管理内存。

在浏览器的发展史上，用到过两种主要的标记策略：标记清理和引用计数；**标记清理**是一种标记策略，通过标记清理标记应该销毁的变量。

### 标记清理

- 垃圾回收执行时，给所有在内存中的变量加上标记；
- 将所有在上下文中的变量，以及这些变量引用的变量去掉标记；
- 回收仍然被标记的变量。

### 引用计数

```js
function problem() { 
 let objectA = new Object(); 
 let objectB = new Object(); 
 objectA.someOtherObject = objectB; 
 objectB.anotherObject = objectA; 
} 
problem()
```

假设problem定义在全局上下文中，当problem执行结束后返回全局上下文时，执行垃圾回收，这是objectA，objectB都在内存中，而全局上下文以及全局上下文中不包含对objectA和objectB的引用，所有他们会被回收。

而在引用计数下，由于发生互相引用，因此不会被清理。

### 内存管理

- 隐藏类和删除操作

运行期间，V8 会将创建的对象与隐藏类关联起来，以**跟踪它们的属性特征**。

[javascript - V8中的隐藏类（Hidden Classes）和内联缓存（Inline Caching）_个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000039247203?sort=newest)

因为JavaScript是动态的，可以在程序运行中增加或删除属性。

而我们需要一个结构来储存类的属性，在Java中这是静态的，类的属性一经定义不能增加或删除。这样带来的好处就是，属性的值（或是属性的指针）可以彼此间间隔固定的偏移量储存在一段连续的内存空间中。通过属性的类型可以轻松确定它的偏移量，但是由于Javascript中在运行时可以动态地改变属性类型，所以在Javascript中是这种方法是不可能实现的。

因此在js中使用相同的方法会导致更高的性能消耗，鉴于字典表这种查找属性内存位置的方式如此低效，V8使用了一种截然不同的方法进行改进，隐藏类。其实，抛开隐藏类作用在运行时的区别不谈，它和Java中的固定对象结构十分相似。在阅读下面的内容之前，请明确两个重点，第一，V8会为**每个对象关联一个隐藏类**，第二，隐藏类的目的是**优化属性的访问速度**。

- 内存泄漏

JavaScript 中的内存泄漏大部分是由不合理的 引用导致的。

1、在函数中意外声明全局变量

```
function setName() { 
 name = 'Jake'; 
} 
```

2、闭包

```
let outer = function() { 
 let name = 'Jake'; 
 return function() { 
 return name; 
 }; 
}; 
```

调用 outer()会导致分配给 name 的内存被泄漏。以上代码执行后创建了一个**内部闭包**，只要返回 的函数存在就不能清理 name，因为闭包一直在引用着它。假如 name 的内容很大（不止是一个小字符 串），那可能就是个大问题了。

## 小结

JavaScript 变量可以保存两种类型的值：原始值和引用值。原始值可能是以下 6 种原始数据类型之 一：Undefined、Null、Boolean、Number、String 和 Symbol。原始值和引用值有以下特点：

- 原始值大小固定，因此保存在栈内存上。
- 引用值是对象，存储在堆内存上。
- 包含引用值的变量实际上只包含指向相应对象的一个指针，而不是对象本身。
- typeof 操作符可以确定值的**原始类型**，而 instanceof 操作符用于确保值的引用类。

任何变量（不管包含的是原始值还是引用值）都存在于某个执行上下文中（也称为作用域）。这个 上下文（作用域）决定了变量的生命周期，以及它们可以访问代码的哪些部分。执行上下文可以总结 如下：

- 执行上下文分全局上下文、函数上下文和块级上下文。
- 变量的执行上下文用于确定什么时候释放内存。

JavaScript 是使用垃圾回收的编程语言，开发者不需要操心内存分配和回收。JavaScript 的垃圾回收 程序可以总结如下：

- 离开作用域的值会被自动标记为可回收，然后在垃圾回收期间被删除。
- 主流的垃圾回收算法是标记清理，即先给当前不使用的值加上标记，再回来回收它们的内存。
- 解除变量的引用不仅可以消除循环引用（=null），而且对垃圾回收也有帮助。为促进内存回收，全局对 象、全局对象的属性和循环引用都应该在不需要时解除引用

# Cap.5 基本引用类型

## 5.３原始值包装类型

- 字符串

字符串是原始值，但是我们仍然可以调用其方法：

```
let s1 = "some text"; 
let s2 = s1.substring(2); 
```

原始值本身不是对象，因此逻辑上不应该有方法。这是因为后台进行了很多处理，从而实现了上述操作。具体来说，当 第二行访问 s1 时，是以**读模式**访问的，也就是要从内存中读取变量保存的值。在以读模式访问字符串 值的任何时候，后台都会执行以下 3 步：

(1) 创建一个 String 类型的实例；

(2) 调用实例上的特定方法； 

(3) 销毁实例。

可以把这 3 步想象成执行了如下 3 行 ECMAScript 代码：

```
let s1 = new String("some text"); 
let s2 = s1.substring(2); 
s1 = null; 
```

这种行为可以让原始值拥有对象的行为。对布尔值和数值而言，以上 3 步也会在后台发生，只不过 使用的是 **Boolean** 和 **Number** 包装类型而已。

引用类型和原始值包装类型的声明周期不同，自动创建的原始值包装对象则只存在于访问它的那行代码执行期间。这意味着不能在运行时给原始值添加属性和方法。比如下面的例子：

```
let s1 = "some text"; 
s1.color = "red"; 
console.log(s1.color); // undefined
```

这里的第二行代码尝试给字符串 s1 添加了一个 color 属性。可是，第三行代码访问 color 属性时， 它却不见了。原因就是第**二行代码运行时会临时创建一个 String 对象**，而当第三行代码执行时，这个对 象已经被销毁了。实际上，第三行代码在这里创建了自己的 String 对象，但这个对象没有 color 属性。

使用 new 调用原始值包装类型的构造函数，与调用同名的转型函数并不一样。例如：

```
let value = "25"; 
let number = Number(value); // 转型函数
console.log(typeof number); // "number" 
let obj = new Number(value); // 构造函数
console.log(typeof obj); // "object" 
```

在这个例子中，变量 number 中保存的是一个值为 25 的原始数值，而变量 obj 中保存的是一个 Number 的实例。Number只是将字符串转成了数字，而new 操作创建的是Numbe实例。

### 字符串

- substring，substr，和slice方法异同

对 slice()和 substring()而言，第二个参数是提取结 束的位置（即该位置之前的字符会被提取出来）。对 substr()而言，第二个参数表示返回的子字符串数量。 任何情况下，省略第二个参数都意味着提取到字符串末尾。

##　5.4单例内置对象

ECMA-262 对内置对象的定义是“任何由 **ECMAScript 实现**（Nodejs，V8）提供、与宿主环境无关，并在 ECMAScript 程序开始执行时就存在的对象”。包括 Object、Array 和 String。本节介绍 ECMA-262 定义的另外两个单例内置对象：Global 和 Math。

### 5.4.1Global

isNaN()、isFinite()、parseInt()和 parseFloat()，实际上都是 Global 对象的方法。除 了这些，Global 对象上还有另外一些方法。

- URL编码
- eval()方法

这个方法就是一个完 整的 ECMAScript 解释器，它接收一个参数，即一个要执行的 ECMAScript（JavaScript）字符串。来看 一个例子：

```
eval("console.log('hi')"); 
```

上面这行代码的功能与下一行等价：

```
console.log("hi");
```

## 5.5小结

JavaScript 中的对象称为引用值，几种内置的引用类型可用于创建特定类型的对象。

JavaScript 比较独特的一点是，函数实际上是 Function 类型的实例，也就是说函数也是对象。因 为函数也是对象，所以**函数也有方法**，可以用于增强其能力。

# Cap.6 集合引用类型

## 6.1Object

创建对象的两种方式：new操作符和对象字面量：

```
let person = new Object(); 
person.name = "Nicholas"; 
person.age = 29; 

let person = { 
 name: "Nicholas", 
 age: 29 
}; 
```

这里`={}`会产生一个表达式上下文。

 在使用对象字面量表示法定义对象时，**并不会实际调用** Object 构造函数。

**参数传递**

这种模式非常适合函数有大量可选参数的情况。一般来说，命名参数更直观，但在 可选参数过多的时候就显得笨拙了。**最好的方式是**对必选参数使用命名参数，再通过一个对象字面量来封装多个可选参数。

## 6.2Array

### 6.2.1创建数组

与对象一样，在使用数组字面量表示法创建数组不会调用 Array 构造函数。

**两个 ES6 新增的**用于创建数组的静态方法：from()和 of()。from()用于将 **类数组结构**转换为**数组实例**，而 of()用于将**一组参数**转换为**数组实例**。

### 6.2.2数组空位

使用数组字面量初始化数组时，可以使用一串逗号来创建空位（hole）。ECMAScript 会将逗号之间 相应索引位置的值当成空位，**ES6 规范重新定义了该如何处理这些空位**。

可以像下面这样创建一个空位数组：

```
const options = [,,,,,]; // 创建包含 5 个元素的数组
console.log(options.length); // 5 
console.log(options); // [,,,,,] 
```

ES6 新增的方法和迭代器与早期 ECMAScript 版本中存在的方法行为不同。ES6 新增方法普遍将这 些空位当成存在的元素，只不过值为 undefined：

```
const options = [1,,,,5]; 
for (const option of options) { 
 console.log(option === undefined); 
} 
// false 
// true 
// true 
// true 
// false 

const a = Array.from([,,,]); // 使用 ES6 的 Array.from()创建的包含 3 个空位的数组
for (const val of a) { 
 alert(val === undefined); 
} 
// true 
// true 
// true 
alert(Array.of(...[,,,])); // [undefined, undefined, undefined] 
for (const [index, value] of options.entries()) { 
 alert(value); 
} 
// 1 
// undefined 
// undefined 
// undefined 
// 5
```

ES6 之前的方法则会忽略这个空位，但具体的行为也会因方法而异：

```
const options = [1,,,,5]; 
// map()会跳过空位置
console.log(options.map(() => 6)); // [6, undefined, undefined, undefined, 6] 
// join()视空位置为空字符串
console.log(options.join('-')); // "1----5" 
```

ES6之前的方法会跳过空位，而ES6之后会仍然遍历该位置。

### 6.2.3数组索引

数组的length可以被修改，通过修改，可以对数组增加或删除元素。删除元素好理解；增加长度时，会将新元素设为undefined。

```
const options = [1,,,,5]; 
// map()会跳过空位置
console.log(options.map(() => 6)); // [6, undefined, undefined, undefined, 6] 
// join()视空位置为空字符串
console.log(options.join('-')); // "1----5" 
```

![image-20221123171026024](assets/image-20221123171026024.png)

![image-20221123171040510](assets/image-20221123171040510.png)

### 6.2.4 检测数组

使用 instanceof 的问题是假定只有一个全局执行上下文。如果网页里有多个框架，则可能涉及两 个不同的全局执行上下文，因此就会有两个不同版本的 Array 构造函数。

为解决这个问题，ECMAScript 提供了 Array.isArray()方法。这个方法的目的就是确定一个值是 否为数组，而不用管它是在哪个全局执行上下文中创建的。来

### 6.2.5迭代器方法

在 ES6 中，Array 的原型上暴露了 3 个用于检索数组内容的方法：keys()、values()和 entries()。keys()返回数组索引的迭代器，values()返回数组元素的迭代器，而 entries()返回 **索引/值对**的迭代器。

### 6.2.11 操作方法

- concat

isConcatSpreadable符号控制数组能否被打平。

- slice
- splice 非常强大，可以实现指定位置删除和插入。

### 6.2.13 迭代方法

- every：对数组每一项都运行传入的函数，如果对**每一项函数都返回 true，则这个方法返回 true**。
- filter：对数组每一项都运行传入的函数，函数返回 true 的项会**组成数组之后返回**。
- forEach：对数组每一项都运行传入的函数，没有返回值。
- map：对数组每一项都运行传入的函数，**返回由每次函数调用的结果构成的数组**。
- some：对数组每一项都运行传入的函数，如果有一项函数返回 true，则这个方法返回 true。

### 6.2.14 归并方法

- reduce

## 6.3 定型数组

数组中元素的类型是指定的。产生的原因是JavaScript默认的双精度数值表示形式在与其他语言程序交互时，需要进行类型转换，花费了许多额外的时间。
### 6.3.2  ArrayBuffer

Float32Array 实际上是一种“视图”，可以允许 JavaScript 运行时访问一块名为 ArrayBuffer 的 预分配内存。**ArrayBuffer 是所有定型数组及视图引用的基本单位**.

ArrayBuffer()是一个普通的 JavaScript 构造函数，可用于在内存中分配特定数量的字节空间。

ArrayBuffer 一经创建就不能再调整大小。不过，可以使用 slice()复制其全部或部分到一个新 实例中：

```
const buf1 = new ArrayBuffer(16); 
const buf2 = buf1.slice(4, 12); 
alert(buf2.byteLength); // 8 
```

ArrayBuffer 某种程度上类似于 C++的 malloc()，但也有几个明显的区别。

- malloc()在分配失败时会返回一个 null 指针。ArrayBuffer 在分配失败时会抛出错误。
- malloc()可以利用虚拟内存，因此最大可分配尺寸**只受可寻址系统内存限制**。ArrayBuffer 分配的内存不能超过 Number.MAX_SAFE_INTEGER（2^53 - 1）字节。
- malloc()调用成功**不会初始化实际的地址**。声明 ArrayBuffer 则会将所有二进制位初始化 为 0。
- 通过 malloc()分配的堆内存除非调用 free()或程序退出，否则系统不能再使用。而**通过声明 ArrayBuffer 分配的堆内存可以被当成垃圾回收，不用手动释放**。

不能仅通过对 ArrayBuffer 的引用就读取或写入其内容。要读取或写入 ArrayBuffer，就必须 通过视图。视图有不同的类型，但引用的都是 ArrayBuffer 中存储的二进制数据。

### 6.3.3 DataView

```
// 创建一个16字节的buf
const buf = new ArrayBuffer(16); 

// DataView 默认使用整个 ArrayBuffer 
const fullDataView = new DataView(buf); 
alert(fullDataView.byteOffset); // 0 
alert(fullDataView.byteLength); // 16 
alert(fullDataView.buffer === buf); // true 

// 构造函数接收一个可选的字节偏移量和字节长度
// byteOffset=0 表示视图从缓冲起点开始
// byteLength=8 可以使用8个字节
const firstHalfDataView = new DataView(buf, 0, 8); 
alert(firstHalfDataView.byteOffset); // 0 
alert(firstHalfDataView.byteLength); // 8 
alert(firstHalfDataView.buffer === buf); // true 

// 如果不指定，则 DataView 会使用剩余的缓冲
// byteOffset=8 表示视图从缓冲的第 9 个字节开始
// byteLength 未指定，默认为剩余缓冲
const secondHalfDataView = new DataView(buf, 8); 
alert(secondHalfDataView.byteOffset); // 8
alert(secondHalfDataView.byteLength); // 8 
alert(secondHalfDataView.buffer === buf); // true 
```

要通过 DataView 读取缓冲，还需要几个组件：

- 首先是要读或写的**字节偏移量**。可以看成 DataView 中的某种“地址”。
- DataView 应该使用 ElementType 来实现 JavaScript 的 Number 类型到缓冲内二进制格式的转 换。
- 最后是内存中值的字节序。默认为大端字节序。

![image-20221124154745528](assets/image-20221124154745528.png)

DataView 为上表中的每种类型都暴露了 get 和 set 方法，这些方法使用 byteOffset（字节偏移 量）定位要读取或写入值的位置。类型是可以互换使用的，如下例所示：

```
// 在内存中分配两个字节并声明一个 DataView 
const buf = new ArrayBuffer(2); 
const view = new DataView(buf); 

// 说明整个缓冲确实所有二进制位都是 0 
// 检查第一个和第二个字符
alert(view.getInt8(0)); // 0 
alert(view.getInt8(1)); // 0 
// 检查整个缓冲
alert(view.getInt16(0)); // 0 
// 将整个缓冲都设置为 1 
// 255 的二进制表示是 11111111（2^8 - 1）
view.setUint8(0, 255); 
// DataView 会自动将数据转换为特定的 ElementType 
// 255 的十六进制表示是 0xFF 
view.setUint8(1, 0xFF); 
// 现在，缓冲里都是 1 了
// 如果把它当成二补数的有符号整数，则应该是-1 
alert(view.getInt16(0)); // -1 

```

**字节序**

大端字节序：最高位在第一个字节（最左边），默认为大端字节序。

### 6.3.4 定性数组

定型数组是另一种形式的 ArrayBuffer 视图。虽然概念上与 DataView 接近，但定型数组的区别 在于，它**特定于一种 ElementType** 且遵循系统**原生的字节序**。相应地，定型数组提供了适用面更广的 API 和更高的性能。设计定型数组的目的就是提高与 WebGL 等原生库交换二进制数据的效率。由于定 型数组的二进制表示对操作系统而言是一种容易使用的格式，JavaScript 引擎可以重度优化算术运算、 按位运算和其他对定型数组的常见操作，因此使用它们速度极快。

**上溢和下溢**

上溢的位不会影响相邻索引：

```
// 长度为 2 的有符号整数数组
// 每个索引保存一个二补数形式的有符号整数
// 范围是-128（-1 * 2^7）~127（2^7 - 1），只有8位
const ints = new Int8Array(2); 
// 长度为 2 的无符号整数数组
// 每个索引保存一个无符号整数
// 范围是 0~255（2^7 - 1）
const unsignedInts = new Uint8Array(2); 

// 索引只取最低有效位上的 8 位
unsignedInts[1] = 256; // 0x100 
// 1被舍弃
console.log(unsignedInts); // [0, 0] 
unsignedInts[1] = 511; // 0x1FF 
// 1被舍弃
console.log(unsignedInts); // [0, 255] 
```

下溢的位会被转换为其无符号的等价值：

```
// 0xFF 是以二补数形式表示的-1（截取到 8 位）, 
// 但 255 是一个无符号整数
unsignedInts[1] = -1 // 0xFF (truncated to 8 bits) 
console.log(unsignedInts); // [0, 255] 
// 上溢自动变成二补数形式
// 0x80 是无符号整数的 128，是二补数形式的-128 
ints[1] = 128; // 0x80 
console.log(ints); // [0, -128] 
// 下溢自动变成二补数形式
// 0xFF 是无符号整数的 255，是二补数形式的-1 
ints[1] = 255; // 0xFF 
console.log(ints); // [0, -1] 
```

原理是：api将内存中指定的位置为我们设定的值，而如何解析这个值，由对象决定。

`ints[1] = 128;`将内存中的二进制位设置为`0x80 `，因为是有符号数，这个二进制数对应的值是-128.

## 6.4 Map

ECMAScript 6 以前，在 JavaScript 中实现“键/值”式存储可以使用 Object 来方便高效地完成，也 就是使用对象属性作为键，再使用属性来引用值。但这种实现**并非没有问题**（有问题），为此 TC39 委员会专门为 “键/值”存储定义了一个规范。

作为 ECMAScript 6 的新增特性，Map 是一种新的集合类型，为这门语言带来了真正的键/值存储机 制。Map 的大多数特性都可以通过 Object 类型实现，但二者之间还是存在一些细微的差异。具体实践 中使用哪一个，还是值得细细甄别。

### 6.4.1 基本API

Nan作为键会导致意料之外的错误，因为Nan和任何值比较，结果都是false。

- set
- has
- keys
- values
- get
- clear
- delete(key)

**与严格相等一样，在映射中用作键和值的对象及其他“集合”类型，在自己的内容或属性被修改时 仍然保持不变.**

```
const m = new Map(); 
const objKey = {}, objVal = {};
const arrKey = [], arrVal = [];
m.set(objKey, objVal); 
m.set(arrKey, arrVal); 
objKey.foo = "foo"; 
objVal.bar = "bar"; 
arrKey.push("foo"); 
arrVal.push("bar"); 
console.log(m.get(objKey)); // {bar: "bar"} 
console.log(m.get(arrKey)); // ["bar"] 
```

对象作为键，对象更新后，map中的键同步更新（引用同一个对象）

### 6.4.2 顺序与迭代

与 Object 类型的一个主要差异是，Map 实例会维护键值对的插入顺序，因此可以根据插入顺序执 行迭代操作。

Map可迭代，对象不可迭代。

```
for (let pair of m.entries()) { 
 alert(pair); 
} 
// [key1,val1] 
// [key2,val2] 
// [key3,val3] 
for (let pair of m[Symbol.iterator]()) { 
 alert(pair); 
} 
// [key1,val1] 
// [key2,val2] 
// [key3,val3] 

map.forEach((key, value)=>{}， opt_thisArg)
```

如果不使用迭代器，而是使用回调方式，则可以调用映射的 forEach(callback, opt_thisArg) 方法并传入回调，依次迭代每个键/值对。传入的回调接收可选的第二个参数，这个参数用于**重写回调 内部 this 的值**。

### 6.4.3 选择Object还是Map

1.内存占用

Object 和 Map 的工程级实现在不同浏览器间存在明显差异，但存储单个键/值对所占用的**内存数量都会随键的数量线性增加**。批量添加或删除键/值对则取决于各浏览器对该类型内存分配的工程实现。 不同浏览器的情况不同，但给定固定大小的内存，**Map 大约可以比 Object 多存储 50%的键/值对**。

2.插入性能

向 Object 和 Map 中插入新键/值对的消耗大致相当，不过**插入 Map 在所有浏览器中一般会稍微快 一点儿**。对这两个类型来说，**插入速度**并不会随着键/值对数量而线性增加。如果代码涉及大量插入操 作，那么显然 Map 的性能更佳。

3.查找速度

与插入不同，从大型 Object 和 Map 中查找键/值对的性能差异极小，但如果只包含少量键/值对， 则 Object 有时候速度更快。在把 Object 当成数组使用的情况下（比如使用连续整数作为属性），浏览器引擎可以进行优化，在内存中使用更高效的布局。这对 Map 来说是不可能的。对这两个类型而言， **查找速度不会随着键/值对数量增加而线性增加**。如果代码涉及大量查找操作，那么某些情况下可能选 择 Object 更好一些

4.删除性能

使用 delete 删除 Object 属性的性能一直以来饱受诟病，目前在很多浏览器中仍然如此。为此， 出现了一些伪删除对象属性的操作，包括把属性值设置为 undefined 或 null。但很多时候，这都是一 种讨厌的或不适宜的折中。而对大多数浏览器引擎来说，Map 的 delete()操作都比插入和查找更快。 如果代码涉及大量删除操作，那么毫无疑问应该选择 Map。

## 6.5 WeakMap

ECMAScript 6 新增的“弱映射”（WeakMap）是一种新的集合类型，为这门语言带来了**增强的键/ 值对存储机制**。WeakMap 是 Map 的“兄弟”类型，其 API 也是 Map 的子集。WeakMap 中的“weak”（弱）， **描述的是 JavaScript 垃圾回收程序对待“弱映射”中键的方式**。

### 6.5.1 基本API

弱映射中的键只能是 Object 或者继承自 Object 的类型，尝试使用非对象设置键会抛出 TypeError。值的类型没有限制。

### 6.5.2 弱键

WeakMap 中“weak”表示弱映射的键是“弱弱地拿着”的。意思就是，**这些键不属于正式的引用**， 不会阻止垃圾回收。

只要键存在，键/值 对就会存在于映射中，并被当作对值的引用，因此就不会被当作垃圾回收。

```
const wm = new WeakMap(); 
wm.set({}, "val");
```

set()方法初始化了一个新对象并将它用作一个字符串的键。因为没有指向这个对象的其他引用， **所以当这行代码执行完成后，这个对象键就会被当作垃圾回收**。然后，这个键/值对就从弱映射中消失 了，使其成为一个空映射。在这个例子中，**因为值也没有被引用，所以这对键/值被破坏以后，值本身 也会成为垃圾回收的目标**。

```
const wm = new WeakMap(); 
const container = { 
 key: {} 
}; 
wm.set(container.key, "val"); 
function removeReference() { 
 container.key = null; 
} 
```

这一次，**container 对象维护着一个对弱映射键的引用**，因此这个对象键不会成为垃圾回收的目 标。不过，如果调用了 removeReference()，就会摧毁键对象的最后一个引用，垃圾回收程序就可以 把这个键/值对清理掉。

### 6.5.3 不可迭代键

因为 WeakMap 中的键/值对任何时候都可能被销毁，所以没必要提供迭代其键/值对的能力。当然， 也用不着像 clear()这样一次性销毁所有键/值的方法。WeakMap 确实没有这个方法。**因为不可能迭代， 所以也不可能在不知道对象引用的情况下从弱映射中取得值。**

WeakMap 实例之所以限制只能用对象作为键，是为了**保证只有通过键对象的引用才能取得值**。如果 允许原始值，那就没办法区分初始化时使用的字符串字面量和初始化之后使用的一个相等的字符串了。

### 6.5.4 使用弱映射

WeakMap 实例与现有 JavaScript 对象有着很大不同，可能一时不容易说清楚应该怎么使用它。这个 问题没有唯一的答案，但已经出现了很多相关策略。

**1.私有变量**

弱映射造就了在 JavaScript 中实现真正私有变量的一种新方式。前提很明确：私有变量会存储在弱映射中，以对象实例为键，以私有成员的字典为值：

```
const wm = new WeakMap(); 
class User { 
 constructor(id) { 
   this.idProperty = Symbol('id'); 
   this.setId(id); 
 } 
 setPrivate(property, value) { 
   const privateMembers = wm.get(this) || {}; 
   privateMembers[property] = value; 
   wm.set(this, privateMembers); 
 } 
 getPrivate(property) { 
 	return wm.get(this)[property]; 
 } 
 setId(id) { 
 	this.setPrivate(this.idProperty, id); 
 } 
 getId() { 
 	return this.getPrivate(this.idProperty); 
 } 
} 
const user = new User(123); 
alert(user.getId()); // 123 
user.setId(456); 
alert(user.getId()); // 456 
```

对于上面的实现，外部代码只需要拿到对象实例的引用和弱映射，就可以 取得“私有”变量了。为了避免这种访问，可以用一个闭包把 WeakMap 包装起来，这样就可以把弱映 射与外界完全隔离开了：

```
// 并不是真正私有的
alert(wm.get(user)[user.idProperty]); // 456 
```

```
const User = (() => { 
 const wm = new WeakMap(); 
 class User { 
 constructor(id) { 
 this.idProperty = Symbol('id'); 
172 第 6 章 集合引用类型
 this.setId(id); 
 } 
 setPrivate(property, value) { 
 const privateMembers = wm.get(this) || {}; 
 privateMembers[property] = value; 
 wm.set(this, privateMembers); 
 } 
 getPrivate(property) { 
 return wm.get(this)[property]; 
 } 
 setId(id) { 
 this.setPrivate(this.idProperty, id); 
 } 
 getId(id) { 
 return this.getPrivate(this.idProperty); 
 } 
 } 
 return User; 
})(); 
const user = new User(123); 
alert(user.getId()); // 123 
user.setId(456); 
alert(user.getId()); // 456
```

这样，拿不到弱映射中的健，也就无法取得弱映射中对应的值。虽然这防止了前面提到的访问，但 **整个代码也完全陷入了 ES6 之前的闭包私有变量模式**。

2. **DOM 节点元数据**

因为 WeakMap 实例不会妨碍垃圾回收，所以非常适合保存关联元数据。来看下面这个例子，其中 使用了常规的 Map：

```
const m = new Map(); 
const loginButton = document.querySelector('#login'); 
// 给这个节点关联一些元数据
m.set(loginButton, {disabled: true}); 
```

假设在上面的代码执行后，页面被 JavaScript 改变了，原来的登录按钮从 DOM 树中被删掉了。但 由于映射中还保存着按钮的引用，所以对应的 DOM 节点仍然会逗留在内存中，**除非明确将其从映射中 删除或者等到映射本身被销毁。**

## 6.6 Set

## 6.7 WeakSet

## 6.8 迭代与拓展操作

ECMAScript 6 新增的迭代器和扩展操作符对**集合引用类型**特别有用。这些新特性让集合类型之间 相互操作、复制和修改变得异常方便

这也意味着所有这些类型都兼容扩展操作符。扩展操作符在对可迭代对象执行浅复制时特别有用， 只需简单的语法就可以复制整个对象

## 6.9 小结

JavaScript 中的对象是引用值，可以通过几种内置引用类型创建特定类型的对象。

- 引用类型与传统面向对象编程语言中的类相似，但实现不同。

**JS是基于对象，java是面向对象**

由于实现不同，js对象是动态的，可以动态添加或删除属性。

- Object 类型是一个基础类型，所有引用类型都从它继承了基本的行为。
- Array 类型表示一组有序的值，并提供了操作和转换值的能力。
- 定型数组包含一套不同的引用类型，用于管理数值在内存中的类型。
- Date 类型提供了关于日期和时间的信息，包括当前日期和时间以及计算。
- RegExp 类型是 ECMAScript 支持的正则表达式的接口，提供了大多数基本正则表达式以及一些 高级正则表达式的能力。

JavaScript 比较独特的一点是，函数其实是 Function 类型的实例，**这意味着函数也是对象**。由于 函数是对象，**因此也就具有能够增强自身行为的方法。** 因为原始值包装类型的存在，所以 JavaScript 中的原始值可以拥有类似对象的行为。有 3 种原始值 包装类型：Boolean、Number 和 String。它们都具有如下特点

- 每种包装类型都映射到同名的原始类型
- 在以读模式访问原始值时，后台会实例化一个原始值包装对象，通过这个对象可以操作数据。
- 涉及原始值的语句只要一执行完毕，包装对象就会立即销毁。

JavaScript 还有两个在一开始执行代码时就存在的内置对象：Global 和 Math。其中，Global 对 象在大多数 ECMAScript 实现中无法直接访问。不过浏览器将 Global 实现为 window 对象。所有全局 变量和函数都是 Global 对象的属性。Math 对象包含辅助完成复杂数学计算的属性和方法。

ECMAScript 6 新增了一批引用类型：Map、WeakMap、Set 和 WeakSet。这些类型为组织应用程序 数据和简化内存管理提供了新能力。

# Cap.7 迭代器与生成器

## 7.1 理解迭代

简单循环迭代

- 迭代之前需要事先知道如何使用数据结构。数组中的每一项都只能先通过引用取得数组对象， 然后再通过[]操作符取得特定索引位置上的项。这种情况并不适用于所有数据结构。
- 遍历顺序并不是数据结构固有的。通过递增索引来访问数据是特定于数组类型的方式，并不适 用于其他具有隐式顺序的数据结构。

ES5 新增了 Array.prototype.forEach()方法，这个方法解决了单独记录索引和通过数组对象取得值的问题。不过，**没有办法标识迭代何时终止**。 **因此这个方法只适用于数组，而且回调结构也比较笨拙**。

## 7.2 迭代器模式

迭代器模式（特别是在 ECMAScript 这个语境下）描述了一个方案，即可以把有些结构称为“可迭 代对象”（iterable），因为它们实现了正式的 Iterable 接口，而且可以通过迭代器 Iterator 消费。

任何实现 Iterable 接口的数据结构都可以被实现 Iterator 接口的结构“消费”（consume）。迭代器（iterator）是按需创建的一次性对象。每个**迭代器**都会关联一个**可迭代对象**，而迭代器会暴露迭代其关联可迭代对象的 API。迭代器无须了解与其关联的可迭代对象的结构，只需要知道如何取得连续的值。这种概念上的分离正是 Iterable 和 Iterator 的强大之处。

### 7.2.1 可迭代协议

在 ECMAScript 中，这意味着必须暴露一个属性作为“默认迭代器”，而 且这个属性必须使用特殊的 Symbol.iterator 作为键。这个默认迭代器属性必须**引用一个迭代器工厂 函数**，调用这个工厂函数必须返回一个新迭代器。

```
let str = 'abc'; 
let arr = ['a', 'b', 'c']; 
let map = new Map().set('a', 1).set('b', 2).set('c', 3); 
let set = new Set().add('a').add('b').add('c'); 
let els = document.querySelectorAll('div'); 
// 这些类型都实现了迭代器工厂函数
console.log(str[Symbol.iterator]); // f values() { [native code] } 
console.log(arr[Symbol.iterator]); // f values() { [native code] } 
console.log(map[Symbol.iterator]); // f values() { [native code] } 
console.log(set[Symbol.iterator]); // f values() { [native code] } 
console.log(els[Symbol.iterator]); // f values() { [native code] } 
// 调用这个工厂函数会生成一个迭代器
console.log(str[Symbol.iterator]()); // StringIterator {} 
console.log(arr[Symbol.iterator]()); // ArrayIterator {} 
console.log(map[Symbol.iterator]()); // MapIterator {} 
console.log(set[Symbol.iterator]()); // SetIterator {} 
console.log(els[Symbol.iterator]()); // ArrayIterator {} 
```

实际写代码过程中，不需要显式调用这个工厂函数来生成迭代器。实现可迭代协议的所有类型都会 自动兼容接收可迭代对象的任何语言特性。接收可迭代对象的原生语言特性包括：

- for-of 循环
- 数组解构
- 扩展操作符
- Array.from()
- 创建集合
- 创建映射
- Promise.all()接收由期约组成的可迭代对象
- Promise.race()接收由期约组成的可迭代对象
- yield*操作符，在生成器中使用

可迭代协议就是我们要在可迭代对象上定义这个原型属性，并引用一个迭代器工厂函数。

### 7.2.2 迭代器协议

迭代器是一种一次性使用的对象，用于迭代与其关联的可迭代对象。迭代器 API 使用 next()方法 在可迭代对象中遍历数据。每次成功调用 next()，都会返回一个 IteratorResult 对象，其中包含迭 代器返回的下一个值。若不调用 next()，则无法知道迭代器的当前位置。

next()方法返回的迭代器对象 IteratorResult 包含两个属性：done 和 value。done 是一个布 尔值，表示是否还可以再次调用 next()取得下一个值；value 包含可迭代对象的下一个值（done 为 false），或者 undefined（done 为 true）。done: true 状态称为“耗尽”。可以通过以下简单的数 组来演示：

```
// 可迭代对象
let arr = ['foo', 'bar']; 
// 迭代器工厂函数
console.log(arr[Symbol.iterator]); // f values() { [native code] } 
// 迭代器
let iter = arr[Symbol.iterator](); 
console.log(iter); // ArrayIterator {} 
// 执行迭代
console.log(iter.next()); // { done: false, value: 'foo' } 
console.log(iter.next()); // { done: false, value: 'bar' } 
console.log(iter.next()); // { done: true, value: undefined }
```

迭代器维护着一个指向可迭代对象的引用，因此迭代器会阻止垃圾回收程序回收可 迭代对象。

迭代器是iter，可迭代对象是数组。

Iterator 接口，有next属性，迭代器实现了Iterator 接口接口。

“迭代器”的概念有时候容易模糊，因为它可以指通用的迭代，也可以指接口，还可以指正式的迭 代器类型。下面的例子比较了一个显式的迭代器实现和一个原生的迭代器实现：

```
// 这个类实现了可迭代接口（Iterable） 
// 调用默认的迭代器工厂函数会返回
// 一个实现迭代器接口（Iterator）的迭代器对象
class Foo { 
 [Symbol.iterator]() { 
   return { 
     next() { 
       return { done: false, value: 'foo' }; 
     	} 
   } 
  } 
} 
let f = new Foo(); 
// 打印出实现了迭代器接口的对象
console.log(f[Symbol.iterator]()); // { next: f() {} } 
// Array 类型实现了可迭代接口（Iterable）
// 调用 Array 类型的默认迭代器工厂函数
// 会创建一个 ArrayIterator 的实例
let a = new Array(); 
// 打印出 ArrayIterator 的实例
console.log(a[Symbol.iterator]()); // Array Iterator {} 
```

### 7.2.3 自定义迭代器

与 Iterable 接口类似，任何实现 Iterator 接口的对象都可以作为迭代器使用。下面这个例子中 的 Counter 类只能被迭代一定的次数：

```
class Counter { 
 // Counter 的实例应该迭代 limit 次
 constructor(limit) { 
 this.count = 1; 
 this.limit = limit; 
 } 
 next() { 
 if (this.count <= this.limit) { 
 return { done: false, value: this.count++ }; 
 } else { 
 return { done: true, value: undefined }; 
 } 
 } 
 [Symbol.iterator]() { 
 return this; 
 } 
} 
let counter = new Counter(3); 
for (let i of counter) { 
 console.log(i); 
} 
// 1 
// 2 
// 3 
```

这个类实现了 Iterator 接口，但不理想。这是因为它的每个实例只能被迭代一次。

为了让一个可迭代对象能够创建多个迭代器，必须每创建一个迭代器就对应一个新计数器。为此， 可以把计数器变量放到闭包里，然后通过闭包返回迭代器：

```
class Counter { 
 constructor(limit) { 
   this.limit = limit; 
 } 
 [Symbol.iterator]() { 
   let count = 1, 
   limit = this.limit; 
   return { 
     next() { 
     if (count <= limit) { 
     	return { done: false, value: count++ }; 
     } else { 
     	return { done: true, value: undefined }; 
   	} 
   } 
  }; 
 } 
} 
```

### 7.2.4 提前终止迭代器

可选的 return()方法用于指定在迭代器提前关闭时执行的逻辑。执行迭代的结构在想让迭代器知 道它不想遍历到可迭代对象耗尽时，就可以“关闭”迭代器。可能的情况包括：

- for-of 循环通过 break、continue、return 或 throw 提前退出；
- 解构操作并未消费所有值。

return()方法必须返回一个有效的 IteratorResult 对象。简单情况下，可以只返回{ done: true }。 因为这个返回值只会用在**生成器的上下文中**，所以本章后面再讨论这种情况。

```
class Counter { 
 constructor(limit) { 
 	this.limit = limit; 
 } 
 [Symbol.iterator]() { 
   let count = 1, 
   limit = this.limit; 
   return { 
     next() { 
       if (count <= limit) { 
       	return { done: false, value: count++ }; 
       } else { 
       	return { done: true }; 
     	} 
   	 }, 
     return() { 
       console.log('Exiting early'); 
       return { done: true }; 
     } 
   }; 
 } 
} 
```

```
let counter1 = new Counter(5); 
for (let i of counter1) { 
 if (i > 2) { 
 	break; 
 } 
 console.log(i); 
} 
// 1 
// 2 
// Exiting early
```

如果迭代器没有关闭，则还可以继续从上次离开的地方继续迭代。比如，**数组的迭代器就是不能关 闭的**：

```
let a = [1, 2, 3, 4, 5]; 
let iter = a[Symbol.iterator](); 
for (let i of iter) { 
 console.log(i); 
 if (i > 2) { 
 	break 
 } 
} 
// 1 
// 2 
// 3 
for (let i of iter) { 
 console.log(i); 
} 
// 4 
// 5 
```

因为 return()方法是可选的，所以并非所有迭代器都是可关闭的。要知道某个迭代器是否可关闭， 可以测试这个迭代器实例的 return 属性是不是函数对象。**不过，仅仅给一个不可关闭的迭代器增加这 个方法**并不能让它变成可关闭的。这是因为调用 return()不会强制迭代器进入关闭状态。即便如此， return()方法还是会被调用。

## 7.3 生成器

生成器是 ECMAScript 6 新增的一个极为灵活的结构，拥有在一个函数块内暂停和恢复代码执行的 能力。这种新能力具有深远的影响，比如，使用生成器可以**自定义迭代器**和实现协程。

### 7.3.1 生成器基础

生成器的形式是一个函数，函数名称前面加一个星号（*）表示它是一个生成器。只要是可以定义 函数的地方，就可以定义生成器。

```
// 生成器函数声明
function* generatorFn() {} 
// 生成器函数表达式
let generatorFn = function* () {}
// 作为对象字面量方法的生成器函数
let foo = { 
 * generatorFn() {} 
} 
// 作为类实例方法的生成器函数
class Foo { 
 * generatorFn() {} 
} 
// 作为类静态方法的生成器函数
class Bar { 
 static * generatorFn() {} 
} 
```

**注意 箭头函数不能用来定义生成器函数。**

**调用生成器函数会产生一个生成器对象**。生成器对象一开始处于暂停执行（suspended）的状态。与 迭代器相似，**生成器对象也实现了 Iterator 接口**，因此具有 next()方法。调用这个方法会让生成器 开始或恢复执行。

next()方法的返回值类似于迭代器，有一个 done 属性和一个 value 属性。函数体为空的生成器 函数中间不会停留，调用一次 next()就会让生成器到达 done: true 状态。

生成器对象实现了 Iterable 接口，它们默认的迭代器是自引用的（iterator返回this，因为这个对象有next()方法，参考7.2.3）：

```
function* generatorFn() {} 
const g = generatorFn(); 
console.log(g === g[Symbol.iterator]()); 
// true 
```

### 7.3.2 通过 yield 中断执行

遇到之前：正常执行

遇到：返回参数给

遇到之后：停止

yield 关键字可以让生成器**停止**和**开始**执行，也是生成器最有用的地方。生成器函数在**遇到 yield 关键字之前会正常执行**。遇到这个关键字后，执行会停止，**函数作用域的状态会被保留**。停止执行的生 成器函数只能通过在生成器对象上调用 next()方法来恢复执行：

```
function* generatorFn() { 
 yield; 
} 
let generatorObject = generatorFn(); 
console.log(generatorObject.next()); // { done: false, value: undefined } 
console.log(generatorObject.next()); // { done: true, value: undefined } 
```

此时的yield 关键字有点像函数的中间返回语句，**它生成的值会出现在 next()方法返回的对象里**。 通过 yield 关键字退出的生成器函数会处在 done: false 状态；**通过 return 关键字退出的生成器函 数会处于 done: true 状态**。

```
function* generatorFn() { 
 yield 'foo'; 
 yield 'bar'; 
 return 'baz'; 
} 
let generatorObject = generatorFn(); 
console.log(generatorObject.next()); // { done: false, value: 'foo' } 
console.log(generatorObject.next()); // { done: false, value: 'bar' } 
console.log(generatorObject.next()); // { done: true, value: 'baz' } 
```

生成器函数内部的执行流程会针对每个生成器对象区分作用域。在一个生成器对象上调用 next() 不会影响其他生成器：

与迭代器一致。

```
function* generatorFn() { 
 yield 'foo'; 
 yield 'bar'; 
 return 'baz'; 
} 
let generatorObject1 = generatorFn(); 
let generatorObject2 = generatorFn(); 

console.log(generatorObject1.next()); // { done: false, value: 'foo' } 
console.log(generatorObject2.next()); // { done: false, value: 'foo' } 

```

- 生成器对象作为可迭代对象

```
function* generatorFn() { 
 yield 1; 
 yield 2; 
 yield 3; 
} 
for (const x of generatorFn()) { 
 console.log(x); 
} 
// 1 
// 2 
// 3 
```

- 使用 yield 实现输入和输出

除了可以作为函数的中间返回语句使用，yield 关键字还可以作为**函数的中间参数使用**。上一次让 生成器函数暂停的 yield 关键字会接收到传给 next()方法的第一个值。这里有个地方不太好理解—— 第一次调用 next()传入的值不会被使用，因为这一次调用是为了开始执行生成器函数：

```
function* generatorFn(initial) { 
 console.log(initial); 
 console.log(yield); 
 console.log(yield); 
} 
let generatorObject = generatorFn('foo'); 
generatorObject.next('bar'); // foo 
generatorObject.next('baz'); // baz 
generatorObject.next('qux'); // qux
```

当初始化生成器对象时，传入了`foo`，而此时由于没有调用`next`，生成器内部的代码不会执行，第一次执行`next`输出的是`initial`然后遇到`yield`暂停了。

之后`yield`接收到的都是调用`next`时传递的参数。

- 产生可迭代对象

可以使用**星号增强 yield 的行为**，让它能够**迭代一个可迭代对象**，从而一次产出一个值：

```
// 等价的 generatorFn： 
// function* generatorFn() { 
// for (const x of [1, 2, 3]) { 
// yield x; 
// } 
// } 
function* generatorFn() { 
 yield* [1, 2, 3]; 
} 
```

与生成器函数的星号类似，yield 星号两侧的空格不影响其行为：

```
function* generatorFn() { 
 yield* [1, 2]; 
 yield *[3, 4]; 
 yield * [5, 6]; 
}
```

- 使用 yield*实现递归算法

yield***最有用的地方是实现递归操作**，此时生成器可以产生自身。看下面的例子：

```
function* nTimes(n) { 
 if (n > 0) { 
 yield* nTimes(n - 1); 
 yield n - 1; 
 } 
} 
for (const x of nTimes(3)) { 
 console.log(x); 
} 
// 0 
// 1 
// 2
```

## 7.3.3 生成器作为默认迭代器

因为生成器对象实现了 Iterable 接口，而且**生成器函数**和**默认迭代器**被调用之后都产生**迭代器**(有`next`方法)， 所以生成器格外适合作为默认迭代器。下面是一个简单的例子，这个类的默认迭代器可以用一行代码产 出类的内容：

使用`*`标记该属性

```
class Foo { 
 constructor() { 
 	this.values = [1, 2, 3]; 
 }
 * [Symbol.iterator]() { 
 	yield* this.values; 
 } 
} 
```

## 7.3.4 提前终止生成器

与迭代器类似，生成器也支持“可关闭”的概念。一个实现 Iterator 接口的对象一定有 next() 方法，还有一个可选的 return()方法用于提前终止迭代器。**生成器对象除了有这两个方法，还有第三 个方法：throw()**。

```
function* generatorFn() {} 
const g = generatorFn(); 
console.log(g); // generatorFn {<suspended>} 
console.log(g.next); // f next() { [native code] } 
console.log(g.return); // f return() { [native code] } 
console.log(g.throw); // f throw() { [native code] }
```

return()和 throw()方法都可以用于强制生成器进入关闭状态。

- return()

return()方法会强制生成器进入**关闭状态**。提供给 return()方法的值，就是终止迭代器对象的值：

```
function* generatorFn() { 
 for (const x of [1, 2, 3]) { 
 	yield x; 
 } 
} 
const g = generatorFn(); 
console.log(g); // generatorFn {<suspended>} 
console.log(g.return(4)); // { done: true, value: 4 } 
console.log(g); // generatorFn {<closed>} 
```

与迭代器不同，所有生成器对象都有 return()方法，只要通过它进入关闭状态，就无法恢复了。 后续调用 next()会显示 done: true 状态，而提供的任何返回值都不会被存储或传播：

迭代器需要自己定义return 方法。

一旦执行return方法，生成器就不会被for-of等内置循环语句执行，退出循环。

- throw

throw()方法会在暂停的时候将一个提供的错误注入到生成器对象中。如果错误未被处理，生成器 就会关闭：

```
function* generatorFn() { 
 for (const x of [1, 2, 3]) { 
 	yield x; 
 } 
} 
const g = generatorFn(); 
console.log(g); // generatorFn {<suspended>} 
try { 
 g.throw('foo'); 
} catch (e) { 
 console.log(e); // foo 
} 
console.log(g); // generatorFn {<closed>} 
```

不过，假如生成器函数内部处理了这个错误，那么生成器就不会关闭，而且还可以恢复执行。错误 处理会跳过对应的 yield，因此在这个例子中会跳过一个值。比如：

```
function* generatorFn() { 
   for (const x of [1, 2, 3]) { 
   try { 
    yield x; 
   } catch(e) {} 
 } 
} 

const g = generatorFn(); 
console.log(g.next()); // { done: false, value: 1} 
g.throw('foo'); 
console.log(g.next()); // { done: false, value: 3} 
```

在这个例子中，生成器在 try/catch 块中的 yield 关键字处暂停执行。**在暂停期间**，throw()方 法向生成器对象内部注入了一个错误：字符串"foo"。**这个错误会被 yield 关键字抛出**（在这里抛出错误，因为遇到yield暂停了）。因为错误是在 生成器的 try/catch 块中抛出的，所以仍然在生成器内部被捕获。可是，由于 yield 抛出了那个错误， 生成器就不会再产出值 2。此时，生成器函数继续执行，在下一次迭代再次遇到 yield 关键字时产出了 值 3。

**如果生成器对象还没有开始执行**，那么调用 throw()抛出的错误不会在函数内部被 捕获，因为这相当于在函数块外部抛出了错误。

## 7.4 小结

迭代是一种所有编程语言中都可以看到的模式。ECMAScript 6 正式支持迭代模式并引入了两个新的 语言特性：迭代器和生成器。

**迭代器是一个可以由任意对象实现的接口**，支持连续获取对象产出的每一个值。任何实现 Iterable 接口的对象都有一个 Symbol.iterator 属性，这个属性引用默认迭代器。默认迭代器就像一个迭代器 工厂，也就是一个函数，调用之后会产生一个实现 Iterator 接口的对象。

迭代器必须通过连续调用 next()方法才能连续取得值，这个方法返回一个 **IteratorObject**。这 个对象包含一个 done 属性和一个 value 属性。前者是一个布尔值，表示是否还有更多值可以访问；后者包含迭代器返回的当前值。这个接口可以通过手动反复调用 next()方法来消费，也可以通过原生消 费者，比如 for-of 循环来自动消费	

**生成器是一种特殊的函数**，调用之后会返回一个生成器对象。生成器对象实现了 Iterable 接口， 因此可用在任何消费可迭代对象的地方。生成器的独特之处在于支持 yield 关键字，这个关键字能够 暂停执行生成器函数。使用 yield 关键字还可以通过 next()方法接收输入和产生输出。在加上星号之 后，yield 关键字可以将跟在它后面的可迭代对象序列化为一连串值。

# Cap.8 对象、类与面向对象编程

## 8.1 理解对象

### 8.1.1 属性的类型

**数据属性**

ECMA-262 使用一些内部特性来描述属性的特征。这些特性是由为 JavaScript 实现**引擎的规范**定义 的。因此，开发者**不能在 JavaScript 中直接访问这些特性**。为了将某个特性标识为内部特性，规范会用 两个中括号把特性的名称括起来，比如[[Enumerable]]。

- [[Configurable]]：表示属性**是否可以通过 delete 删除并重新定义**，是否可以修改它的特 性，以及是否可以把它改为访问器属性。默认情况下，所有直接定义在对象上的属性的这个特 性都是 true，如前面的例子所示。
- [[Enumerable]]：表示属性是否可以通过 for-in 循环返回。默认情况下，所有**直接定义在对 象**上的属性的这个特性都是 true，如前面的例子所示。
- [[Writable]]：表示属性的值是否可以被修改。默认情况下，所有直接定义在对象上的属性的 这个特性都是 true，如前面的例子所示。
- [[Value]]：包含属性实际的值。这就是前面提到的那个读取和写入属性值的位置。这个特性 的默认值为 undefined。

**要修改属性的默认特性，就必须使用 Object.defineProperty()方法**。这个方法接收 3 个参数： 要给其添加属性的**对象**、属性的名称和一个**描述符对象**。最后一个参数，即描述符对象上的属性可以包 含：configurable、enumerable、writable 和 value，跟相关特性的名称一一对应。根据要修改 的特性，可以设置其中一个或多个值。比如：

```
let person = {}; 
Object.defineProperty(person, "name", { 
 writable: false, 
 value: "Nicholas" 
}); 
console.log(person.name); // "Nicholas" 
person.name = "Greg"; 
console.log(person.name); // "Nicholas"
```

一个属性被定义为不可配置之后，就不能再变回可配置的了。再次调用 Object.defineProperty()并修改任何非 writable 属性会导致 错误。

**访问器属性**

访问器属性不包含数据值。相反，它们包含一个获取（getter）函数和一个设置（setter）函数，不 过这两个函数不是必需的。在读取访问器属性时，会调用获取函数，这个函数的责任就是返回一个有效 的值。在写入访问器属性时，会调用设置函数并传入新值，这个函数必须决定对数据做出什么修改。访 问器属性有 4 个特性描述它们的行为。

- [[Configurable]]：表示属性是否可以通过 delete 删除并重新定义，是否可以修改它的特 性，以及是否可以把它改为数据属性。默认情况下，所有直接定义在对象上的属性的这个特性 都是 true。
- [[Enumerable]]：表示属性是否可以通过 for-in 循环返回。默认情况下，所有直接定义在对 象上的属性的这个特性都是 true。
- [[Get]]：获取函数，在读取属性时调用。默认值为 undefined。
- [[Set]]：设置函数，在写入属性时调用。默认值为 undefined。

访问器属性是不能直接定义的，必须使用 Object.defineProperty()。下面是一个例子：

```
// 定义一个对象，包含伪私有成员 year_和公共成员 edition 
let book = { 
 year_: 2017, 
 edition: 1 
}; 
Object.defineProperty(book, "year", { 
 get() { 
 	return this.year_; 
 }, 
 set(newValue) { 
   if (newValue > 2017) { 
     this.year_ = newValue; 
     this.edition += newValue - 2017; 
   } 
 } 
}); 
book.year = 2018; 
console.log(book.edition); // 2
```

**只定义获取函数意味着属性是只读的**，尝试修改属性会被忽 略。在严格模式下，尝试写入只定义了获取函数的属性会抛出错误。类似地，**只有一个设置函数的属性 是不能读取的**，非严格模式下读取会返回 undefined，严格模式下会抛出错误。

### 8.1.2 定义多个属性

Object.defineProperties()方法。这个方法可以通过多个描述符一次性定义多个属性。它接收两个参数：要为之添 加或修改属性的对象和另一个描述符对象，其属性与要添加或修改的属性一一对应：

```
let book = {}; 
Object.defineProperties(book, { 
 year_: { 
 	value: 2017 
 }, 
 edition: { 
 	value: 1 
 }, 
 year: { 
   get() { 
   	return this.year_; 
 	 }, 
  set(newValue) { 
   if (newValue > 2017) { 
   	this.year_ = newValue; 
   	this.edition += newValue - 2017; 
   } 
  } 
 } 
}); 
```

这段代码在 book 对象上定义了**两个数据属性 year_和 edition**，还有一个**访问器属性 year**。 最终的对象跟上一节示例中的一样。唯一的区别是所有属性都是同时定义的，并且数据属性的 configurable、enumerable 和 writable 特性值都是 false。

### 8.1.3 读取属性的特性

使用 Object.getOwnPropertyDescriptor()方法可以取得指定属性的**属性描述符**。

```
let book = {}; 
Object.defineProperties(book, { 
 year_: { 
 value: 2017 
 }, 
 edition: { 
 value: 1 
 }, 
 year: { 
 get: function() { 
 return this.year_; 
 }, 
 set: function(newValue){ 
 if (newValue > 2017) { 
 this.year_ = newValue; 
 this.edition += newValue - 2017; 
 } 
 } 
 } 
}); 
let descriptor = Object.getOwnPropertyDescriptor(book, "year_"); 
console.log(descriptor.value); // 2017 
console.log(descriptor.configurable); // false 
console.log(typeof descriptor.get); // "undefined" 

let descriptor = Object.getOwnPropertyDescriptor(book, "year"); 
console.log(descriptor.value); // undefined 
console.log(descriptor.enumerable); // false 
console.log(typeof descriptor.get); // "function" 
```

ECMAScript 2017 新增了 Object.getOwnPropertyDescriptors()静态方法。这个方法实际上 会在每个自有属性上调用 Object.getOwnPropertyDescriptor()并在一个新对象中返回它们。

### 8.1.4 合并对象

JavaScript 开发者经常觉得“合并”（merge）两个对象很有用。更具体地说，就是把源对象所有的 本地属性一起复制到目标对象上。有时候这种操作也被称为“混入”（mixin），因为目标对象通过混入 源对象的属性得到了增强。

ECMAScript 6 专门为合并对象提供了 Object.assign()方法。这个方法接收一个**目标对象**和**一个 或多个**源对象作为参数，然后将每个源对象中可枚举（Object.propertyIsEnumerable()返回 true） 和自有（Object.hasOwnProperty()返回 true）属性复制到目标对象。以字符串和符号为键的属性 会被复制。对每个符合条件的属性，这个方法会使用源对象上的[[Get]]取得属性的值，然后使用目标 对象上的[[Set]]设置属性的值。

Object.assign()实际上对每个源对象执行的是浅复制。如果多个源对象都有相同的属性，则使 用最后一个复制的值。此外，从源对象访问器属性取得的值，比如获取函数，会作为一个静态值赋给目 标对象。换句话说，不能在两个对象间转移获取函数和设置函数。

通过`Object.defineProperties`定义的属性也不能被复制。

```

```

### 8.1.5 对象标识及相等判定、

ECMAScript 6 规范新增了 Object.is()，这个方法与===很像，但考虑 到了边界情形。这个方法必须接收两个参数：

```
// 正确的 0、-0、+0 相等/不等判定
console.log(Object.is(+0, -0)); // false 
console.log(Object.is(+0, 0)); // true 
console.log(Object.is(-0, 0)); // false 
```

### 8.1.6 增强的对象语法

ECMAScript 6 为定义和操作对象新增了很多极其有用的**语法糖特性**。这些特性都没有改变现有引擎 的行为，但极大地提升了处理对象的方便程度。

1. 属性值简写

   ```
   let person = { 
    name 
   }; 
   ```

2. 可计算属性

   使用变量的值作为属性。

   在引入可计算属性前，不能在对象字面量中直接**动态命名属性**：

   ```
   const nameKey = 'name'; 
   const ageKey = 'age'; 
   const jobKey = 'job'; 
   let person = {}; 
   person[nameKey] = 'Matt'; 
   person[ageKey] = 27; 
   person[jobKey] = 'Software engineer'; 
   ```

   引入可计算属性后：

   ```
   const nameKey = 'name'; 
   const ageKey = 'age'; 
   const jobKey = 'job'; 
   let person = { 
    [nameKey]: 'Matt', 
    [ageKey]: 27, 
    [jobKey]: 'Software engineer' 
   }; 
   ```

   因为被当作 JavaScript 表达式求值，所以可计算属性本身可以是复杂的表达式，在实例化时再求值：

   ```
   const nameKey = 'name'; 
   const ageKey = 'age'; 
   const jobKey = 'job'; 
   let uniqueToken = 0; 
   function getUniqueKey(key) { 
    return `${key}_${uniqueToken++}`; 
   } 
   let person = { 
    [getUniqueKey(nameKey)]: 'Matt', 
    [getUniqueKey(ageKey)]: 27, 
    [getUniqueKey(jobKey)]: 'Software engineer' 
   }; 
   console.log(person); // { name_0: 'Matt', age_1: 27, job_2: 'Software engineer' }
   ```

   **注意** 可计算属性表达式中抛出任何错误都会中断对象创建。如果计算属性的表达式有副 作用，那就要小心了，因为如果表达式抛出错误，那么之前完成的计算是不能回滚的。

3. 简写方法名

   在给对象定义方法时，通常都要写一个方法名、冒号，然后再引用一个匿名函数表达式，如下所示：

   ```
   let person = { 
    sayName: function(name) { 
    console.log(`My name is ${name}`); 
    } 
   }; 
   ```

   ```
   let person = { 
    sayName(name) { 
    console.log(`My name is ${name}`); 
    } 
   }; 
   ```

   简写方法名对**获取函数**和**设置函数**也是适用的：

   ```
   let person = { 
    name_: '', 
    get name() { 
    return this.name_; 
    }, 
    set name(name) { 
    this.name_ = name; 
    }, 
    sayName() { 
    console.log(`My name is ${this.name_}`); 
    } 
   }; 
   person.name = 'Matt'; 
   person.sayName(); // My name is Matt
   ```

   简写方法名与可计算属性键相互兼容：

   ```
   const methodKey = 'sayName'; 
   let person = { 
    [methodKey](name) { 
    console.log(`My name is ${name}`); 
    } 
   } 
   person.sayName('Matt'); // My name is Matt 
   ```

### 8.1.7 对象解构

ECMAScript 6 新增了对象解构语法，可以在一条语句中使用嵌套数据实现一个或多个赋值操作。

```
// 不使用对象解构
let person = { 
 name: 'Matt', 
 age: 27 
}; 
let personName = person.name, 
 personAge = person.age; 
```

- 然后，是使用对象解构的：

```
let { name: personName, age: personAge } = person;
```

`name: personName`是指定`personName`所对应的键，因为名称不相同。

- 解构赋值不一定与对象的属性匹配。赋值的时候可以忽略某些属性，而如果引用的属性不存在，则 该变量的值就是 undefined：

```
let person = { 
 name: 'Matt', 
 age: 27 
}; 
let { name, job } = person; 
console.log(name); // Matt 
console.log(job); // undefined 
```

- 也可以在解构赋值的同时定义默认值：

```
let person = { 
 name: 'Matt', 
 age: 27 
}; 
let { name, job='Software engineer' } = person; 
console.log(name); // Matt 
console.log(job); // Software engineer 
```

解构在内部使用函数 ToObject()（**不能在运行时环境中直接访问**）把源数据结构转换为对象。这意味着在对象解构的上下文中（即`with`语句的上下文），原始值会被当成对象。这也意味着（根据 ToObject()的定义），null 和 undefined 不能被解构，否则会抛出错误

- 解构**并不要求变量必须在解构表达式中声明**。不过，如果是**给事先声明**的变量赋值，则赋值表达式必须包含在一对括号中：

```
let personName, personAge; 
let person = { 
 name: 'Matt', 
 age: 27 
}; 
({name: personName, age: personAge} = person); 
```

- 嵌套解构

```
let person = { 
 name: 'Matt', 
 age: 27, 
 job: { 
 title: 'Software engineer' 
 } 
}; 
// 声明 title 变量并将 person.job.title 的值赋给它
let { job: { title } } = person; 
console.log(title); // Software engineer
```

- 部分解构

涉及多个属性的解构赋值是一个输出无关的顺序化操作。如果一个解构表达式涉及 多个赋值，开始的赋值成功而后面的赋值出错，则整个解构赋值只会完成一部分：

```
let person = { 
 name: 'Matt', 
 age: 27 
}; 
let personName, personBar, personAge; 
try { 
 // person.foo 是 undefined，因此会抛出错误
 ({name: personName, foo: { bar: personBar }, age: personAge} = person); 
} catch(e) {} 
console.log(personName, personBar, personAge); 
// Matt, undefined, undefined 
```

- 参数上下文匹配

在函数参数列表中也可以进行解构赋值。对参数的解构赋值**不会影响 arguments 对象**，但可以在函数签名中声明在函数体内使用局部变量：

```
let person = { 
 name: 'Matt', 
 age: 27 
}; 
function printPerson(foo, {name, age}, bar) { 
 console.log(arguments); 
 console.log(name, age); 
} 
function printPerson2(foo, {name: personName, age: personAge}, bar) { 
 console.log(arguments); 
 console.log(personName, personAge); 
} 
printPerson('1st', person, '2nd'); 
// ['1st', { name: 'Matt', age: 27 }, '2nd'] 
// 'Matt', 27 
printPerson2('1st', person, '2nd'); 
// ['1st', { name: 'Matt', age: 27 }, '2nd'] 
// 'Matt', 27 
```

printPerson2是给name取了别名。

## 8.2 创建对象

虽然使用 Object **构造函数**或**对象字面量**可以方便地创建对象，但这些方式也有明显不足：创建具 有同样接口的多个对象需要重复编写很多代码。

### 8.2.1 概述

ECMAScript 5.1：原型继承

ECMAScript 6：开始正式支持类和继承

ES6 的类旨在完全涵盖之前规范设计的基于原型的继承模式。不过，无论从哪方面看，**ES6 的类都仅仅是封装了 ES5.1 构造函数加原型继承的语法糖而已**。

### 8.2.2 工厂模式

抽象创建特定对象的过程。

```
function createPerson(name, age, job) { 
 let o = new Object(); 
 o.name = name; 
 o.age = age; 
 o.job = job; 
 o.sayName = function() { 
   console.log(this.name); 
 }; 
 return o; 
} 
let person1 = createPerson("Nicholas", 29, "Software Engineer"); 
let person2 = createPerson("Greg", 27, "Doctor");
```

这种工厂模式虽然可以解决创建多个类似对象的问题，但没有解决对象标识问题（即新创建的对象是什么类型。

对象没有类型名称（无法使用instanceof判断类型）。

### 8.2.3 构造函数模式

```
function Person(name, age, job){ 
 this.name = name; 
 this.age = age; 
 this.job = job; 
 this.sayName = function() { 
 console.log(this.name); 
 }; 
} 
let person1 = new Person("Nicholas", 29, "Software Engineer"); 
let person2 = new Person("Greg", 27, "Doctor"); 
person1.sayName(); // Nicholas 
person2.sayName(); // Greg 
```

在这个例子中，Person()构造函数代替了 createPerson()工厂函数。实际上，Person()内部 的代码跟 createPerson()基本是一样的，只是有如下区别。

- 没有显式地创建对象。
- 属性和方法直接赋值给了 this
- 没有 return

要创建 Person 的实例，应使用 new 操作符。以这种方式调用构造函数会执行如下操作：

(1) 在内存中创建一个新对象。

```
const obj = {}
```

(2) 这个新对象内部的[[Prototype]]特性被赋值为构造函数的 prototype 属性。

```
obj.__proto__ = Person.prototype
```

(3) 构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）;

(4)执行构造函数内部的代码（给新对象添加属性）:

```
Person.apply(obj, args)
```

(5)如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。

```js
var res = Person.apply(obj, args)
return res instanceof Object ? res : obj 
```

在实例化时，如果不想传参数，那么构造函数后面的括号可加可不加。只要有 new 操作符，就可以 调用相应的构造函数：

```
function Person() { 
 this.name = "Jake"; 
 this.sayName = function() { 
 console.log(this.name); 
 }; 
} 
let person1 = new Person(); 
let person2 = new Person; 
```

1. 构造函数也是函数

   构造函数与普通函数唯一的区别就是调用方式不同。除此之外，构造函数也是函数。并没有把某个函数定义为构造函数的特殊语法。**任何函数只要使用 new 操作符调用就是构造函数**，而不使用 new 操 作符调用的函数就是普通函数。比如，前面的例子中定义的 Person()可以像下面这样调用：

   ```
   // 作为构造函数 
   let person = new Person("Nicholas", 29, "Software Engineer"); 
   person.sayName(); // "Nicholas" 
   // 作为函数调用
   Person("Greg", 27, "Doctor"); // 添加到 window 对象
   window.sayName(); // "Greg" 
   // 在另一个对象的作用域中调用
   let o = new Object(); 
   Person.call(o, "Kristen", 25, "Nurse"); 
   o.sayName(); // "Kristen" 
   ```

   作为普通函数，函数内的`this`指针指向是`window`，因此是给`window`加属性。

   this 始终指向 Global 对象（在浏览器中就是 window 对象）

2. 构造函数的问题

   构造函数虽然有用，但也不是没有问题。构造函数的主要问题在于，**其定义的方法会在每个实例上都创建一遍**。因此对前面的例子而言，person1 和 person2 都有名为 sayName()的方法，但这两个方法不是同一个 Function 实例。我们知道，ECMAScript 中的**函数是对象**，因此**每次定义函数时，都会初始化一个对象**。逻辑上讲，这个构造函数实际上是这样的：

   ```
   function Person(name, age, job){ 
    this.name = name; 
    this.age = age; 
    this.job = job; 
    this.sayName = new Function("console.log(this.name)"); // 逻辑等价
   } 
   ```

   要解决这个问题，可以把函数定义转移到构造函数外部：
   
   ```
   function Person(name, age, job){ 
    this.name = name; 
    this.age = age; 
    this.job = job; 
    this.sayName = sayName; 
   } 
   function sayName() { 
    console.log(this.name); 
   } 
   let person1 = new Person("Nicholas", 29, "Software Engineer"); 
   let person2 = new Person("Greg", 27, "Doctor"); 
   person1.sayName(); // Nicholas 
   person2.sayName(); // Greg 
   person1.sayName === person2.person2 // true
   ```
   
   相当于在外部执行了`sayName = new Function("console.log(this.name)");`
   
   在构造函数内将sayName 属性指向了该函数对象，sayName 对象只被创建了一次。
   
   关于this指向问题：
   
   [详解Javascript 中的this指针-阿里云开发者社区 (aliyun.com)](https://developer.aliyun.com/article/791255#:~:text=Javascript可以通过一定的设计模式来实现面向对象的编程，其中this,“指针”就是实现面向对象的一个很重要的特性。)
   
   在Javascript里面，this指针代表的是执行当前代码的对象的所有者。
   
   ```
   
   ```
   
   



