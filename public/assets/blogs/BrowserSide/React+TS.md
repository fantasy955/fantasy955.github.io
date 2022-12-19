[(92条消息) React + TypeScript 实践_HURRICANE_FAST的博客-CSDN博客_接口只能扩展使用静态已知成员的对象类型或对象类型的交集](https://blog.csdn.net/qq_34703156/article/details/116666956)

# Hooks

## useRef<T>

当初始值为 **null** 时，有两种创建方式:

```
const ref1 = React.useRef<HTMLInputElement>(null)
const ref2 = React.useRef<HTMLInputElement | null>(null)
```

- 第一种方式的 ref1.current 是**只读的（read-only）**，并且可以传递给内置的 ref 属性，绑定 DOM 元素 **；**
- 第二种方式的 ref2.current 是**可变的**（类似于声明类的成员变量）

这两种方式在使用时，都需要对类型进行检查:

```
const ref = React.useRef(0)
React.useEffect(() => {
  ref.current += 1
}, [])
```

在某种情况下，可以省去类型检查，通过添加 **!** **断言**，**不推荐**：

```
// Bad
function MyComponent() {
  const ref1 = React.useRef<HTMLDivElement>(null!)
  React.useEffect(() => {
    //  不需要做类型检查，需要人为保证ref1.current.focus一定存在
    doSomethingWith(ref1.current.focus())
  })
  return <div ref={ref1}> etc </div>
}
```

