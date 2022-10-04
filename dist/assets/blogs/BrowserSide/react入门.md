# 什么是React

动态渲染界面的步骤：

1. 发送请求获取数据
2. 处理数据
3. 操作DOM呈现页面（发挥作用）

传统方法：DOM-API操作UI

js用模块化拆分，界面使用组件化拆分。

# 特点

- 组件化模式、声明式编码
- React native
- 虚拟DOM、Diff算法

# jsx (JavaScript XML)

在js的基础上添加额外语法规范。

XML早期用于存储和传输数据，之后被Json取代。

考虑如下变量声明：

```
const element = <h1>Hello, world!</h1>;
```

这个有趣的标签语法既不是字符串也不是 HTML。

它被称为 JSX，是一个 JavaScript 的语法扩展。我们建议在 React 中配合使用 JSX，JSX 可以很好地描述 UI 应该呈现出它应有交互的本质形式。JSX 可能会使人联想到模版语言，但它具有 JavaScript 的全部功能。

JSX 可以生成 React “元素”。我们将在[下一章节](https://react.docschina.org/docs/rendering-elements.html)中探讨如何将这些元素渲染为 DOM。下面我们看下学习 JSX 所需的基础知识。

[JSX 简介 – React (docschina.org)](https://react.docschina.org/docs/introducing-jsx.html)

## 语法规则

1. 定义虚拟DOM，不使用引号;
2. 使用JS表达式，`{}`;
3. `className`取代`class`;
4. 内联样式`style={{key: vale}}`，key使用驼峰命名，font-size -> fontSize;
5. 有一个根标签;
6. 标签必须闭合;

# 脚手架

`npx create-react-app my-app`

# js严格模式

1. 禁止函数`this`指向window；

```
use 'strict'
function test(){
	console.log(this) // undefined
}
```



# 定义组件

## 函数组件

HelloWorld.js

```javascript
const data = [1, 2, 3]

function HelloWorld() {
    return (
        <div>
            <ul>
                {
                    data.map((item) => {
                        return <li key={item} style={{fontSize: '29px'}}>{item}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default HelloWorld
```

App.js

```
import logo from './logo.svg';
import HelloWorld from './page/HelloWorld';
import './App.css';

function App() {
  return (
    <HelloWorld />
  );
}

export default App;

```

index.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## class组件

在ES6中，class (类)作为对象的模板被引入，可以通过 class 关键字定义类。

class 的本质是 function。

它可以看作一个语法糖，让对象原型的写法更加清晰、更像面向对象编程的语法。

[ES6 Class - ES6文档 (caibaojian.com)](http://caibaojian.com/es6/class.html)

[4.3 ES6 Class 类 | 菜鸟教程 (runoob.com)](https://www.runoob.com/w3cnote/es6-class.html)

```
export class Welcome extends React.Component {  // ES6
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

![image-20221004194711667](assets/image-20221004194711667.png)



## 函数组件和 class 组件的额外特性

## 状态

函数组件一般用于定义简单组件（没有状态，不进行动态更新）；

类组件一般是复杂组件，由状态驱动页面。



通常，在 React 中，构造函数仅用于以下两种情况：

- 通过给 `this.state` 赋值对象来初始化[内部 state](https://react.docschina.org/docs/state-and-lifecycle.html)。
- 为[事件处理函数](https://react.docschina.org/docs/handling-events.html)绑定实例

[React.Component – React (docschina.org)](https://react.docschina.org/docs/react-component.html#constructor)



## probs和state

简单来说，probs是使用该组件时，父组件传给当前组件的参数；

state是在构造函数内，主动添加的状态，可以将probs的值作为state的初始值。

```javascript
export class Weather extends React.Component {
    constructor(probs){
        super(probs)
        this.state = {hot: true}
        this.doChangeWeather = this.doChangeWeather.bind(this)
    }

    render (){
        return <h3 onClick={this.doChangeWeather}>今天天气热吗？{this.state.hot ? '热':'不热'}</h3>
    }

    // doChangeWeather是通过onClick回调调用，不是通过实例调用，是直接调用
    // 类中方法默认开启局部严格模式，this是undefined（不允许函数操作this）
    doChangeWeather() {
        this.setState({hot: !this.state.hot});
    }

}
```

- **为什么要在构造函数内添加：**

```
this.doChangeWeather = this.doChangeWeather.bind(this)
```

将doChangeWeather方法挂载到实例对象上。

- 能直接更改state吗？

不能，React不会捕获这次更改。

