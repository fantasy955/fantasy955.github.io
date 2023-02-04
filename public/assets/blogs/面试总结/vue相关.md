## 关于`$nextTick`

[事件循环](https://weijl.top/#/blog/前端/事件循环与nextTick.md/.%2Fassets%2Fblogs%2FBrowserSide%2F事件循环与nextTick.md)

[面试官：Vue中的$nextTick有什么作用？ | web前端面试 - 面试官系列 (vue3js.cn)](https://vue3js.cn/interview/vue/nexttick.html#三、实现原理)

https://vue3js.cn/interview/vue

[你真的理解$nextTick么 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903843197616136)

[神奇的nextTick一定能获取到最新的dom么？ - 掘金 (juejin.cn)](https://juejin.cn/post/7166517557124415518)

### 返回值

[下列关于Vue的描述错误的是（ ）__牛客网 (nowcoder.com)](https://www.nowcoder.com/questionTerminal/070dbd360a1c4fc9826363f698f03b52)

### 事件循环与更新

GUI渲染引擎

JS引擎 -> 事件循环

[(137条消息) 微任务，宏任务，DOM渲染的执行顺序_yolanda__xiaoxiao的博客-CSDN博客_异步宏任务在dom渲染后出发么](https://blog.csdn.net/weixin_44138611/article/details/112464382)

![在这里插入图片描述](assets/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDEzODYxMQ==,size_16,color_FFFFFF,t_70#pic_center.jpeg)

##### 宏任务和微任务的执行顺序

在Call Stack中不仅会形成宏任务队列，还会形成微任务队列，在每一次Call Stack清空后都需要将微任务队列清空（全部执行）。

**执行顺序**

Call Stack清空
执行当前的微任务
尝试DOM渲染
触发Event Loop
**微任务和宏任务的区别**
宏任务：DOM渲染后触发，由浏览器规定（Web APIs）
微任务：DOM渲染前执行，微任务是ES6语法规定
**event loop和Dom渲染**
每次Call Stack清空(即每次轮询结束)，即同步任务执行完
都是Dom重写渲染的机会，Dom结构如有改变则重新渲染
然后再去触发下一次Event Loop

`nextTick`的官方定义：

> 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM

- 状态更新是一个微任务；

- nextTick也是微任务；

- 先写状态更新，再写nextTick回调；

- 状态更新会先创建一个微任务，并且代码块中的所有状态变化会集中到这个微任务进行，**状态改变触发了DOM更新**，创建了一个宏任务。

- 界面更新宏任务结束后，立即调用nextTick微任务。

![img](assets/16ab1b0523456e8atplv-t2oaga2asx-zoom-in-crop-mark4536000.webp)

并不用等待GUI更新，而是DOM元素内容更新后，就可以拿到更改的数据。