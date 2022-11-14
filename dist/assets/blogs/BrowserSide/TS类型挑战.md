# 关键字

[(96条消息) [TypeScript\] 关键字（一）_灯火缱绻的博客-CSDN博客_typescript 关键字](https://blog.csdn.net/a15387091481/article/details/125315869)

[(96条消息) TypeScript 常用类型_前端路啊的博客-CSDN博客_typescript 类型](https://blog.csdn.net/m0_62118859/article/details/124508671)

## extends

###  继承

```
  interface T1 {
    name: string
  }
  
  interface T2 {
    age: number
  }
  
  // 多重继承，逗号隔开
  interface T3 extends T1,T2 {
    gender: string
  }
 // T3 => { name: string; age: number, gender: string }
  
  const t3: T3 = {
    name: '111',
    gender: '1',
    age: 1
  }

```

### 条件判断

```ts
type Animal = {
    name: string;
  }
  type Dog = {
    name: string;
    action: string;
  }
  type Bool = Animal extends Dog ? 'yes' : 'no'; //  'no'
  type Bool = Dog extends Animal ? 'yes' : 'no'; //  'yes'
  
  type TypeRes=Type1 extends Type2? Type3: Type4;
  //这里表达的意思就是如果类型Type1可被分配给类型Type2,则类型TypeRes取Type3，否则取Type4。那怎么理解类型Type1可被分配给类型Type2呢？？
//我们可以这样理解：类型为Type1的值可被赋值给类型为Type2的变量。可以具体分为一下几种情况：

//Type1和Type2为同一种类型。
//Type1是Type2的子类型。
//Type2类型兼容类型Type1。 接下来我们分情况进行验证。
```

### 泛型条件判断

```
  type A1 = 'x' extends 'x' ? string : number; // string
  type A2 = 'x' | 'y' extends 'x' ? string : number; // number
  
  type P<T> = T extends 'x' ? string : number;
  type A3 = P<'x' | 'y'> // string | number

```

### 泛型约束

```tsx
interface Person {
  name: string;
  age: number;
  gender: string;
}

class Student {
  constructor(private info: Person) {}

  getInfo<T extends keyof Person>(key: T): Person[T] {
    return this.info[key];
  }
}

const student = new Student({
  name: 'uuuu',
  age: 20,
  gender: 'male'
})
const test = student.getInfo('name');
console.log(test) // "uuuu"

```

## infer

[TS进阶之infer - 简书 (jianshu.com)](https://www.jianshu.com/p/707a304d7752)

条件类型extends的基本语法是

```
 T extends U ? X : Y;
```

如果占位符类型`U`是一个可以被**分解成几个部分的类型**，譬如数组类型，元组类型，函数类型，字符串字面量类型等。这时	候可以通过`infer`来获取`U`类型中某个部分的类型。

`infer`语法的限制如下：

1. `infer`只能在条件类型的 extends 子句中使用
2. `infer`得到的类型只能在`true`语句中使用, 即`X`中使用

### 推断数组(或者元组)的类型

#### 使用方法

```rust
type InferArray<T> = T extends (infer U)[] ? U : never;
```

`(infer U)`和平时常写的`string[]`，`number[]`等等是不是很像？这里就是通过`(infer U)`来获取数组对应的类型。（**把原本需要写具体类型的地方写成infer U**）

### 推断对象的模板类型

```
type MyAwaited<T> = T extends Promise<infer P> ? (P extends Promise<any> ? MyAwaited<P> : P) : never

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type Z1 = Promise<Promise<Promise<string | boolean>>>

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
]
```

## K extends  keyof T = keyof T

当条件`K extends  keyof T`不满足时，自动赋值`key of T`

```
type MyReadonly2<T, K extends keyof T = keyof T>
// 这里希望K是T中的键，即'title'|'completed'
interface Todo1 {
  title: string
  description?: string
  completed: boolean
}
type a = MyReadonly2<Todo1>
```

## as类型断言

```
type MyOmit<T, U extends keyof T> = {
  [P in keyof T as P extends U ? never : P]: T[P]
}
```



## 修饰符

[(96条消息) Typescript类的修饰符_龙易安的博客-CSDN博客_typescript修饰符](https://blog.csdn.net/longtengg1/article/details/122065359)

public，private，protected，readonly

## 元组和数组

数组内的元素类型是一致的

```ts
type MyArray<T> = <T>[]
type MyTuple = (string|number)[]

const a: MyTuple = [123, '123', '']
```



# Easy挑战

## Pick

```tsx
/* _____________ 你的代码 _____________ */


type MyPick<T, K extends keyof T> = {
  [Key in K]: T[Key]
}


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>,
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}
```

## 实现Readonly

```
type MyReadonly<T> = {
  readonly [key in keyof T]: T[key]
}
```

## 元组转对象

https://tsch.js.org/11/zh-CN

```ts
type TupleToObject<T extends readonly (string | number | symbol)[]> = {
  [key in T[number]]: key;
}

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
const tupleNumber = [1, 2, 3, 4] as const
const tupleMix = [1, '2', 3, '4'] as const

type cases = [
  Expect<Equal<TupleToObject<typeof tuple>, { tesla: 'tesla'; 'model 3': 'model 3'; 'model X': 'model X'; 'model Y': 'model Y' }>>,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<Equal<TupleToObject<typeof tupleMix>, { 1: 1; '2': '2'; 3: 3; '4': '4' }>>,
]

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>
```

> 这边的 T 是一个 any 类型的数据, 所以这边的 T[number] 应该是代表 取数组的中值 作为 key, number 是数组下标

## 数组第一个元素

```
type First<T extends any[]> = T extends [] ? never : T[0]

type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type head1 = First<arr1> // expected to be 'a'
type head2 = First<arr2> // expected to be 3
```

## :zap:获取元组长度

```ts
type Length<T extends readonly any[]> = T['length'];
```

```
const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const
const spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT'] as const

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  // @ts-expect-error
  Length<5>,
  // @ts-expect-error
  Length<'hello world'>,
]
```

## :zap:Exclude

```ts
实现内置的Exclude <T, U>类型，但不能直接使用它本身。

从联合类型T中排除U的类型成员，来构造一个新的类型。

例如：

type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
```

```
type MyExclude<T, U> = T extends U ? never : T;
```

T是U的子类型的话，则为never，否则为T。

T已经转换成一个迭代元素了吗？

T的类型是'a'或'b'或'c'，

## IF

```
type A = If<true, 'a', 'b'>  // expected to be 'a'
type B = If<false, 'a', 'b'> // expected to be 'b'
```

```
type If<C, T, F> = any
```

如果C为真，返回T类型；如果C为假，返回F类型。

```
// ans1
type If<C extends boolean, T, F> = C extends false ? F : T
// ans2
type If<C, T, F> = C extends true ? T : C extends false ? F : error
```

## 数组合并

https://github.com/type-challenges/type-challenges/blob/main/questions/00533-easy-concat/README.zh-CN.md

```
type Concat<T extends any[], U extends any[]> = [...T, ...U]

type cases = [
  Expect<Equal<Concat<[], []>, []>>,
  Expect<Equal<Concat<[], [1]>, [1]>>,
  Expect<Equal<Concat<[1, 2], [3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Concat<['1', 2, '3'], [false, boolean, '4']>, ['1', 2, '3', false, boolean, '4']>>,
]
```

## :zap:数组Includes

https://github.com/type-challenges/type-challenges/blob/main/questions/00533-easy-concat/README.zh-CN.md

```
type Includes<T extends readonly any[], U> = T extends [
  infer First,
  ...infer Rest
]
  ? Equal<First, U> extends true
    ? true
    : Includes<Rest, U>
  : false;
```

难点在于遇到一个满足条件的就需要返回。

```
type Includes<T extends readonly any[], U> = T extends [...infer p] ? p extends U ? true : false : never
```

这样的话会一直返回false。

## 数组push

```

type Push<T, U> = T extends [...infer p] ? [...p, U] : [U]


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1, 2], '3'>, [1, 2, '3']>>,
  Expect<Equal<Push<['1', 2, '3'], boolean>, ['1', 2, '3', boolean]>>,
]
```

## 数组Unshift

```
type Unshift<T, U> = T extends[...infer rest] ? [U, ...rest] : [U] 


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Unshift<[], 1>, [1]>>,
  Expect<Equal<Unshift<[1, 2], 0>, [0, 1, 2]>>,
  Expect<Equal<Unshift<['1', 2, '3'], boolean>, [boolean, '1', 2, '3']>>,
]
```

## :zap: 获取函数类型的Parameters

```
type MyParameters<T extends (...args: any[]) => void> = T extends(...args: infer Y)=>void?Y:never
```

# Meidum挑战

## 获取函数返回类型

```
const fn = (v: boolean) => {
  if (v)
    return 1
  else
    return 2
}

type a = MyReturnType<typeof fn> // 应推导出 "1 | 2"

//  ans
type MyReturnType = T extends (...arg:any[])=> infer R ? R:never
```

## :zap:实现Omit，过滤掉对象中的某些字段

```
// ans1
type MyOmit<T, U extends keyof T> = {
  [P in keyof T as P extends U ? never : P]: T[P]
}
// ans2
type MyExclude<T,U> = T extends U ? never : T
type MyOmit1<T, U extends keyof T> = {
  [P in MyExclude<keyof T,U>]: T[P]
}
```

## :zap:部分元素readonly

https://github.com/type-challenges/type-challenges/blob/main/questions/00008-medium-readonly-2/README.zh-CN.md

```tsx
type MyReadonly2<T, K> = any
//困难1：K可以不传
//困难2：K extends keyof T
//困难3：合并readonly和普通字段

// =的意思是K extends keyof T不成立时，赋值默认值 keyof T给第二个泛型参数，使得第一个校验通过。


/* _____________ 测试用例 _____________ */
import type { Alike, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
]

// @ts-expect-error
type error = MyReadonly2<Todo1, 'title' | 'invalid'>

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}
```

答案

```
// 1
type MyReadonly2<T, K extends keyof T = keyof T> =  { +readonly [P in K]:T[P] } & { -readonly [Q in Exclude<keyof T,K> ]:T[Q] }
// 2
// 对对象用in keyof Obj
// 对类型用in Type
type Diff<A, B> = A extends B ? never : A
type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [P in K] : T[P]
} & {
  [P in Diff<keyof T,K>]: T[P]
}
```

## :zap:深度readonly

实现一个通用的`DeepReadonly<T>`，它将对象的每个参数及其子对象递归地设为只读。

您可以假设在此挑战中我们仅处理对象。数组，函数，类等都无需考虑。但是，您仍然可以通过覆盖尽可能多的不同案例来挑战自己。

例如

```
type X = { 
  x: { 
    a: 1
    b: 'hi'
  }
  y: 'hey'
}

type Expected = { 
  readonly x: { 
    readonly a: 1
    readonly b: 'hi'
  }
  readonly y: 'hey' 
}

type Todo = DeepReadonly<X> // should be same as `Expected`
```

- 判断是否是对象类型，是的话递归

```
type DeepReadonly<T> = {
  readonly [K in keyof T]: keyof T[K] extends never ? T[K] : DeepReadonly<T[K]
}
```

