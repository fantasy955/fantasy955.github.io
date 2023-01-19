# 概念

- module，chunk，bundle
  module：源码中每个文件；
  chunk：内存中的一个概念，还没有整理输出的集合。一个chunk对应一个bundle。包括**初始化的（例如entry指定的入口文件）**和**非初始化的（例如自己写的代码模块，webpack分割的代码模块，动态导入的模块）**两类
  bundle：最终输出的文件。bundle 是一个或多个 chunk 组成的集合。

- 举个例子：

  ```jsx
  {
    entry: {
      foo: ["webpack/hot/only-dev-server.js","./src/foo.js"],
      bar: ["./src/bar.js"]
    },
    output: {
      path: "./dist",
      filename: "[name].js"
    }
  }
  ```

  - **modules**："webpack/hot/only-dev-server.js", "./src/foo.js" 以及其他依赖于这些文件的其他模块都是 modules。
  - **chunks**：foo, bar
  - **bundles**：foo, bar

-----

# loader

loader是代码层面的处理，这里以`css-loader`和`style-loader`进行分析。

- [Understanding Loaders In Webpack](https://backbencher.dev/webpack-loaders)
- [Webpack style-loader vs css-loader](https://stackoverflow.com/questions/34039826/webpack-style-loader-vs-css-loader)

`css`的样式在运行时通过`js`代码添加到页面中。并没有影响最终产物（直接将css添加到html文件中）。

## css-loader

1. Turn `file.less` into plain CSS with the Less loader
2. Resolve all the `imports` and `url(...)`s in the CSS with the CSS loader
3. Insert those styles into the page with the style loader

## style-loader

takes those styles and creates a `<style>` tag in the page's `<head>` element containing those styles.

## 引入资源

`webpack5`继承了`file-loader`和`url-loader`，只需要将`type`设置为`asset`。

### 图片

```js
{
	test: /\.(png|jpg|jpeg|webp)$/,
	type: "asset",
}
```

文件被打包到输出目录：

![image-20230118200508568](assets/image-20230118200508568.png)

### 其他资源

`type: "asset/resource"`

### 配置

`generator`可以配置资源的输出的目录。

```js
{
	test: /\.(png|jpg|jpeg|webp)$/,
	type: "asset",
	generator: {
		filename: "static/[hash][ext]"  // 
	}
}
```

## babel

`webpack`对js的处理有限，**只能编译ES中的模块化语法，类似箭头函数等高级特性不能做兼容性处理**。

## 配置

普通引入`loader`可以直接写字符串。

如果要配置`options`则需要以对象形式引入。

------

# Plugin

## 处理HTML

[HtmlWebpackPlugin ](https://www.webpackjs.com/plugins/html-webpack-plugin/)

通过`template`指定`html`的模板（自己写的html文件，一般是public/index.html或index.html）。

> 如果你有多个 webpack 入口，他们都会在已生成 HTML 文件中的 `<script>` 标签内引入。

> 如果在 webpack 的输出中有任何 CSS 资源（例如，使用 [MiniCssExtractPlugin](https://www.webpackjs.com/plugins/mini-css-extract-plugin/) 提取的 CSS），那么这些资源也会在 HTML 文件 `<head>` 元素中的 `<link>` 标签内引入。

-----

# 生产优化

## 生成单独css文件

`style-loader`将`css`以js的方式添加到页面上，这意味着需要通过解析过程，并且需要引入`script`文件。

如果输出的是css文件，webpack会将其通过`link`标签引入（HtmlWebpackPlugin ），不会出现闪屏现象。

[MiniCssExtractPlugin](https://www.webpackjs.com/plugins/mini-css-extract-plugin#root)

> 本插件会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。

## 样式兼容性

`post-cssloader`，做到什么程度受`browerlist`配置的影响。

## SourceMap

[弄懂 SourceMap，前端开发提效 100% - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/467566753)

[Devtool | webpack 中文文档 | webpack 中文文档 | webpack 中文网 (webpackjs.com)](https://www.webpackjs.com/configuration/devtool/#root)

生成源代码和构建代码的映射关系，在出错时快速定位出错位置。

生成模型需要关心行和列，因为只会生成一行代码。

## 打包构建速度

### 模块热替换

一般来说`loader`帮助我们指定了哪些模块可以进行模块热替换。

![image-20230118212436721](assets/image-20230118212436721.png)

`vue-loader`配置了`vue`文件的热替换。

> HMR 是可选功能，只会影响包含 HMR 代码的模块。举个例子，通过 [`style-loader`](https://github.com/webpack-contrib/style-loader) 为 style 追加补丁。为了运行追加补丁，`style-loader` 实现了 HMR 接口；当它通过 HMR 接收到更新，它会使用新的样式替换旧的样式。

### 文件只被一个loader处理

`oneOf`属性。

[Rule.oneOf](https://www.webpackjs.com/configuration/module#ruleoneof)

### Babel和Eslint缓存

`babel-loader`配置：

![image-20230118213515098](assets/image-20230118213515098.png)

`EslintPlugin`配置：

![image-20230118213530931](assets/image-20230118213530931.png)

### 多进程

对`babel-loader`，`Eslint`代码压缩，开启多进程（这不是一键开启的）。

## 减小打包体积

- `@babel/plugin-transform-runtime`

  [babel-plugin-transform-runtime · Babel 中文文档 - 印记中文 (docschina.org)](https://babel.docschina.org/docs/en/6.26.3/babel-plugin-transform-runtime/)

  > [babel-runtime使用与性能优化 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903615212027917)
  >
  > [babel-polyfill使用与性能优化](https://link.juejin.cn/?target=https%3A%2F%2Fwww.chyingp.com%2Fposts%2Funderstanding-babel-polyfill%2F)
  >
  > 引入babel-polyfill会有一定副作用，比如：
  >
  > - 引入了新的全局对象：比如Promise、WeakMap等。
  > - 修改现有的全局对象：比如修改了Array、String的原型链等。
  >
  > 在应用开发中，上述行为问题不大，基本可控。但如果在库、工具的开发中引入babel-polyfill，则会带来潜在的问题。
  >
  > 举个例子，我在项目中定义了跟规范不一致的`Array.from()`函数（别管我为什么不一样，就是这么任性），同时引入了一个库（依赖babel-polyfill），此时，这个库可能覆盖了自定义的`Array.from()`函数，导致出错。

  这就是babel-runtime存在的原因。**它将开发者依赖的全局内置对象等，抽取成单独的模块，并通过模块导入的方式引入**，避免了对全局作用域的修改（污染）。

  因此，如果是开发库、工具，可以考虑使用 babel-runtime。

  babel 的 `polyfill` 机制是，对于例如 `Array.from` 等静态方法，直接在 `global.Array` 上添加；对于例如 `includes` 等实例方法，直接在 `global.Array.prototype` 上添加。这样直接修改了全局变量的原型，有可能会带来意想不到的问题。这个问题在开发第三方库的时候尤其重要，因为我们开发的第三方库修改了全局变量，有可能和另一个也修改了全局变量的第三方库发生冲突，或者和使用我们的第三方库的使用者发生冲突。公认的较好的编程范式中，也不鼓励直接修改全局变量、全局变量原型。

- 图片压缩
  `imagemin`

## Code Split

webpack的`optimazation`下的`splitChunks`属性。

将代码分割成多个chunk（chunk是指源代码中的块，打包出的交bundle），并打包（按需加载，在首页时只加载首页所需要的js文件）。

- 多入口。
- 抽离复用代码，输出成独立模块。
  ![image-20230119205358583](assets/image-20230119205358583.png)

### 按需导入任意文件

`plugins: ['import']`

在任意位置使用`import`语句。

### CodeSplit统一命名

- css资源
  ![image-20230119210037517](assets/image-20230119210037517.png)
- js，asset资源
  ![image-20230119210111033](assets/image-20230119210111033.png)

## NetworkCache

场景，A模块依赖B模块，B模块修改时，生成的bundle由于B模块内容修改导致hash值更改，B模块打包后的文件名发生变化，而A模块内使用了B模块打包后的名称，A模块内容也发生变化，A模块的打包后名称也发生变化。

A-B

A-runtime-B

## Core.js处理ES6及以上兼容性

过去我们使用 babel 对js 代码进行了兼容性处理，其中使用@babel/preset-env 智能预设来处理容性问题.它能将 ES6 的一些**语法**进行编译转换，比如头函数、点点运算符等。但是如果是 async 函数、promise 对象、数组的一些方法(includes)等，它没办法处理。
所以此时我们 js 代码仍然存在兼客性问题，一旦遇到低版本浏览器会直接报错。所以我们想要将 js兼容性问题彻底解决

- polyfill
  [core.js 是个什么 - 掘金 (juejin.cn)](https://juejin.cn/post/6996485507039363103)
  如果某个对象或函数不存在，则提供对应函数或对象的实现。

- 引入core.js
  完整引入：`import 'core.js'`
  按需加载：`import 'core.js/es/promise'`
  自动引入：配置babel预设`[@babel/preset-env]`
  ![image-20230119213555141](assets/image-20230119213555141.png)

## ServiceWorker

[渐进式网络应用程序 | webpack 中文文档 | webpack 中文文档 | webpack 中文网 (webpackjs.com)](https://www.webpackjs.com/guides/progressive-web-application/#adding-workbox)

# 总结

我们从 4 个角度对 webpack 和代码进行了优化：

1. 提升开发体验

- 使用 `Source Map` 让开发或上线时代码报错能有更加准确的错误提示。

2. 提升 webpack 提升打包构建速度

- 使用 `HotModuleReplacement` 让开发时只重新编译打包更新变化了的代码，不变的代码使用缓存，从而使更新速度更快。
- 使用 `OneOf` 让资源文件一旦被某个 loader 处理了，就不会继续遍历了，打包速度更快。
- 使用 `Include/Exclude` 排除或只检测某些文件，处理的文件更少，速度更快。
- 使用 `Cache` 对 eslint 和 babel 处理的结果进行缓存，让第二次打包速度更快。
- 使用 `Thead` 多进程处理 eslint 和 babel 任务，速度更快。（需要注意的是，进程启动通信都有开销的，要在比较多代码处理时使用才有效果）

3. 减少代码体积

- 使用 `Tree Shaking` 剔除了没有使用的多余代码，让代码体积更小。
- 使用 `@babel/plugin-transform-runtime` 插件对 babel 进行处理，让辅助代码从中引入，而不是每个文件都生成辅助代码，从而体积更小。
- 使用 `Image Minimizer` 对项目中图片进行压缩，体积更小，请求速度更快。（需要注意的是，如果项目中图片都是在线链接，那么就不需要了。本地项目静态图片才需要进行压缩。）

4. 优化代码运行性能

- 使用 `Code Split` 对代码进行分割成多个 js 文件，从而使单个文件体积更小，并行加载 js 速度更快。并通过 import 动态导入语法进行按需加载，从而达到需要使用时才加载该资源，不用时不加载资源。
- 使用 `Preload / Prefetch` 对代码进行提前加载，等未来需要使用时就能直接使用，从而用户体验更好。
- 使用 `Network Cache` 能对输出资源文件进行更好的命名，将来好做缓存，从而用户体验更好。
- 使用 `Core-js` 对 js 进行兼容性处理，让我们代码能运行在低版本浏览器。
- 使用 `PWA` 能让代码离线也能访问，从而提升用户体验。