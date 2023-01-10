[World Wide Web Consortium (W3C)](https://www.w3.org/)

[Selectors (w3.org)](https://www.w3.org/TR/CSS2/selector.html)

[Selectors Level 4 (w3.org)](https://www.w3.org/TR/selectors/)

# 基本选择器

- 通配符选择器
- 元素选择器
- 类选择器
- ID选择器
- 后代选择器（注意与 `>` 的区别，可以匹配到孙子）

# 基本选择器扩展

- 子元素选择器（直接后代选择器）
- 相邻兄弟选择器

只会匹配到紧跟着的兄弟元素

```
#wrap #first + .inner
```

- 通用兄弟选择器

```
#wrap #first ~ .inner
```

- 选择器分钟

`,`称为**结合符**。

```
h1,h2,h3 {}
```

# 属性选择器、存在选择器

```
<a attr>test</a>

[attr]: 选择包含attr属性的所有元素
[attr=val]: 仅选择attr值为val的元素
[attr~=val]: 选择以attr命令的属性元素，并且该属性是一个以空格作为分割的值列表

```

