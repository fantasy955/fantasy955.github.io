[javascript - Typescript 声明文件中的 declare global 和 普通 declare 有什么区别 ？ - SegmentFault 思否](https://segmentfault.com/q/1010000016173914)

[TypeScript: Documentation - Declaration Merging (typescriptlang.org)](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)

> 在 d.ts 声明文件中，任何的 declare 默认就是 global 的了，所以你在 d.ts 文件中是不能出现 `declare global` 的。只有在模块文件中的定义，如果想要全局就使用 `declare global`



## type和interface

[TS 中 type 和 interface 的区别 - Frank-Link - 博客园 (cnblogs.com)](https://www.cnblogs.com/frank-link/p/14781056.html)

### interface 接口

> 接口主要用于类型检查，它只是一个结构契约，定义了具有相似的名称和类型的对象结构。除此之外，接口还可以定义方法和事件。

### type (alias)类型别名

> 不同于 interface 只能定义对象类型，type 声明还可以定义基础类型、联合类型或交叉类型。

## 差异点

### 1. 定义类型的范围

> interface 只能定义对象类型, 而 type 声明可以声明任何类型，包括基础类型、联合类型或交叉类型。

- 基本类型

```ts
type Person = string;
```

- 联合类型

```ts
interface Dog {
  name: string;
}
interface Cat {
  age: number;
}
type animal = Dog | Cat;
```

- 元组

```ts
interface Dog {
  name: string;
}
interface Cat {
  age: number;
}
type animal = [Dog, Cat];
```

### 2. 扩展性

> 接口可以 extends、implements,从而扩展多个接口或类。类型没有扩展功能，只能交叉合并。

- interface extends interface

```ts
interface Person {
  name: string;
}
interface User extends Person {
  age: number;
}
```

- interface extends type

```ts
type Person = { name: string };
interface User extends Person {
  age: number;
}
```

#### **type 使用交叉类型&来合并不同成员的类型**

- type & type

```ts
type Person = { name: string };
type User = Person & { age: number };
```

- type & interface

```ts
interface Person {
  name: string;
}
type User = { age: number } & Person;
```

### 3. 合并声明

> 定义两个相同名称的接口会合并声明，定义两个同名的 type 会出现异常。

```ts
interface Person {
  name: string;
}
interface Person {
  age: number;
}
// 合并为:interface Person { name: string age: number}

type User = {
  name: string;
};
type User = {
  age: number;
};
// 声明重复报错：标识符“User”重复。
```

### 4. type 可以获取 typeof 返回的值作为类型

```ts
let div = document.createElement("div");
type B = typeof div; // HTMLDivElement
```

## 声明为对象的key

```
type UserInfoKey = keyof UserInfo
```

