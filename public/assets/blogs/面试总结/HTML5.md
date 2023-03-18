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

- 

## 标签

### input

- step不能为负值；