事件总线是为了接近Vue中组件通信的问题。



> [vue篇之事件总线（EventBus） - 掘金 (juejin.cn)](https://juejin.cn/post/6844903686926254087)
>
>  在Vue中可以使用 `EventBus` 来作为沟通桥梁的概念，就像是所有组件共用相同的事件中心，可以向该中心注册发送事件或接收事件，所以组件都可以上下平行地通知其他组件，但也就是太方便所以若使用不慎，就会造成难以维护的灾难，因此才需要更完善的Vuex作为状态管理中心，将通知的概念上升到共享状态层次。

# 简单的方式

在Vue原型上添加事件总线属性。

```js
new Vue({
  beforeCreate() {
    // 尽量早地执行挂载全局事件总线对象的操作
    Vue.prototype.$bus = this;
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app');
```

在原型上绑定一个Vue实例（组件），在这个Vue实例上添加事件（给组件添加绑定事件）。

```
// 绑定事件
this.$bus.$on('send', ()=>{ // 使用事件 });

// 分发事件
this.$bus.$emit('send', 'emit');
```

# 复杂一点的方式，进行封装

[Vue eventBus 事件总线封装下再用才香 - 掘金 (juejin.cn)](https://juejin.cn/post/7112066925617741838)

上面这篇博客中的复杂方式，本质上是定义了一个插件，使用默认导出，导出了安装函数。

由于导出命名和导入命名不一致，看起来很难受。

```
// ... define the VueBus
// 默认导出函数
export default VueBus;
```

`main.js`导入插件	

```
import EventBus from '@/libs/bus';
Vue.use(EventBus);
```

**注意**：`bus`本质上就是一个Vue组件实例。

