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



# 循环

## for-in 和 for-of

`for-in`遍历对象所有**属性**，`for-of`遍历对象所有**可迭代元素**；

因此，对于一个Array对象，`for-in`会输出下标，因为会将Array进行转换：

![image-20220912225616461](assets/image-20220912225616461.png)

