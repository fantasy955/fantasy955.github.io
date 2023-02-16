## React事件机制

### 参考资料

- [【React进阶系列】史上最全React事件机制详解 - 简书 (jianshu.com)](https://www.jianshu.com/p/41776f2f4d8b)
  文字有一个例子，很好地说明了React合成事件与原生事件。

### React有10个button，都去绑定click事件，为什么不能用事件委托

React的事件机制是基于Virtual DOM实现了一个SyntheticEvent（合成事件）层，这个层次的事件不会直接绑定到目标dom节点上，而是用事件委托机制，以队列的方式，从触发事件的组件向父组件回溯直到document节点。所以，React的事件委托是在document层面的，而不是在组件层面的。这样做的好处是可以提高性能，避免频繁的绑定和解绑事件。

那么，为什么不能用事件委托呢？其实，这里的不能用事件委托是指不能用组件层面的事件委托，也就是说，不能把10个button的click事件委托到它们的父组件上，而必须在每个button上单独绑定click事件。这是因为，React的自定义组件并不是一个真实的DOM元素，它不存在点击事件，它只是一个虚拟的组件，最终会被渲染成真实的DOM元素。所以，如果把click事件传给自定义组件，组件只会认为它是一个prop，而不会触发任何事件。**只有真实的DOM元素才能绑定和触发事件**。组件如果不声明`click` prop，无法添加属性。

### 总结

原生事件上定义的捕获事件和响应事件都会先于React添加的事件执行，因为React添加的事件被代理到了document上，之后才能冒泡到document。因此React合成事件的`stopPropagation`无法阻止原生事件到达document的冒泡，注意这里说的是**无法阻止到达document之前**的冒泡，原生事件无法继续冒泡到window上。

**考察点：**

这道面试题考察的关键是React的事件机制，包括以下几个方面：

- [React的事件是合成事件（SyntheticEvent），它是一个跨浏览器的事件包装器，它有着和浏览器的原生事件相同的接口，但是可以保证事件在所有浏览器中的一致性](https://blog.csdn.net/qq_27449993/article/details/107356392)[1](https://blog.csdn.net/qq_27449993/article/details/107356392)。
- [React的事件是委托到document层面的，而不是委托到组件层面的，所以不能把事件委托到自定义组件上，而必须在真实的DOM元素上绑定事件](https://zhuanlan.zhihu.com/p/399322564)[2](https://zhuanlan.zhihu.com/p/399322564)[3](https://www.jianshu.com/p/9ce5b647313f)。
- [React的事件是被池化的，这意味着SyntheticEvent对象会被重用，而且在事件回调函数被调用后，它的所有属性会被置空，这是出于性能的考虑，避免频繁地创建和销毁事件对象](https://blog.csdn.net/qq_27449993/article/details/107356392)[1](https://blog.csdn.net/qq_27449993/article/details/107356392)[4](https://juejin.cn/post/7091919870253760520)。
- [React的事件有一些语法差异，比如用驼峰命名法对事件命名，事件作为函数而不是字符串传递，事件对象作为最后一个参数传递等](https://www.jianshu.com/p/9ce5b647313f)[3](https://www.jianshu.com/p/9ce5b647313f)。

所以，这道面试题要求面试者对React的事件机制有一个深入的理解，能够解释清楚React的事件是如何工作的，以及为什么不能用组件层面的事件委托。

---

## 函数式编程

- [函数式编程是一种编程范式，它强调函数的纯粹性，即函数的输出只依赖于输入，而不依赖于外部的状态或副作用](https://www.zhihu.com/question/317497234)[1](https://www.zhihu.com/question/317497234)；
- [函数式编程的优点是可以提高代码的可读性，可维护性，可测试性，以及并发性](https://www.zhihu.com/question/317497234)[1](https://www.zhihu.com/question/317497234)；
- [函数式编程的核心概念包括高阶函数，闭包，柯里化，惰性求值，递归，不可变数据，函数组合，代数数据类型等](https://www.zhihu.com/question/317497234)[1](https://www.zhihu.com/question/317497234)；
- [平时实现函数式编程的方法有：使用纯函数，避免使用全局变量，避免使用循环，使用函数式编程的库（如lodash，ramda等），使用支持函数式编程的语言（如Haskell，Scala，Clojure等）等](https://www.zhihu.com/question/317497234)[1](https://www.zhihu.com/question/317497234)。

----

## React Hooks

React Hooks是React 16.8新增的特性，它可以让你在不编写class的情况下使用state和其他的React特性[1](https://reactjs.org/docs/hooks-intro.html)[。React Hooks的目的是让你更方便地使用函数组件，而不需要转换为类组件](https://blog.csdn.net/qq_50384924/article/details/119302468)[2](https://blog.csdn.net/qq_50384924/article/details/119302468)[。React Hooks还提供了一种新的强大的方式来组合props, state, context, refs, 和生命周期](https://reactjs.org/docs/hooks-intro.html)[1](https://reactjs.org/docs/hooks-intro.html)。

[React Hooks的基本用法是在函数组件中使用以use开头的React API，例如useState, useEffect, useContext等。这些API可以让你在函数组件中管理状态，执行副作用，访问上下文，创建引用等。React Hooks还可以自定义，以实现更复杂的逻辑和功能](https://juejin.cn/post/6844903957957967885)[3](https://juejin.cn/post/6844903957957967885)[4](https://zhuanlan.zhihu.com/p/85491343)。

### 原理

React Hooks原理是指React Hooks是如何实现的，以及它们是如何在函数组件中提供状态和其他特性的。React Hooks原理涉及到以下几个方面：

- [React Hooks是一些以use开头的函数，它们可以在函数组件中调用，返回一些值或者执行一些操作。React Hooks利用了闭包的特性，可以在函数组件的多次渲染中保持状态和引用](https://segmentfault.com/a/1190000040887783)[1](https://segmentfault.com/a/1190000040887783)。
- [React Hooks是通过一个链表来存储和管理的，每个Hook都有一个对应的节点，包含了Hook的类型，状态，引用，依赖等信息。React Hooks链表的第一个节点被关联到当前的Fiber节点，Fiber节点是React内部用来表示组件的数据结构](https://juejin.cn/post/6844903975838285838)[2](https://juejin.cn/post/6844903975838285838)[3](https://zhuanlan.zhihu.com/p/341167678)。
- [React Hooks的调用顺序和数量必须保持一致，否则会导致Hook节点和Fiber节点的不匹配，从而引发错误。React Hooks的调用顺序和数量是通过一个全局的指针来控制的，每次调用一个Hook，指针就会向后移动一个节点，每次渲染一个组件，指针就会重置到链表的头部](https://juejin.cn/post/6844903975838285838)[2](https://juejin.cn/post/6844903975838285838)[3](https://zhuanlan.zhihu.com/p/341167678)。
- [React Hooks的更新和副作用是通过调度器和调和器来处理的，调度器负责安排组件的更新优先级和时间，调和器负责执行组件的更新和副作用。React Hooks的更新和副作用会根据Hook的类型，状态，依赖等信息，来决定是否需要触发组件的重新渲染或者执行副作用函数](https://juejin.cn/post/6844903975838285838)[2](https://juejin.cn/post/6844903975838285838)[3](https://zhuanlan.zhihu.com/p/341167678)。

### useMemo和useCallback

当我们需要从一个状态计算出另一个状态，或者传递一个函数给子组件时，可以使用useMemo。useMemo返回一个被缓存的值，只有当useMemo的依赖项发送变化时，才会重新执行创建函数。为什么使用useMemo是因为组件每次更新时，都会执行render函数，会重新计算状态或者生成新的函数引用，进而触发字组件的更新。

[memoized值和memoized对象是指使用memoization技术缓存的函数的返回值和对象。memoization是一种优化技术，它可以通过在内存中存储函数的计算结果，来减少函数的时间开销，但是会增加空间开销](https://blog.csdn.net/ztf312/article/details/82823336)[1](https://blog.csdn.net/ztf312/article/details/82823336)[2](https://en.wikipedia.org/wiki/Memoization)[3](https://stackoverflow.com/questions/53285304/implementing-memoization-in-c-sharp)。也就是说，memoization可以让函数记住它之前的运行结果，当函数再次被调用时，如果输入参数没有变化就直接返回之前的结果，避免重复计算。例如：

```python
# 定义一个斐波那契数列的函数
def fib(n):
  if n < 2:
    return n
  else:
    return fib(n-1) + fib(n-2)

# 使用memoization技术优化函数
def memoize(f):
  memo = {} # 创建一个字典来存储函数的结果
  def helper(x):
    if x not in memo: # 如果输入参数不在字典中，就计算并存储结果
      memo[x] = f(x)
    return memo[x] # 如果输入参数在字典中，就直接返回结果
  return helper

# 使用memoize函数
fib = memoize(fib)

# 调用fib函数
print(fib(10)) # 输出55
```

当useEffect和useCallback组合使用时，可能会导致无限循环。

```js
import React, { useState, useEffect, useCallback } from 'react';

function App() {
  const [count, setCount] = useState(0);

  // 使用useCallback创建一个函数，返回一个新的对象
  const getObj = useCallback(() => {
    return { value: count };
  }, [count]); // 依赖于count的变化

  // 使用useEffect执行一个副作用操作，设置一个定时器
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('useEffect执行了');
      setCount(count + 1); // 改变count的值
    }, 1000);
    return () => {
      clearInterval(timer); // 清除定时器
    };
  }, [getObj]); // 依赖于getObj的变化
  
  return (
    <div>
      <p>count: {count}</p>
    </div>
  );
}

export default App;
```

[useMemo的源码可以在GitHub上找到，这里是一个链接](https://github.com/frejs/fre)[1](https://github.com/frejs/fre)。useMemo的作用是记住一个函数的返回值，并返回一个缓存的值。useMemo有两个参数，第一个是一个函数，第二个是一个依赖数组。useMemo的源码大致如下：

```js
function useMemo(create, deps) {
  // 获取当前的hook
  const hook = mountWorkInProgressHook();
  // 获取下一次的依赖数组
  const nextDeps = deps;
  // 获取上一次的依赖数组和缓存值
  const prevState = hook.memoizedState;
  // 如果上一次的依赖数组存在，就比较是否有变化
  if (prevState !== null) {
    const prevDeps = prevState[1];
    if (areHookInputsEqual(nextDeps, prevDeps)) {
      // 如果没有变化，就直接返回上一次的缓存值
      return prevState[0];
    }
  }
  // 如果有变化，或者第一次执行，就调用函数并获取返回值
  const nextValue = create();
  // 将返回值和依赖数组保存在hook的memoizedState中
  hook.memoizedState = [nextValue, nextDeps];
  // 返回返回值
  return nextValue;
}
```

### useEffect和useLayoutEffect

[useEffect和useLayoutEffect是两种常用的React Hooks，它们都可以让你在函数组件中执行副作用，如操作DOM, 发送请求, 订阅事件等](https://blog.csdn.net/AHcola233/article/details/116716316)[1](https://blog.csdn.net/AHcola233/article/details/116716316)[2](https://blog.logrocket.com/useeffect-vs-uselayouteffect-examples/)[。它们的函数签名也是一样的，都接受一个回调函数和一个依赖数组](https://blog.csdn.net/AHcola233/article/details/116716316)[1](https://blog.csdn.net/AHcola233/article/details/116716316)[2](https://blog.logrocket.com/useeffect-vs-uselayouteffect-examples/)。

[它们的区别在于执行时机和影响](https://blog.csdn.net/AHcola233/article/details/116716316)[1](https://blog.csdn.net/AHcola233/article/details/116716316)[3](https://www.jianshu.com/p/412c874c5add)[2](https://blog.logrocket.com/useeffect-vs-uselayouteffect-examples/)[4](https://blog.csdn.net/yunfeihe233/article/details/106616674)[5](https://juejin.cn/post/6921688408737710087)：

- [useEffect是异步执行的，它会在组件渲染后呈现到屏幕上后再执行，不会阻塞DOM的更新](https://blog.csdn.net/AHcola233/article/details/116716316)[1](https://blog.csdn.net/AHcola233/article/details/116716316)[2](https://blog.logrocket.com/useeffect-vs-uselayouteffect-examples/)[4](https://blog.csdn.net/yunfeihe233/article/details/106616674)[。这样可以避免不必要的性能损耗，但也可能导致一些闪烁的问题，比如组件在很短的时间内渲染了两次](https://blog.csdn.net/AHcola233/article/details/116716316)[1](https://blog.csdn.net/AHcola233/article/details/116716316)[3](https://www.jianshu.com/p/412c874c5add)。
- [useLayoutEffect是同步执行的，它会在组件渲染后，但在浏览器进行任何绘制之前执行，会阻塞DOM的更新](https://blog.csdn.net/AHcola233/article/details/116716316)[1](https://blog.csdn.net/AHcola233/article/details/116716316)[2](https://blog.logrocket.com/useeffect-vs-uselayouteffect-examples/)[4](https://blog.csdn.net/yunfeihe233/article/details/106616674)[。这样可以避免一些闪烁的问题，比如在操作DOM时改变页面的样式](https://www.jianshu.com/p/412c874c5add)[3](https://www.jianshu.com/p/412c874c5add)[，但也可能导致一些性能损耗，比如阻塞了浏览器的绘制](https://blog.logrocket.com/useeffect-vs-uselayouteffect-examples/)[2](https://blog.logrocket.com/useeffect-vs-uselayouteffect-examples/)。

[一般来说，useEffect可以满足大部分的场景，只有在需要同步操作DOM或者避免闪烁的情况下，才需要使用useLayoutEffect](https://blog.csdn.net/AHcola233/article/details/116716316)[1](https://blog.csdn.net/AHcola233/article/details/116716316)[2](https://blog.logrocket.com/useeffect-vs-uselayouteffect-examples/)。
