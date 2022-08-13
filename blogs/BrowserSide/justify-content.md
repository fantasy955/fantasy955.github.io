justify-content 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式。

**提示：**使用 align-content 属性对齐交叉轴上的各项（垂直）。

| 默认值：          | flex-start                                                   |
| :---------------- | ------------------------------------------------------------ |
| 继承：            | 否                                                           |
| 可动画化：        | 否。请参阅 [*可动画化（animatable）*](https://www.runoob.com/cssref/css-animatable.html)。 |
| 版本：            | CSS3                                                         |
| JavaScript 语法： | *object*.style.justifyContent="space-between"                |

```css
/* 对齐方式 */
justify-content: center;     /* 居中排列 */
justify-content: start;      /* 从行首开始排列 */
justify-content: end;        /* 从行尾开始排列 */
justify-content: flex-start; /* 从行首起始位置开始排列 */
justify-content: flex-end;   /* 从行尾位置开始排列 */
justify-content: left;       /* 一个挨一个在对齐容器得左边缘 */
justify-content: right;      /* 元素以容器右边缘为基准，一个挨着一个对齐, */

/* 基线对齐 */
justify-content: baseline;
justify-content: first baseline;
justify-content: last baseline;

/* 分配弹性元素方式 */
justify-content: space-between;  /* 均匀排列每个元素
                                   首个元素放置于起点，末尾元素放置于终点 */
justify-content: space-around;  /* 均匀排列每个元素
                                   每个元素周围分配相同的空间 */
justify-content: space-evenly;  /* 均匀排列每个元素
                                   每个元素之间的间隔相等 */
justify-content: stretch;       /* 均匀排列每个元素
                                   'auto'-sized 的元素会被拉伸以适应容器的大小 */

/* 溢出对齐方式 */
justify-content: safe center;
justify-content: unsafe center;

/* 全局值 */
justify-content: inherit;
justify-content: initial;
justify-content: unset;
```

[CSS justify-content 属性 | 菜鸟教程 (runoob.com)](https://www.runoob.com/cssref/css3-pr-justify-content.html)