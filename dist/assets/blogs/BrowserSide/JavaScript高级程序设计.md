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

