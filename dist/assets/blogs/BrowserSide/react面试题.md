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