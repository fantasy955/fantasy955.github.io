## 收集过程描述

在 Vue3 中，依赖收集是通过使用一个新的响应式 API `Proxy` 来实现的，其中包括 `reactive`，`ref`，`computed` 和 `watch` 等 API。

当我们使用 `reactive` 或 `ref` 创建响应式数据时，会使用 `Proxy` 将其包装起来，并在该对象的属性被读取或修改时，自动跟踪数据的依赖关系。

具体而言，在读取属性时，`get` 拦截器会收集当前的依赖关系，并将其存储在一个全局的依赖列表中，同时返回属性的值。在修改属性时，`set` 拦截器会通知所有相关的依赖项进行更新，从而触发视图的重新渲染。

例如，当我们在 `template` 中使用了响应式数据时，Vue 会在编译时将其转换为对应的 `render` 函数，并在该函数内部通过 `get` 拦截器来收集依赖项，从而在数据发生变化时能够自动更新视图。

简化的代码：

```js
function reactive(data) {
  return new Proxy(data, {
    get(target, key, receiver) {
      track(target, key);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) { 
      const oldValue = target[key];
      const result = Reflect.set(target, key, value, receiver);
      if (oldValue !== value) {
        trigger(target, key);
      }
      return result;
    },
  });
}

let activeEffect = null;
function effect(fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}

const targetMap = new WeakMap();
function track(target, key) {
  if (!activeEffect) return;
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }
  dep.add(activeEffect);
}

function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const dep = depsMap.get(key);
  if (!dep) return;
  dep.forEach(effect => effect());
}

const user = reactive({
  name: 'Tom',
  age: 18,
});

effect(() => {
  console.log(`${user.name}, ${user.age}`);
});

user.name = 'Jerry'; // 输出 Jerry, 18
user.age = 20; // 输出 Jerry, 20

```

对于任意一个函数`fn`，我们在`effect`函数内执行`fn`，执行前将`activeEffect`对象设置为`fn`，

对于响应性对象，我们需要通过它的`get`方法获取它的值，在`get`方法中，判断当前的`activeEffect`对象是否为空，不为空的话就将`activeEffect`添加到依赖性中，如果触发当前属性的`set`方法并且新的值跟旧的值不一样，就执行`activeEffect`。
