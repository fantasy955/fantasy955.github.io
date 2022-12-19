[Refs and the DOM – React (reactjs.org)](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#gatsby-focus-wrapper)

### 何时使用 Refs

下面是几个适合使用 refs 的情况：

- 管理焦点，文本选择或媒体播放。
- 触发强制动画。
- 集成第三方 DOM 库。

避免使用 refs 来做任何可以通过声明式实现来完成的事情。

举个例子，避免在 `Dialog` 组件里暴露 `open()` 和 `close()` 方法，最好传递 `isOpen` 属性。

### 勿过度使用 Refs

你可能首先会想到使用 refs 在你的 app 中“让事情发生”。如果是这种情况，请花一点时间，认真再考虑一下 state 属性应该被安排在哪个组件层中。通常你会想明白，让更高的组件层级拥有这个 state，是更恰当的。查看 [状态提升](https://zh-hans.reactjs.org/docs/lifting-state-up.html) 以获取更多有关示例。

# refs，props，state

- props收集父组件传递的属性
- state收集实例状态
- refs收集组件**真实DOM**

# 案例

```javascript
class RefsDemo {
    render() {
        return (
            <div>
                <input refs="inputa" type="text" placeholder="点击提示数据" />
                <button refs="btna" onClick={this.showData}></button>
            </div>
        )
    }
    showData = () => {
        console.log('@', this.refs.inputa.value)
    }
}
```

`refs="inputa"`已经被废弃。

### 过时 API：String 类型的 Refs

**效率问题**

如果你之前使用过 React，你可能了解过之前的 API 中的 string 类型的 ref 属性，例如 `"textInput"`。你可以通过 `this.refs.textInput` 来访问 DOM 节点。我们不建议使用它，因为 string 类型的 refs 存在 [一些问题](https://github.com/facebook/react/pull/8333#issuecomment-271648615)。它已过时并可能会在未来的版本被移除。

> 注意
>
> 如果你目前还在使用 `this.refs.textInput` 这种方式访问 refs ，我们建议用[回调函数](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#callback-refs)或 [`createRef` API](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#creating-refs) 的方式代替。

### 回调 Refs

回调函数，被`react`调用，传入参数由`react`(调用者)决定；

```
 <input ref={currentnode=>this.input1=currentnode} type="text"/>
```

**讨论：该回调执行次数**

```
 <input ref={currentnode=>{this.input1=currentnode;console.log('@@')} type="text"/>
```

React 将在**组件挂载时**，会调用 `ref` 回调函数并传入 DOM 元素，当卸载时调用它并传入 `null`。在 `componentDidMount` 或 `componentDidUpdate` 触发前，React 会保证 refs 一定是最新的。

传入`null`清空。



`render`在组件声明周期执行`1+n`次，1次挂载，n次更新；

页面更新时，`ref`回调函数也会重新调用。

如果 `ref` 回调函数是以**内联函数的方式**定义的，在更新过程中它会被执行两次，第一次传入参数 `null`，然后第二次会传入参数 DOM 元素。这是因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref 并且设置新的。通过将 ref 的回调函数定义成 **class 的绑定函数**的方式可以避免上述问题，但是大多数情况下它是无关紧要的。

```
// 类绑定回调
<input ref={this.saveInputRef} type="text"/>

class Demo extends React.Component {
// 保证函数不会发生改变
	saveInputRef = (c) => {
		this.inputa = c;
	}
}
```

### createRef

**react推荐**

```javascript
class Demo extends React.Component {
	// 这种给实例加属性的代码都可以写在构造函数中
	inputaRef = React.createRef()
  
  // 取
  this.inputaRef.current.value
  
  // render(){}
  ref = {this.inputaRef}
}
```



# 事件处理

`react`：请勿过度使用`refs`。

通过事件的`event.target`。

```javascript
import React from "react";

export class EventDemo extends React.Component {
    showMsg = () => {
        console.log('Hello World')
    }
    doOnBlur = (e) => {
        console.log(e.target.value)
    }

    render(){
        return (
            <div>
                <input onBlur={this.doOnBlur} placeholder='失去焦点提示数据'></input>
                <button onClick={this.showMsg}></button>
            </div>
        )
    }
}
```

`onXXX	`属性，命令不同于原生事件（使用驼峰命令）；

使用事件委托，事件都被加载最外层`div`上；

## 受控组件 和 非受控组件

**非受控组件:** 输入类型组件，现用现取(下方的username)；

**受控组件:** 下方的password，绑定了`onChange`事件。

（对比vue中的v-model，双向绑定）

```javascript
import React from "react";

export class EventDemo extends React.Component {
    constructor(props){
        super(props)
        this.state = {username: undefined, password: undefined}
    }

    showMsg = () => {
        console.log('Hello World')
    }
    doOnBlur = (e) => {
        console.log(e.target.value)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.value)
    }
    savePassword = (e) =>{
        console.log(e.target.value)
        this.setState({'password': e.target.value})
    }

    render(){
        return (
            <div>
                <input onBlur={this.doOnBlur} placeholder='失去焦点提示数据'></input>
                <button onClick={this.showMsg}></button>
                <br></br>
                <form onSubmit={this.handleSubmit}>
                    用户名: <input type='text' ref={c=>this.usernameinput=c} name='username' placeholder='用户名'></input>
                    密码: <input onChange={this.savePassword} name='password'></input>
                    <button >提交</button>
                </form>
            </div>
        )
    }
}
```

