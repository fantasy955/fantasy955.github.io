# 案例

## 子组件

```javascript
import React, { useState } from "react";
import PropTypes from 'prop-types';

export class Person extends React.Component {
    constructor(probs) {
        super(probs)
    }
    render() {
        return (
            <ul>
                <li onClick={this.props.showMsg}>姓名: {this.props.name}</li>
                <li>性别: {this.props.sex}</li>
                <li>年龄: {this.props.age}</li>
            </ul>
        )
    }
}

Person.propTypes = {
    name: PropTypes.string.isRequired,  // 15 React.PropTypes 16+ PropTypes.
    showMsg: PropTypes.func// 方法
}
```

## 父组件

```javascript
<Person name='李四' sex='男' age='12'></Person>
```

## 小技巧

```
// 取值
const {name, age, sex} = this.probs

// 批量传递props
// 父组件
const person = {name: 'lisa', age: 12, sex: '男'}
<Person {...person}></Person>
```

### 展开运算符

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax

```
let arr1 = [1, 3, 5]
let arr2 = [2, 4, 6]
let arr3 = [...arr1, ...arr2] 
// [1,3,5,2,4,6]

// 批量求和
function sum(...nums){
	return num.reduce((prev, curr)=>prev+curr, 0)
}

// 展开运算符不能展开对象
let person = {name: 'lisa', age: 13}
console.log(...person) // error!

// ES规范新语法
// 字面量复制对象
// 对象拷贝
let person2 = {...person}

// 属性合并
let person3 = {...person, name='jack'}
```

`react`中`{}`是分隔符，因此真实批量复制语句就是`...person`，这是`babel`+`react`实现的，支持展开运算符展开对象，仅适用于标签属性传递过程。

# 修改probs

probs是只读的；

> 在Vue中我们也无法在代码中之间使用ref修改值，需要使用.value。

```

```

# 定义

## 限定类型

```
Person.propTypes = {
    name: PropTypes.string.isRequired,  // 15 React.PropTypes 16+ PropTypes.
    showMsg: PropTypes.func// 方法
}
```

## 指定默认值

```
Person.defaultProps = {
    name: '张三'
}
```

## 将定义移到类的定义中

上面两个代码块本身是给类添加属性

ES6的类本身是语法糖，还需要回到原型链分析；

构造函数

```
//给实例加属性
class Car{
	a=3; 
}

// 给类加属性
class Car{
	static a=3; 
}

class Person{
	static propTypes = {}
}
```

# 函数式组件使用Probs

> 函数没有this指针

```javascript
export function Person(props) {
	return (
            <ul>
                <li onClick={props.showMsg}>姓名: {this.props.name}</li>
                <li>性别: {props.sex}</li>
                <li>年龄: {props.age}</li>
            </ul>
	)
}
```

无法使用`state`和`refs`(可以使用hooks实现);

可以使用限制；