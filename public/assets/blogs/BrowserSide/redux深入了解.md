# 简介

redux的核心包括：`state`，`action`，`reducer`。

`action`是改变`state`的指令，`recuder`是处理`action`的函数，返回新的状态。

# Reducer

## 为什么要使用不可变`state`

`reducer`函数必须返回新的`state`对象。对于`react redux`来说，为了检查组件是否需要更新，他会检查从 `mapStateToProps` 中返回的值是否发生改变。由于使用**浅引用**来检测状态的改变，这意味着只有引用的地址改变，才会检测到变化，因此要返回新的`state`。

## 拆分reducers

[Redux 深入浅出， 第三节: State， Actions， 和 Reducers | Redux 中文官网](https://cn.redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#拆分-reducers)

Redux reducer 通常根据更新的 `Redux state` 部分进行拆分。

**建议根据 " features "** - （与应用程序的特定概念或区域相关的代码）来组织 Redux 应用程序文件夹和文件。**特定功能的 Redux 代码通常编写为单个文件，称为 “ slice ” 文件**，其中包含所有 reducer 逻辑和所有与应用程序状态部分相关的操作代码。

## 组合reducers

[Redux 深入浅出， 第三节: State， Actions， 和 Reducers | Redux 中文官网](https://cn.redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#组合-reducers)

但是，**Redux 存储在创建时需要 *一个* 根 reducer 函数**。那么，如何才能在不将所有代码放在一个大函数中的情况下重新使用根 redux 呢？

由于 reducers 是**一个普通的 JS 函数**，我们可以将 slice reducer 重新导入 `reducer.js`，并编写一个新的根 reducer，它唯一的工作就是调用其他两个函数。

```js
import todosReducer from './features/todos/todosSlice'
import filtersReducer from './features/filters/filtersSlice'

export default function rootReducer(state = {}, action) {
  // 返回一个新的根 state 对象
  return {
    // `state.todos` 的值是 todos reducer 返回的值
    todos: todosReducer(state.todos, action),
    // 对于这两个reducer，我们只传入它们的状态 slice
    filters: filtersReducer(state.filters, action)
  }
}
```

对于这样一个基础且符合规范的功能，`Redux`提供了专门的函数：``combineReducers``

```js
import { combineReducers } from 'redux'

import todosReducer from './features/todos/todosSlice'
import filtersReducer from './features/filters/filtersSlice'

const rootReducer = combineReducers({
  // 定义一个名为`todos`的顶级状态字段，由`todosReducer`处理
  todos: todosReducer,
  filters: filtersReducer
})

export default rootReducer
```

`combineReducers` 接受一个对象，其中键名将成为根 state 对象中的键，值是描述如何更新 Redux 状态的 slice reducer 函数。

**记住，你给 `combineReducers` 的键名决定了你的状态对象的键名是什么！**

# Actions

Redux store 并不关心该 `action.type` 字段的实际文本是什么。但是，你的代码将查看 `action.type` 以判断是否需要更新（使用`action.type`只是一个规范，由于reducer函数是自己写的，我们可以随便定义该属性的名称）。

# Redux Store

Redux **store** 汇集了构成应用程序的 state、actions 和 reducers。store 有以下几个职责:

- 在内部保存当前应用程序 state
- 通过 [`store.getState()`](https://cn.redux.js.org/api/store#getState) 访问当前 state;
- 通过 [`store.dispatch(action)`](https://cn.redux.js.org/api/store#dispatch) 更新状态;
- 通过 [`store.subscribe(listener)`](https://cn.redux.js.org/api/store#subscribe) 注册监听器回调;
- 通过 [`store.subscribe(listener)`](https://cn.redux.js.org/api/store#subscribe) 返回的 `unsubscribe` 函数注销监听器。

重要的是要注意 **Redux 应用程序中只有一个 store**。当你想要拆分数据处理逻辑时，你将使用 [reducer composition](https://cn.redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#splitting-reducers) 并创建多个可以组合在一起 reducer，而不是创建单独的 store。

## 创建store

`store`在整个应用中是唯一的。

`rootReducer`是指向`combineReducers`函数，返回的组合reducer对象。

```js
import { createStore } from 'redux'
import rootReducer from './reducer'

const store = createStore(rootReducer)

export default store
```

## 初始状态

指定`createStore`的第二个参数，初始化不同`slice`状态，这个参数的值是一个对象，键为状态名称。

## subscribe

[Store | Redux 中文官网](https://cn.redux.js.org/api/store#subscribelistener)

subscribe() 返回一个用于解绑侦听器的函数。

```js
const unsubscribe = store.subscribe(() =>
  console.log('State after dispatch: ', store.getState())
)
```

这是一个底层 API。**多数情况下，你不会直接使用它**，会使用一些 React（或其它库）的绑定。

可以通过订阅，当状态发生改变时（产生action时），判断组件是否依赖于这个状态。

# 简单实现Store

```js
function createStore(reducer, preloadedState) {
  let state = preloadedState
  const listeners = []

  function getState() {
    return state
  }

  function subscribe(listener) {
    listeners.push(listener)
    return function unsubscribe() {
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }
	// 调用reducer（假设只有一个reducer函数，不存在组合）
  function dispatch(action) {
    state = reducer(state, action)
    // 执行所有监听器
    listeners.forEach(listener => listener())
  }
	
  // 初始化状态
  dispatch({ type: '@@redux/INIT' })

  return { dispatch, subscribe, getState }
}
```

- 当你调用 `getState()` 时，Redux store 不会产生 `state` 值的额外副本。它与根 reducer 函数返回的引用完全相同。
- Redux store 对于意外更改没有做任何防护，我们可以在 reducer 内部或者 store 外部改变状态，所以必须小心避免意外更改。（必须通过`dispatch`更改状态）

# enhancer 增强

`enhancer`是`createStore`的第三个参数。[createStore | Redux 中文官网](https://cn.redux.js.org/api/createstore)

1. `reducer` *(Function)*: 接收两个参数，分别是当前的 state 树和要处理的 [action](https://cn.redux.js.org/understanding/thinking-in-redux/glossary#action)，返回新的 [state 树](https://cn.redux.js.org/understanding/thinking-in-redux/glossary#state)。
2. [`preloadedState`] *(any)*: 初始时的 state。你可以决定是否把服务端传来的 state 水合（hydrate）后传给它，或者从之前保存的用户会话中恢复一个传给它。如果你使用 [`combineReducers`](https://cn.redux.js.org/api/combinereducers) 创建 `reducer`，它必须是一个普通对象，与传入的 keys 保持同样的结构。否则，你可以自由传入任何 `reducer` 可理解的内容。
3. `enhancer` *(Function)*: Store enhancer。你可以选择指定它以使用第三方功能，如**middleware**、**时间旅行**、**持久化**来增强 store。Redux 中唯一内置的 store enhander 是 [`applyMiddleware()`](https://cn.redux.js.org/api/applymiddleware)。



## applyMiddleware()

[applyMiddleware | Redux 中文官网](https://cn.redux.js.org/api/applymiddleware)

Middleware 最常见的使用场景是无需引用大量代码或依赖类似 [Rx](https://github.com/Reactive-Extensions/RxJS) 的第三方库实现**异步 actions**。这种方式可以让你像 dispatch 一般的 actions 那样 dispatch [异步 actions](https://cn.redux.js.org/understanding/thinking-in-redux/glossary#async-action)。

```js
import { createStore, applyMiddleware } from 'redux'
import todos from './reducers'

function logger({ getState }) {
  // return的next是一个函数(aciton: {type:string, payload: any})=>{})
  // next 返回的也是一个函数
  return next => action => {
    console.log('will dispatch', action)

    // 调用 middleware 链中下一个 middleware 的 dispatch。
    const returnValue = next(action)

    console.log('state after dispatch', getState())

    // 一般会是 action 本身，除非
    // 后面的 middleware 修改了它。
    return returnValue
  }
}

const store = createStore(todos, ['Use Redux'], applyMiddleware(logger))

store.dispatch({
  type: 'ADD_TODO',
  text: 'Understand the middleware'
})
// (middleware 将打印如下信息:)
// will dispatch: { type: 'ADD_TODO', text: 'Understand the middleware' }
// state after dispatch: [ 'Use Redux', 'Understand the middleware' ]
```

`next`执行的函数是正常`reducer`函数，新增了一条Todo。

### 函数签名

上面代码的函数签名是`({ getState, dispatch }) => next => action`；

每个 middleware 接受 [`Store`](https://cn.redux.js.org/api/store) 的 [`dispatch`](https://cn.redux.js.org/api/store#dispatchaction) 和 [`getState`](https://cn.redux.js.org/api/store#getState) 函数作为命名参数，并返回一个函数（`next=>{}`）。

该函数会被传入被称为 `next` 的下一个 middleware 的 dispatch 方法，并返回一个接收 action 的新函数（`action=>{}`）。这个函数可以直接调用 `next(action)`，或者在其他需要的时刻调用，甚至根本不去调用它：

```js
action => {
    console.log('will dispatch', action)

    // 调用 middleware 链中下一个 middleware 的 dispatch。
    const returnValue = next(action)
    // action就是{ getState, dispatch }，进行链式调用。

    console.log('state after dispatch', getState())

    // 一般会是 action 本身，除非
    // 后面的 middleware 修改了它。
    return returnValue
  }
```



# 总结

关键在于定义reducer，我们当然可以将所有状态的reducer定义在一个函数里，但这不符合编程规范。