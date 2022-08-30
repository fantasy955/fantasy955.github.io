我们已经了解到组件能够接收任意类型的 JavaScript 值作为 props，但组件要如何**接收模板内容呢**？在某些场景中，我们可能想要为子组件传递一些模板片段，让子组件在它们的组件中渲染这些片段。

# 插槽

子组件的插槽内可以定义默认内容，当父组件没有声明插槽内容时，显示默认内容。

子组件 `SubmitButton`

```javascript
<button type="submit">
  <slot>
    Submit <!-- 默认内容 -->
  </slot>
</button>
```

父组件

```
<SubmitButton>Save</SubmitButton>
```

# 具名插槽

子组件`BaseLayout`

```
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

父组件

```javascript
<BaseLayout>
  // #header 等价于  v-slot:header
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <template #default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>
```

默认插槽可以不用`template`包裹，所有位于顶级的非 `<template>` 节点都被隐式地视为默认插槽的内容。所以上面也可以写成：

```javascript
<BaseLayout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <!-- 隐式的默认插槽 -->
  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>
```

# 作用域插槽

以上的插槽都是父组件向子组件传递，但是如果父组件要用到子组件的数据，子组件需要向夫组件传值；

我们只需要在子组件的slot中声明属性，就可以将属性对应的值传给父组件

子组件

```javascript
<!-- <MyComponent> 的模板 -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>
```

传递了text、count；

父组件

```javascript
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
```

slotProps是`MyComponent`子组件传递的参数。