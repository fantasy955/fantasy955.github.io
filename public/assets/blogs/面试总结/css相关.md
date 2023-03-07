## 对盒子模型的理解

当对文档进行布局时（layout），浏览器的渲染引擎会根据css的基础框盒模型，将所有元素表示为一个个矩形盒子。

---

## 可继承属性

所有元素可继承：visibility和cursor。

内联元素可继承：letter-spacing、word-spacing、white-space、line-height、color、font、font-family、font-size、font-style、font-variant、font-weight、text-decoration、text-transform、direction。 

块状元素可继承：text-indent和text-align。 

列表元素可继承：list-style、list-style-type、list-style-position、list-style-image。

（大部分是跟文字相关的）

![image-20230214111217763](assets/image-20230214111217763.png)

## a标签伪类设置

a :link、a:hover、a:visited、a:active中，定义CSS时候的顺序不同，也会直接导致链接显示的效果不同。为了保证每个效果都能正确的触发，定义时的顺序应该为：link、visited、hover、active.

> 对于有冲突的CSS，浏览器是按照：**位置，优先级，顺序 (后>前)** 来处理的
>
> 因此，考虑到`hover鼠标悬停`状态时也会有`link`或`visited`状态，所以`hover`得写在这两个后面，使得在鼠标悬停状态优先选择hover的样式。
>
> 同理，又考虑到`active点下去`时，同时也有`hover`状态，故`active`得写在`hover`后 
>
> 因此就是 **lvha** 或 **vlha** 的顺序

## table属性

### cellpadding和cellspacing

![img](assets/6150436_1469437565689_9AB217826D523CFA52B15130EFC68A40.png)![img](assets/6150436_1469437584131_4CF2CABF79BAAD901F68C39E7397B719.png)

> cellpadding 属性规定**单元边沿**与**其内容之间**的空白。 
> **注释：**请勿将该属性与 [cellspacing   属性](http://www.w3school.com.cn/tags/att_table_cellspacing.asp)相混淆，cellspacing 属性规定的是单元之间的空间。 

>  从实用角度出发，最好不要规定 cellpadding，而是使用 CSS 来添加[内边距](https://hd.nowcoder.com/link.html?target=http://www.w3school.com.cn/css/css_padding.asp)。

> cellpadding--内容和单元格的距离， cellspacing--单元格之间的距离。最好设置为零！

---

## opacity和visibility的区别

`visibility`和`opacity`都是用于控制元素的可见性，但它们有一些重要的区别。

`visibility`属性用于控制元素是否可见，可以设置为`visible`（可见）或`hidden`（隐藏）。如果将元素的`visibility`属性设置为`hidden`，该元素将不可见，但它仍然占用页面布局空间，即它的尺寸和位置不会改变。此外，**被隐藏的元素仍然可以被JavaScript访问和操作**。

示例代码：

```html
<div style="visibility: hidden">我被隐藏了</div>
```

在上面的代码中，将`<div>`元素的`visibility`属性设置为`hidden`，该元素将不可见，但**仍然占用**布局空间。

`opacity`属性用于控制元素的不透明度，可以设置为0到1之间的数值。如果将元素的`opacity`属性设置为0，则该元素将完全透明，即不可见；如果将其设置为1，则该元素将完全不透明，即完全可见。不同于`visibility`属性，如果将元素的`opacity`属性设置为0，该元素将不仅不可见，同时不再占用布局空间，即它的尺寸和位置都将被视为0。

示例代码：

```html
<div style="opacity: 0">我被隐藏了</div>
```

在上面的代码中，将`<div>`元素的`opacity`属性设置为0，该元素将不可见，并且**不再占用**布局空间。

总之，`visibility`和`opacity`都可以控制元素的可见性，但它们的具体效果和行为略有不同，开发者需要根据具体情况选择适当的属性。

---

## flex布局

- align-content属性

  将content视为flex布局中每一行的内容，`justify-content`指导每一行元素在行中沿主轴方向如何排列，items视为行中的每一个元素，`align-items`指导元素在该行如何排列，`align-content`的目标是content，它指导`content`在交叉轴如何排列。

  justify: 对齐

  主轴上的东西叫content。

  ![image-20230227211123876](assets/image-20230227211123876.png)

## 水平垂直居中方式

| 方式                             | 条件                                                         |
| -------------------------------- | ------------------------------------------------------------ |
| absolute + 负margin              | 知道父元素宽高                                               |
| absolute + inset 0 + margin auto | 指定子元素宽高                                               |
| absolute + calc                  | 知道自身宽高                                                 |
| absolute + transform             | 无                                                           |
| lineheight + text-align          | 子元素display  为inline-block<br />父元素高度确定            |
| table                            | 子元素display  为inline-block<br />子元素的父元素类型为table-cell或为td元素 |
| css-table                        | 同上                                                         |
| flex align-items justify-content | 无                                                           |
| grid align-seft justify-self     | 无                                                           |
| writing-mode                     |                                                              |

---

## PC端暗黑模式

PC端的暗黑模式是指当用户在使用电脑时，**可以通过设置或系统自动识别来改变页面的颜色主题**，使页面背景变为黑色或暗色系，以达到降低光照对用户眼睛的刺激，减少视觉疲劳的目的。

实现PC端暗黑模式的主要技术手段有以下几种：

1. CSS变量：通过使用CSS变量来实现不同的颜色主题，根据用户的选择或系统自动识别来动态地修改CSS变量的值，以改变页面的颜色主题。
2. 媒体查询：通过使用媒体查询来判断当前设备是否支持暗黑模式，并在相应的情况下加载不同的样式表或修改相应的CSS样式，以实现暗黑模式和常规模式的切换。
3. JavaScript：通过使用JavaScript来监听用户的选择或系统的设置，根据相应的状态来修改相应的CSS样式或加载不同的样式表，以实现暗黑模式和常规模式的切换。

需要注意的是，在实现PC端暗黑模式时，应该考虑到不同浏览器和操作系统的支持情况，并进行相应的兼容性处理。此外，为了提供更好的用户体验，应该允许用户自由选择是否使用暗黑模式，并提供相应的设置选项。

**判断设备是否开启了暗黑模式：**

获取设备是否开启了暗黑模式可以通过以下几种方式：

1. CSS媒体查询：可以使用CSS的@media查询来判断是否开启了暗黑模式。在暗黑模式下，浏览器会将`prefers-color-scheme`属性的值设置为`dark`，可以根据该属性的值来设置相应的样式。例如：

```css
@media (prefers-color-scheme: dark) {
  /* 在暗黑模式下应用的样式 */
}
```

1. JavaScript：可以使用JavaScript来检测是否开启了暗黑模式。通过访问`window.matchMedia`方法并传递`'(prefers-color-scheme: dark)'`参数来判断是否开启了暗黑模式。例如：

```js
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  // 开启了暗黑模式
} else {
  // 未开启暗黑模式
}
```

需要注意的是，以上两种方式并不是所有浏览器和操作系统都支持的，开发者应该进行兼容性处理，以确保在各种设备上都能正常判断是否开启了暗黑模式。
