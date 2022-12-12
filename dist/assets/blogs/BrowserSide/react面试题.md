# 虚拟DOM，DIFF算法，事件处理，性能优化

[react面试题详解 - 掘金 (juejin.cn)](https://juejin.cn/post/7167159690051190791)

[React 术语词汇表 – React (reactjs.org)](https://zh-hans.reactjs.org/docs/glossary.html#propschildren)

## props.children

可以获取到组件开始标签到结束标签的内容。类似vue中的插槽？

## 高阶组件

这三者是目前react解决代码复用的主要方式：

- 高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。具体而言，高阶组件是参数为组件，返回值为新组件的函数。例如`withRoute`把函数组件包裹，支持使用路由。

- render props是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术，更具体的说，**render prop 是一个用于告知组件需要渲染什么内容的函数 prop**。

- 通常，render props 和高阶组件只渲染一个子节点。让 Hook 来服务这个使用场景更加简单。这两种模式仍有用武之地，（例如，一个虚拟滚动条组件或许会有一个 renderltem 属性，或是一个可见的容器组件或许会有它自己的 DOM 结构）。但在大部分场景下，Hook 足够了，并且能够帮助减少嵌套。

# Hooks

## 编写一个滑块的hook

[[前端面试题总结\] ⭐️ 从莉莉丝到滴滴--我的成长之路 - 掘金 (juejin.cn)](https://juejin.cn/post/7146151385707315213#heading-3)

hook的目的是重用代码，那么对于滑块，就是监听事件；

滑块为`input`元素，将`type`设置为`range`；

```js
const onSlide = (dir) => {
    console.log(dir)
  }
  const { domRef:domRef1 } = useSlide(onSlide,'v');
  const { domRef:domRef2 } = useSlide(onSlide,'h');

  return (
        <div className="App">
          <input type="range" ref={domRef1}/>
          <input type="range" ref={domRef2} style={{transform:'rotate(-90deg)',marginTop:'55px'}}/>
        </div>
      )
```

上述代码首先定义了一个回调函数，然后将回调函数作为参数传到hook函数中，hook函数返回一个ref对象，ref对象与dom元素进行绑定。

hook定义：

```js
// 自定义 hooks  useSlide
const useSlide = (cb,direction) => {
    const domRef = useRef(null);

    const handleUp = (e) => {
        if(direction==='v'){
            // cb(e.clientX)
            cb(e.target.value);
        }else if(direction==='h'){
            // cb(e.clientY)
            cb(e.target.value)
        }
    }

    useEffect(() => {
        domRef?.current?.addEventListener('mouseup',handleUp)
        return () => {
            domRef?.current?.removeEventListener('mouseup',handleUp)
        }
    },[])

    return {
        domRef
    }
}
```

这段代码首先创建了一个ref对象，然后给ref对象绑定了事件回调。那么最终，与这个ref绑定的dom元素就添加了事件监听。

# React Fiber

[彻底搞懂 React 18 并发机制的原理 - 掘金 (juejin.cn)](https://juejin.cn/post/7171231346361106440)

[React Fiber是什么 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/26027085)

进程(process)  -> 线程(thread) -> Fiber；

在**第一阶段**Reconciliation Phase，React Fiber会找出需要更新哪些DOM，这个阶段是可以被打断的；但是到了**第二阶段**Commit Phase，那就一鼓作气把DOM更新完，绝不会被打断。

# 虚拟DOM

[虚拟 DOM 到底是什么？ - 掘金 (juejin.cn)](https://juejin.cn/post/6844903870229905422)

React 是通过 babel 将 jsx 转换为 h 函数渲染的形式，

而 Vue 是使用 vue-loader 将**模版**转为 **h 函数**渲染的形式（也可以通过 babel-plugin-transform-vue-jsx 插件在 vue 中使用 jsx，本质还是转换为 h 函数渲染形式）