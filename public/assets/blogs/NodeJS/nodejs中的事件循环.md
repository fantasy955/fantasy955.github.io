主代码执行、nextTick和事件循环的区别如下：[1](https://juejin.cn/post/7030833263618818084)[2](https://juejin.cn/post/6993315229845159943)[3](https://www.jianshu.com/p/deb8bc589377)

- 主代码执行是指nodejs启动后，首先执行的输入脚本或模块。主代码执行是一个宏任务，它会在事件循环之前完成。[1](https://juejin.cn/post/7030833263618818084)[2](https://juejin.cn/post/6993315229845159943)
- nextTick是指nodejs提供的一个函数，它可以将一个回调函数放入一个微任务队列中，在当前阶段的所有操作完成后立即执行。nextTick优先于其他微任务和宏任务执行。[2](https://juejin.cn/post/6993315229845159943)[3](https://www.jianshu.com/p/deb8bc589377)
- 事件循环是指nodejs的核心特性，它可以让nodejs在单线程上执行异步操作。事件循环有六个阶段，每个阶段都有一个或多个回调函数队列。事件循环会按照一定的顺序依次进入每个阶段，并执行该阶段的所有回调函数。[1](https://juejin.cn/post/7030833263618818084)[2](https://juejin.cn/post/6993315229845159943)

> [nodejs中的事件循环是指nodejs如何处理异步任务的机制](https://www.cnblogs.com/EaVango/p/14722428.html)[1](https://www.cnblogs.com/EaVango/p/14722428.html)[2](https://www.cnblogs.com/goloving/p/16523648.html)[。宏任务和微任务是两种不同类型的异步任务，它们在事件循环中有不同的执行顺序](https://www.cnblogs.com/EaVango/p/14722428.html)[1](https://www.cnblogs.com/EaVango/p/14722428.html)[3](https://segmentfault.com/a/1190000040014996)。
>
> [简单来说，宏任务是指那些需要放到事件队列中等待执行的异步任务，比如setTimeout、setInterval、setImmediate等](https://www.cnblogs.com/EaVango/p/14722428.html)[1](https://www.cnblogs.com/EaVango/p/14722428.html)[2](https://www.cnblogs.com/goloving/p/16523648.html)[。微任务是指那些不需要进入事件队列，而是在当前宏任务执行完毕后立即执行的异步任务，比如Promise.then、process.nextTick等](https://www.cnblogs.com/EaVango/p/14722428.html)[1](https://www.cnblogs.com/EaVango/p/14722428.html)[2](https://www.cnblogs.com/goloving/p/16523648.html)。



当 Node.js 启动后，它1**会初始化事件循环**，2**处理已提供的输入脚本**（或丢入 [REPL](https://nodejs.org/api/repl.html#repl_repl)，本文不涉及到），它可能会调用一些异步的 API、调度定时器，或者调用 `process.nextTick()`，然后3**开始处理事件循环**。

事件循环是 Node.js 处理**非阻塞 I/O 操作**的机制——尽管 JavaScript 是单线程处理的——当有可能的时候，它们会把操作转移到系统内核中去。

因为目前大多数内核都是多线程的，所以它们可以在后台处理多种操作。当其中的一个操作完成的时候，内核通知 Node.js 将适合的**回调函数添**加到 ***轮询* 队列**中等待时机执行。

以下是事件循环操作顺序的简化概览：

```
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

## 阶段概述

- **定时器**：本阶段执行**已经被** `setTimeout()` 和 `setInterval()` 的调度回调函数。
- 待定回调：执行延迟到下一个循环迭代的 I/O 回调。
- idle, prepare：仅系统内部使用。
- **轮询**：检索新的 I/O 事件; 大部分情况**执行与 I/O 相关的回调**（几乎所有情况下，**除了**关闭的回调函数，那些由计时器和 `setImmediate()` 调度的之外，关闭和检测在下面两个阶段），**其余情况 node 将在适当的时候在此阻塞**。
- **检测**：`setImmediate()` 回调函数在这里执行。
- **关闭的回调函数**：一些关闭的回调函数，如：`socket.on('close', ...)`。

在每次运行的事件循环**之间**，Node.js 检查**前一个阶段**是否在等待任何异步 I/O 或计时器，如果没有的话，则完全关闭。

**每个框被称为事件循环机制的一个阶段**；`timers`是；**每个阶段**都有一个 FIFO 队列来执行回调。当事件循环进入给定的阶段时，它将执行特定于该阶段的任何操作，然后执行该阶段队列中的回调，直到队列用尽或已经执行到最大的回调数。**当该队列已用尽**或**达到回调限制**，事件循环将移动到下一阶段，以此类推。

## 轮询阶段

轮询阶段有两个重要功能：1）计算应该阻塞和轮询I/O的时间；2）处理轮询队列里的事件。

当事件循环进入 **轮询** 阶段且 *没有被调度的计时器时* ，将发生以下两种情况之一：

- *如果 **轮询** 队列 **不是空的*** ，事件循环将循环访问回调队列并同步执行它们，直到队列已用尽，或者达到了与系统相关的硬性限制。
- *如果 **轮询** 队列 **是空的*** ，还有两件事发生：
  - 如果脚本被 `setImmediate()` 调度，则事件循环将结束 **轮询** 阶段，并进入 **检测** 阶段以执行那些被调度的脚本。
  - 如果脚本 **未被** `setImmediate()`调度，则事件循环将等待回调被添加到队列中，然后立即执行。

[poll阶段是事件循环中检索新的I/O事件的阶段，执行与I/O相关的回调函数。](https://blog.csdn.net/cainiaofu/article/details/108339295)[1](https://blog.csdn.net/cainiaofu/article/details/108339295)[2](https://blog.csdn.net/agony_isolate/article/details/105077249)

[要往poll阶段添加任务，可以使用nodejs的底层库libuv提供的接口，如epoll或poll。](https://www.zhihu.com/question/330124623)[3](https://www.zhihu.com/question/330124623)[1](https://blog.csdn.net/cainiaofu/article/details/108339295)[ 这些接口可以让nodejs监听文件描述符（fd）上的事件，并在事件发生时执行相应的回调函数。](https://blog.csdn.net/cainiaofu/article/details/108339295)[1](https://blog.csdn.net/cainiaofu/article/details/108339295)[2](https://blog.csdn.net/agony_isolate/article/details/105077249)

- [如果poll阶段没有任何I/O事件或定时器到期，且没有setImmediate()函数被调用，那么nodejs会一直等待新的I/O事件到来。](https://www.zhihu.com/question/330124623)[1](https://www.zhihu.com/question/330124623)[2](https://juejin.cn/post/7080070564282368007)
- [如果poll阶段有I/O事件或定时器到期，但是没有回调函数可以执行（轮询队列为空），那么nodejs会跳过poll阶段并检查是否有setImmediate()函数被调用。](https://www.zhihu.com/question/330124623)[1](https://www.zhihu.com/question/330124623)[2](https://juejin.cn/post/7080070564282368007)否则绕回定时器阶段执行定时器的回调。
- [如果poll阶段有I/O事件或定时器到期，并且有回调函数可以执行，那么nodejs会执行回调函数，并在每次执行后检查是否有setImmediate()函数被调用。](https://www.zhihu.com/question/330124623)[1](https://www.zhihu.com/question/330124623)[2](https://juejin.cn/post/7080070564282368007)

一旦 **轮询** 队列为空，事件循环将检查 **\_已达到时间阈值的计时器\_**。如果一个或多个计时器已准备就绪，则事件循环将**绕回计时器阶段**以执行这些计时器的回调。

## 检查阶段

此阶段允许人员在 **轮询** 阶段完成后立即执行回调。如果轮询阶段变为空闲状态，并且脚本使用 `setImmediate()` 后被排列在队列中，则事件循环可能进入到 **检查** 阶段而不是等待。

`setImmediate()` 实际上是一个在**事件循环的单独阶段运行的特殊计时器**。它使用一个 libuv API 来安排回调在 **轮询** 阶段完成后执行。

通常，在执行代码时，事件循环最终会进入轮询阶段，在该阶段它将等待传入连接、请求等。但是，如果回调已使用 `setImmediate()`调度过，并且轮询阶段变为空闲状态，则它将结束此阶段，并继续到检查阶段而不是继续等待轮询事件。

## `setImmediate()` 对比 `setTimeout()`

`setImmediate`没有一个等待时间阈值的参数，一旦结束轮询阶段，则它的回调函数会立刻执行。

`setTimeout`则是在经过指定时间后，将任务添加到**定时器阶段**的任务队列中。参考**轮询阶段**描述的：

> 一旦 **轮询** 队列为空，事件循环将检查 **\_已达到时间阈值的计时器\_**。如果一个或多个计时器已准备就绪，则事件循环将**绕回计时器阶段**以执行这些计时器的回调。

如果在一个I/O循环中使用`setTimeout`和`setImmediate`，`setImmediate `总是被优先调用：

```js
// timeout_vs_immediate.js
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});
```

而主模块内的执行调用顺序是不确定的。

## process.nextTick

 `process.nextTick()` 从技术上讲不是事件循环的一部分。

相反，它都将在当前操作完成后处理 `nextTickQueue`， 而不管事件循环的当前阶段如何。

这里所谓的 **操作** 被定义为来自底层 C/C++ 处理器的转换，和需要处理的 JavaScript 代码的执行。

回顾我们的图示，**任何时候在给定的阶段中调用** `process.nextTick()`，所有传递到 `process.nextTick()` 的回调将在事件**循环继续之前**解析。这可能会造成一些糟糕的情况，因为**它允许您通过递归 `process.nextTick()`调用来“饿死”您的 I/O**，阻止事件循环到达 **轮询** 阶段。

## 参考资料

- [使用 Node.js 多线程进行并行处理 - 掘金 (juejin.cn)](https://juejin.cn/post/7075256441019465742)
- [nodejs如何解决高并发？ - 浅笑· - 博客园 (cnblogs.com)](https://www.cnblogs.com/qianxiaox/p/13847495.html#:~:text=Node可以在不新增额外线程的情况下，依然可以对任务进行并发处理 —— Node.js是单线程的。,它通过事件循环（event loop）来实现并发操作，对此，我们应该要充分利用这一点 —— 尽可能的避免阻塞操作，取而代之，多使用非阻塞操作。)
- [Node.js 事件循环，定时器和 process.nextTick() | Node.js (nodejs.org)](https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/#:~:text=事件循环是 Node.js 处理非阻塞 I%2FO 操作的机制——尽管 JavaScript,是单线程处理的——当有可能的时候，它们会把操作转移到系统内核中去。 既然目前大多数内核都是多线程的，它们可在后台处理多种操作。 当其中的一个操作完成的时候，内核通知 Node.js 将适合的回调函数添加到 轮询 队列中等待时机执行。)
- [nodejs源码解析之事件循环 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/101009546)
- [理解libuv的基本原理 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/139127919)