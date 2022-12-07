# CSS盒模型

[盒模型](./CSS3盒相关样式.md)

## border-image

![image-20221206160921920](assets/image-20221206160921920.png)

```html
div{
            height: 300px;
            margin: 0 auto;
            border-style: solid;
            border-image: url(./5922778fc038f.jpg) 10 10 10 10  / 60px;
        }
```

`60px`指的是边框宽度。

`10 10 10 10`是切分图片的参数。

使用`border-image`后，`div`内部的元素会出现在`border`上。

![image-20221206161858382](assets/image-20221206161858382.png)

普通边框：

![image-20221206161912766](assets/image-20221206161912766.png)

# HTML知识点

引用自：[2022高频前端面试题——HTML篇 - 掘金 (juejin.cn)](https://juejin.cn/post/7095899257072254989)

## DOCTYPE

`Doctype`是**HTML5**的文档声明，通过它可以告诉浏览器，使用哪一个HTML版本标准解析文档。

## src和href的区别

当浏览器解析到src元素时，会暂定其他资源的下载，直到将该资源加载、编译、执行完毕。这也是为什么将js脚本放在底部。

href指超链接，浏览器解析到该属性时会并行下载资源。

## 前端页面三层结构

结构层（各种标签，HTML语义形成的），表示层（css），行为层（js）。

## img的alt和title属性

- alt：全称`alternate`，切换的意思，如果无法显示图像，浏览器将显示alt指定的内容
- title：当鼠标移动到元素上时显示title的内容

一般当鼠标滑动到元素身上的时候显示`title`，而`alt`是img标签特有的属性，**是图片内容的等价描述**，用于图片无法加载时显示，这样用户还能看到关于丢失了什么东西的一些信息，相对来说比较友好。

## 行列元素和块级元素

**使用行内元素需要注意的是**：

- 行内元素设置宽度`width`无效

- 行内元素设置`height`无效，但是可以通过`line-height`来设置

  由于行内元素的框高是自适应的，因此无法指定高度。而line-height定义的是每一行的高度。

- 设置`margin`只有左右有效，上下无效

- 设置`padding`只有左右有效，上下无效

[line-height 与 height 的区别 - 远征i - 博客园 (cnblogs.com)](https://www.cnblogs.com/expedition/p/11294002.html)

line-height是行高的意思，它决定了**元素中文本内容的高度**，height则是定义**元素自身的高度**。

“行高”顾名思意指一行文字的高度。具体来说是指**两行文字间基线之间的距离**。

![img](assets/1544757-20190803102735094-94602485.png)

文字中心在基线上，因此如果想让块内文字居中，可以设置行高为父元素高度（100%）。

## label的作用

`label`元素不会向用户呈现任何特殊效果，但是，它为鼠标用户改进了可用性，当我们在label元素内点击文本时就会触发此控件。也就是说，当用户选择该标签时，浏览器就会自动将焦点转到和标签相关的表单控件上。最常用label的地方就是表单中的性别单选框了，当点击文字时也能够自动聚焦绑定的表单控件。

```html
<form>
     <label for="male">男</label>  //点击label，焦点转移到input上
     <input type="radio" name="sex" id="male">
     <label for="female">女</label>
     <input type="radio" name="sex" id="female">
</form>
```

## HTML5新增了哪些新特性？移除了哪些元素？

HTML5主要是关于图像、位置、存储、多任务等功能的增加：

- 语义化标签，如：article、footer、header、nav等
- 视频video、音频audio
- 画布canvas
- 表单控件，calendar、date、time、email
- 地理
- 本地离线存储，localStorage长期存储数据，浏览器关闭后数据不丢失，sessionStorage的数据在浏览器关闭后自动删除
- 拖拽释放

移除的元素：

- 纯表现的元素：`basefont、font、s、strike、tt、u、big、center`
- 对可选用性产生负面影响的元素：`frame、frameset、noframes`

## 如何实现在一张图片上的某个区域做到点击事件

`map`和`area`标签。map标签用于声明图像地图作用域，area标签在map标签内部。

## a元素除了用于导航外，还有什么作用？

href属性中的url可以是浏览器支持的任何协议，所以a标签可以用来手机拨号`<a href="tel:110">110</a>`，也可以用来发送短信`<a href="sms:110">110</a>`，还有邮件等等。

当然，a元素最常见的就是用来做*锚点*和 *下载文件*。下载的原理在于a标签所对应的资源浏览器无法解析，于是浏览器会选择将其下载下来。

## 你知道SEO中的TDK吗？

SEO指的是搜索引擎优化，TDK其实就是`title`、`description`、`keywords`这三个标签，title表示标题标签，description是描述标签，keywords是关键词标签

# CSS3中的变形处理

## transform

[transform - CSS（层叠样式表） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform#语法)

- 缩放，scale
- 倾斜，skew
- 移动，translate
- ...

## 变形的基准点

使用transform对文字或图像进行变形时，是以元素的中心为基准点进行的（因此不需要top，left属性）。使用`transform-origin`改变基准点。

## [`transform-function`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function)

### translate

> **百分比以自身为基准** , 当只有一个参数时，默认为沿x轴移动的距离。

# CSS3中的动画

CSS3中的功能分为`transitions`和`animation`功能。

`transitions`进行属性变换；

`animation`通过关键帧进行变换，可以实现更复杂的效果。

## transition

[transition - CSS（层叠样式表） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition)

**`transition`** [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) 属性是 [`transition-property`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-property)、[`transition-duration`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-duration)、[`transition-timing-function`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function) 和 [`transition-delay`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-delay) 的一个[简写属性 (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties)。

- `property`: 指定平滑过渡的属性；
- `duration`：指定过度时间；
- `timing-function`：使用什么方法进行平滑过渡。（总时间不变，但可以有块有慢）

`transition`定义的是属性发生改变时的持续时间。它本身并不关心属性如何变化。

```html
    <style>
        .box {
            border-style: solid;
            border-width: 1px;
            display: block;
            width: 100px;
            height: 100px;
            background-color: #0000FF;
            -webkit-transition: width 2s, height 2s,
                background-color 2s, -webkit-transform 2s;
            transition: width 2s, height 2s, background-color 2s, transform 2s;
        }

        .box:hover {
            background-color: #FFCCCC;
            width: 200px;
            height: 200px;
            -webkit-transform: rotate(180deg);
            transform: rotate(180deg);
        }
    </style>
```

这里当鼠标移动到元素上时，`width`,`height`,`transform`等属性都发生了变化。当我们移出`height: 200px`时，高度不会触发动画。

## animation

[animation - CSS（层叠样式表） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation)

`animation`也是通过指定属性变化实现动画；

`tansition`只能指定属性的开始和结束，然后在两个属性之间进行平滑过渡，因此不能实现复杂的动画效果；

`animation`通过定义关键帧，在每个帧中定义属性的值，实现更加复杂的动画。

[CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) **animation** 属性是 [`animation-name`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-name)，[`animation-duration`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-duration), [`animation-timing-function`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-timing-function)，[`animation-delay`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-delay)，[`animation-iteration-count`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-iteration-count)，[`animation-direction`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-direction)，[`animation-fill-mode`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-fill-mode) 和 [`animation-play-state`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-play-state) 属性的一个简写属性形式。

### 定义动画

```html
animation = 
  <single-animation>#  

<single-animation> = 
  <time>                              ||
  <easing-function>                   ||
  <time>                              ||
  <single-animation-iteration-count>  ||
  <single-animation-direction>        ||
  <single-animation-fill-mode>        ||
  <single-animation-play-state>       ||
  [ none | <keyframes-name> ]   
```

```
@keyframes move_eye {
            from {
                margin-left: -20%;
            }

            to {
                margin-left: 100%;
            }
        }
```

可以使用百分比定义关键帧。

## timing-function

[animation-timing-function - CSS（层叠样式表） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-timing-function)

对于关键帧动画来说，`timing function `作用于**一个关键帧周期**而非整个动画周期，即从关键帧开始开始，到关键帧结束结束。这意味着使用`ease-in`的话，每一帧的变化都是最开始比较慢，之后变快。

