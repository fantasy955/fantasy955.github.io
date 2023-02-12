# 正文

flex属性依次是`flex-grow`，`flex-shrink`，`flex-basis`三个属性的缩写，前两个是比例，最后一个是宽度属性允许的值。

## flex-grow

`flex-grow`属性比较简单，说明了元素如何占用剩余的宽度。

可以grow的元素按比例分配剩余宽度。

## flex-shrink

`flex-shrink`复杂的地方在于，它需要使用元素的宽度属性进行计算。

举个例子：

父元素 500px。三个子元素分别设置为 150px，200px，300px。

三个子元素的 flex-shrink 的值分别为 1，2，3。

首先，计算子元素溢出多少：150 + 200 + 300 - 500 = -150px。

那这 -150px 将由三个元素的分别收缩一定的量来弥补。

具体的计算方式为：每个元素收缩的权重为其 flex-shrink 乘以其宽度。

所以总权重为 1 * 150 + 2 * 200 + 3 * 300 = 1450

三个元素分别收缩：

- 150 * 1(flex-shrink) * 150(width) / 1450 = -15.5
- 150 * 2(flex-shrink) * 200(width) / 1450 = -41.4
- 150 * 3(flex-shrink) * 300(width) / 1450 = -93.1

公式：溢出宽度 * 收缩系数 * 宽度 / （收缩系数 * 宽度 所有可收缩元素的和）

## flex-basis

在Flex布局中， flex-basis优先级是**比width高的** （可以理解为覆盖）。 所以， flex-basis 和 width 同时设置了具体的数值，则 width 属性值直接被打入冷宫，在样式表现上完全被忽略。

# 参考资料

- [详解 flex-grow 与 flex-shrink - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/24372279)
- [flex - CSS: Cascading Style Sheets | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/CSS/flex)