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

# 类型声明

## interface 和 type的区别

[【区分】Typescript 中 interface 和 type - ESnail - 博客园 (cnblogs.com)](https://www.cnblogs.com/EnSnail/p/11233592.html#:~:text=interface 和 type 很像，很多场景，两者都能使用。 但也有细微的差别： 类型：对象、函数两者都适用，但是 type,可以用于基础类型、联合类型、元祖。 同名合并：interface 支持，type 不支持。 计算属性：type 支持%2C interface 不支持。)

interface 和 type 很像，很多场景，两者都能使用。 但也有细微的差别： **类型：对象、函数两者都适用，但是 type 可以用于基础类型、联合类型、元祖**。 

- 同名合并：**interface 支持**，type 不支持。 

  ```ts
  // 与类型别名不同，接口可以定义多次，并将被视为单个接口(合并所有声明的成员)。
  // These two declarations become:
  // interface Point { x: number; y: number; }
  interface Point { x: number; }
  interface Point { y: number; }
  
  const point: Point = { x: 1, y: 2 };
  ```

- 计算属性：**type 支持**, interface 不支持。type 能使用 in 关键字生成映射类型，但 interface 不行。

  语法与索引签名的语法类型，内部使用了 for .. in。 具有三个部分：

  - 类型变量 K，它会依次绑定到每个属性。
  - 字符串字面量联合的 Keys，它包含了要迭代的属性名的集合。
  - 属性的结果类型。

  ```ts
  type Keys = "firstname" | "surname"
  
  type DudeType = {
    [key in Keys]: string
  }
  
  const test: DudeType = {
    firstname: "Pawel",
    surname: "Grzybek"
  }
  
  // 报错
  //interface DudeType2 {
  //  [key in keys]: string
  //}
  ```

## 定义函数类型

[接口(interface) - TypeScript 中文手册 (bootcss.com)](https://typescript.bootcss.com/interfaces.html)

接口能够描述JavaScript中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型。

为了**使用接口表示函数类型**，我们需要给接口定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}
```

这样定义后，我们可以像使用其它接口一样使用这个函数类型的接口。 下例展示了如何创建一个函数类型的变量，并将一个同类型的函数赋值给这个变量。

```ts
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}
```

对于函数类型的类型检查来说，**函数的参数名不需要与接口里定义的名字相匹配**。 比如，我们使用下面的代码重写上面的例子：

```ts
let mySearch: SearchFunc;
mySearch = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
}
```

函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的。 如果你不想指定类型，TypeScript的类型系统会推断出参数类型，因为函数直接赋值给了`SearchFunc`类型变量。 函数的返回值类型是通过其返回值推断出来的（此例是`false`和`true`）。 如果让这个函数返回数字或字符串，类型检查器会警告我们函数的返回值类型与`SearchFunc`接口中的定义不匹配。

```ts
let mySearch: SearchFunc;
mySearch = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
}
```

# 第三方资料

- [TypeScript 中文手册 - TypeScript 中文手册 (bootcss.com)](https://typescript.bootcss.com/)
