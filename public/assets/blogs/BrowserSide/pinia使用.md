## Option Stores（选项式）

与Vue的Options API类似，我们也可以传递带有状态、操作和getter属性的Options对象。

```
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0, name: 'Eduardo' }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```

## Setup Stores（组合式

还有另一种可能的定义存储的语法。与Vue Composition API的setup函数类似，我们可以传入一个定义响应性属性和方法的函数，并返回一个带有我们想要公开的属性和方法的对象。

```
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const name = ref('Eduardo')
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, name, doubleCount, increment }
})
```

