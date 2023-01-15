# 类型体操

[类型挑战](./TS类型挑战.md)

# 签名重载

[深入typescript类型系统：重载与子类型 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/82056426#:~:text= js因为是动态类型，本身不需要支持重载，直接对参数进行类型判断即可，但是ts为了保证类型安全，支持了函数签名的类型重载，即多个overload signatures和一个implementation,signatures 因为implementation signatures对外是不可见的，当我们实现重载时，通常需要定义两个以上的overload signatures)

TS提供**签名重载**功能。

- 签名类型不会合并

  ```
  function len(s: string): number;
  function len(arr: any[]): number;
  ```

  并不能接收类型为`string|any[]`的参数。

# 枚举类型

[Typescript里enum枚举类型动态取值 - 简书 (jianshu.com)](https://www.jianshu.com/p/cd5dee829cb1)

[ts 枚举(enum) 中的类型操作技巧 - 掘金 (juejin.cn)](https://juejin.cn/post/7073738558124589063)

一个比较复杂的案例，获取数字的值类型：

```ts
enum ThreeDigits {
  ZERO = 0,
  ONE = 1,
  TWO = 2,
}

type ThreeDigitsType = `${ThreeDigits}` extends `${infer T extends number}`
  ? T
  : never;

```

`${infer T extends number}`即一个`T:number`构成的数字字符串，`${ThreeDigits}`表示枚举中的值，由于枚举中的值都是数字`number`，则返回了T。

