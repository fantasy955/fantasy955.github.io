# 前言

In JavaScript, arrays aren't [primitives](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) but are instead `Array` objects with the following core characteristics:

- **JavaScript arrays are resizable** and **can contain a mix of different [data types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)**. (When those characteristics are undesirable, use [typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) instead.)
- **JavaScript arrays are not associative arrays** and so, [array elements cannot be accessed using arbitrary strings as indexes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#notes), but must be accessed using nonnegative integers (or their respective string form) as indexes.
- **JavaScript arrays are [zero-indexed](https://en.wikipedia.org/wiki/Zero-based_numbering)**: the first element of an array is at index `0`, the second is at index `1`, and so on — and the last element is at the value of the array's [`length`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length) property minus `1`.
- **JavaScript [array-copy operations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#copy_an_array) create [shallow copies](https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy)**. (All standard built-in copy operations with *any* JavaScript objects create shallow copies, rather than [deep copies](https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy)).

在 JavaScript 中，数组不是[基本类型](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive)，而是具有以下核心特征的 `Array` 对象：

- **JavaScript 数组是可调整大小的**，**并且可以包含不同的[数据类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)**。（当不需要这些特征时，可以使用[类型化数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Typed_arrays)）
- **JavaScript 数组不是关联数组**，因此，[不能使用任意字符串作为索引访问数组元素](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#备注)，但必须使用非负整数（或它们各自的字符串形式）作为索引访问。
- **JavaScript 数组的[索引从 0 开始](https://zh.wikipedia.org/zh-cn/從零開始的編號)**：数组的第一个元素在索引 `0` 处，第二个在索引 `1` 处，以此类推，最后一个元素是数组的 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 属性减去 `1` 的值。
- **JavaScript [数组复制操作](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#复制数组)创建[浅拷贝 (en-US)](https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy)**。（*所有* JavaScript 对象的标准内置复制操作都会创建浅拷贝，而不是[深拷贝 (en-US)](https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy)）。

## map

[`Array.prototype.map()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

返回一个**新数组**，其中包含对调用数组中的每个元素调用函数的结果。

[1773. 统计匹配检索规则的物品数量 - 力扣（LeetCode）](https://leetcode.cn/problems/count-items-matching-a-rule/submissions/)

```ts
function countMatches(items: string[][], ruleKey: string, ruleValue: string): number {
    return items.map((item)=>{
        if (ruleKey === 'type'){
            return item[0];
        }else if (ruleKey === 'color'){
            return item[1];
        }else {
            return item[2];
        }
    }).filter((item) => item === ruleValue).length
};
```

## sort

[Array.prototype.sort() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

**自定义比较函数返回值**

| `compareFn(a, b)` return value | sort order                         |
| :----------------------------- | :--------------------------------- |
| > 0                            | sort `a` after `b`                 |
| < 0                            | sort `a` before `b`                |
| === 0                          | keep original order of `a` and `b` |

从小到大排序，前面的比后面的小，返回-1。（return a-b）
