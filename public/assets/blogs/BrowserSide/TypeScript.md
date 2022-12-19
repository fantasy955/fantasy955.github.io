# 类型声明

```typescript
// 使用字面量进行类型声明
let a: 10
let b: 'male' | 'female' //限制值为'a'或'b'

// 联合类型
let c: boolean | string

// 任意类型any, 关闭类型检测
lat d: any // 隐式 let d, 尽量避免any或隐式
d = 'hello'
d = true

// unknown类型 自身可以随便赋值，但不能赋值给其他变量
// 类型安全的any，不能直接赋值给其他变量
let s: unknown
s = 'hello'
// 进行类型判断后可以赋值
if (typeof s === 'string'){
  let d: string
  d = s
}
// 类型断言
// 告诉编译器s 为string类型
let d: string = s as string 
let d: string = <string>s

// void, never 主要用于定义函数返回值
// void可以是null、undefined
// never表示不会返回结果（例如用于报错的函数）
function fn(): void{
  
}
function fn(): never{
  throw new Error("msg")
}

// 对象
// 一切都是对象，不实用
let o: object
o = {}
a = function(){}

// 指定对象中包含的属性及类型
// 赋值时，必须包含这些属性
// 加问号，表示属性是可选的
let o: {
  name: string,
  age: number,
  sex: 'male' | 'female',
  data?: any,
  [propName: string]: any // 支持追加属性， 任意字符串类型的属性名 
}

// 函数结构 类型声明
// d有两个参数，返回值是number类型
let d: (a: number, b: string) => number
d = function(a, b){
  return a+b;
}

// 数组
// 数组内的值的类型
let q: number[] // number数组
q = [1, 2, 3]
let g: Array<number>
g = [1, 2, 3]

// 元组，元组就是固定长度的数组
```

