[React.Component – React (reactjs.org)](https://zh-hans.reactjs.org/docs/react-component.html#constructor)

通常，在 React 中，构造函数仅用于以下两种情况：

- 通过给 `this.state` 赋值对象来初始化[内部 state](https://zh-hans.reactjs.org/docs/state-and-lifecycle.html)。

```
constructor(probs){
        super(probs)
        this.state = {hot: true}
    }
```

- 为[事件处理函数](https://zh-hans.reactjs.org/docs/handling-events.html)绑定实例

```
constructor(probs){
super(probs)
this.doChangeWeather = this.doChangeWeather.bind(this)
}
```

```
// 可以用箭头函数代替
// 构造函数中，this指向实例
doChangeWeather = () => {}
```

在 React 组件挂载之前，会调用它的构造函数。在为 React.Component 子类实现构造函数时，应在**其他语句之前调用** `super(props)`。否则，`this.props` 在构造函数中可能会出现未定义的 bug。

如果在构造器中需要通过`this`(实例)访问`props`，则需要添加`super(props)`。