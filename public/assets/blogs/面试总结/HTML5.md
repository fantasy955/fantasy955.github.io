## 被废除的元素

- 能用css代替的元素 
  basefont、big、center、font、s、strike、tt、u。这些元素纯粹是为画面展示服务的，HTML5中提倡把画面展示性功能放在css中统一编辑。 

- 不再使用**frame**框架。 
    frameset、frame、noframes。HTML5中不支持frame框架，只支持**iframe**框架，或者用服务器方创建的由多个页面组成的符合页面的形式，删除以上这三个标签。 

- 只有部分浏览器支持的元素 
   applet、bgsound、blink、marquee等标签。

## 视频

- video标签。[「完全理解」video 标签到底能播放什么 - 掘金 (juejin.cn)](https://juejin.cn/post/7018373086072766472)

  `autoplay`，声明该属性后，视频会尽快自动开始播放，不会停下来等待数据全部加载完成。自动播放失败时**不会触发**任何事件。也没有抛出异常或可以设置回调，甚至在媒体元素上都没有标记来告诉你自动播放是否起作用。你实际能做的就是检查一些值，然后根据这些值猜测自动播放是否起作用（`onplay`事件）。浏览器会来决定什么时候进行播放（比如用户与网页交互后，因此一般不会造成负面影响）。
  [video|MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)

  

## 标签

### input

- step不能为负值；

### META标签

META标签有几个常用的属性，包括`name`，`http-equiv`，`charset`和`content`。

- `charset`；

- `content`，此属性包含[`http-equiv`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta#attr-http-equiv) 或[`name`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta#attr-name) 属性的值，具体取决于所使用的值；

- `http-equiv`，设置为`refresh`，并且`content`设置为`s;url=`，等待指定秒数后重定向到目标页面；

  用来防止XSS攻击：

  ```html
  <meta http-equiv="Content-Security-Policy" content="script-src 'self'">
  ```

- `name`，`name` 和 `content` 属性可以一起使用，以名 - 值对的方式给文档提供元数据，其中 name 作为元数据的名称，content 作为元数据的值。

  在[标准元数据名称](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta/name)中查看 HTML 规范等规范中定义的标准元数据名称。

  元数据是关于数据的数据。在HTML文档中，元数据是关于文档本身的信息，例如作者、描述、关键字等。元数据不会显示在页面上，但可以被浏览器和搜索引擎用来理解文档的内容。

  除了`meta`标签，你还可以在文档的其他地方使用元数据。例如，`title`标签用来指定文档的标题，`link`标签用来指定文档的外部资源，如样式表。

### Link标签

- `preload` 和 `prefetch` 都是用来提前加载资源的 HTML 链接关系（link rel）。它们的主要区别在于加载时机和优先级。

  `preload` 用于指定当前页面需要立即使用的资源。浏览器会尽快加载这些资源，并且这些资源的加载优先级高于其他资源。例如，您可以使用 `preload` 来提前加载关键的 CSS 文件或字体文件，以加快页面渲染速度。

  `prefetch` 用于指定在当前页面加载完成后可能需要使用的资源。浏览器会在空闲时间预先加载这些资源，但这些资源的加载优先级低于其他资源。例如，您可以使用 `prefetch` 来提前加载下一个页面的图片或脚本文件，以加快下一个页面的加载速度。

  总之，`preload` 用于提前加载当前页面**需要立即使用**的关键资源，而 `prefetch` 用于提前加载当前页面加载完成后**可能需要使用**的非关键资源。

  `preload` 和 `prefetch` 都是异步加载资源的，它们**不会阻止浏览器继续解析 HTML 文档**。这意味着，即使您使用 `preload` 或 `prefetch` 来提前加载资源，浏览器仍然会继续解析 HTML 文档，并构建 DOM 树。

  相对于类似的技术，Preload有`as`属性，这让浏览器可做一些subresource和prefetch无法实现的事：**浏览器可以设置正确的资源加载优先级**；浏**览器可以确保请求是符合内容安全策略的**；**浏览器能根据as的值发送适当的Accept头部信息**；**浏览器通过as值能得知资源类型**。

## Drag API

HTML5 引入了一组拖放（Drag and Drop）API，可以让您在网页中实现拖放功能。这些 API 允许您指定一个元素可拖动，并定义当该元素被拖放到其他元素上时应该执行的操作。

要使用拖放 API，首先需要将一个元素设置为可拖动。这可以通过将该元素的 `draggable` 属性设置为 `true` 来实现。例如：

```html
<img src="image.jpg" draggable="true" />
```

接下来，您需要监听该元素的 `dragstart` 事件，并在事件处理程序中指定被拖动数据的类型和值。这可以通过调用事件对象的 `dataTransfer.setData()` 方法来实现。例如：

```javascript
element.addEventListener('dragstart', function(event) {
    event.dataTransfer.setData('text/plain', 'Drag me!');
});
```

当用户开始拖动该元素时，浏览器会触发 `dragstart` 事件，并执行上面定义的事件处理程序。

此外，您还需要定义当被拖动元素被拖放到其他元素上时应该执行的操作。这可以通过监听目标元素的 `dragover` 和 `drop` 事件来实现。

在 `dragover` 事件处理程序中，您需要调用 `event.preventDefault()` 来阻止浏览器默认行为，并指定允许拖放的效果。例如：

```javascript
target.addEventListener('dragover', function(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
});
```

在 `drop` 事件处理程序中，您需要调用 `event.preventDefault()` 来阻止浏览器默认行为，并使用 `event.dataTransfer.getData()` 方法获取被拖动数据的类型和值。然后，您可以根据需要执行相应的操作。例如：

```javascript
target.addEventListener('drop', function(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData('text/plain');
    //
```



- 

  可以使用`preload`加载字体文件（`@font-face`会使用）。

