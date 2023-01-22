# 介绍

Webpack 支持使用 [loader](https://www.webpackjs.com/concepts/loaders) 对文件进行预处理。你可以构建包括 JavaScript 在内的任何静态资源。并且可以使用 Node.js 轻松编写自己的 loader。

1. 在 `require()` 语句中使用 `loadername!` 作为前缀的方式来使用 loader（使用问号传递参数），内联loader。可以使用`!,-!,!!`三个前缀，配置该文件被不被以及如何被config内配置的loader处理。
2. 或者在 webpack 配置中配置 regex 来自动应用它们 - 请参阅 [配置](https://www.webpackjs.com/concepts/loaders/#configuration) 。

## loader 特性

- loader 支持链式调用。链中的每个 loader 会将转换应用在已处理过的资源上。一组链式的 loader 将按照相反的顺序执行。链中的第一个 loader 将其结果（也就是应用过转换后的资源）传递给下一个 loader，依此类推。最后，链中的最后一个 loader，返回 webpack 所期望的 JavaScript。
- loader 可以是同步的，也可以是异步的。
- loader 运行在 Node.js 中，并且能够执行任何操作。
- loader 可以通过 `options` 对象配置（仍然支持使用 `query` 参数来设置选项，但是这种方式已被废弃）。
- 除了常见的通过 `package.json` 的 `main` 来将一个 npm 模块导出为 loader，还可以在 module.rules 中使用 `loader` 字段直接引用一个模块。
- 插件(plugin)可以为 loader 带来更多特性。
- loader 能够产生额外的任意文件。

## 关键概念

- **request**
  `module request`，[loader-utils](https://github.com/webpack/loader-utils)中使用了这种说明。是指用内联方式处理一个模块的路径，例如：

  ```
  E:\Users\lenovo\fantasy995.github.io\demos\webpack-study\node_modules\css-loader\dist\cjs.js!E:\Users\lenovo\fantasy995.github.io\demos\webpack-study\src\index.css
  ```

-----

# 自定义Loader

[编写 loader | webpack 中文文档 | webpack 中文文档 | webpack 中文网 (webpackjs.com)](https://www.webpackjs.com/contribute/writing-a-loader/)

> 我们预期 loader 模块导出为一个函数，并且编写为 Node.js 兼容的 JavaScript。通常使用 npm 进行管理 loader，但是也可以将应用程序中的文件作为自定义 loader。按照约定，loader 通常被命名为 `xxx-loader`（例如 `json-loader`）。更多详细信息，请查看 [编写一个 loader](https://www.webpackjs.com/contribute/writing-a-loader/)。

Loader是一个Node.js函数，它接收源代码文件的内容，并将内容处理后返回出去。

## Loader接口

loader 本质上是导出为函数的 JavaScript 模块。[loader runner](https://github.com/webpack/loader-runner) 会调用此函数，然后将上一个 loader 产生的结果或者资源文件传入进去。函数中的 `this` 作为上下文会被 webpack 填充，并且 [loader runner](https://github.com/webpack/loader-runner) 中包含一些实用的方法，比如可以使 loader 调用方式变为异步，或者获取 query 参数。

起始 loader 只有一个入参：资源文件的内容。compiler 预期得到最后一个 loader 产生的处理结果。这个**处理结果**应该为 `String` 或者 `Buffer`（能够被转换为 string）类型，代表了模块的 JavaScript 源码。另外，还可以传递一个可选的 SourceMap 结果（格式为 JSON 对象）。

如果是单个处理结果，可以在 [同步模式](https://www.webpackjs.com/api/loaders/#synchronous-loaders) 中直接返回。**如果有多个处理结果**，则必须调用 `this.callback()`。在 [异步模式](https://www.webpackjs.com/api/loaders/#asynchronous-loaders) 中，必须调用 `this.async()` 来告知 [loader runner](https://github.com/webpack/loader-runner) 等待异步结果，它会返回 `this.callback()` 回调函数。**随后 loader 必须返回 `undefined` 并且调用该回调函数。**

```js
/**
 *
 * @param {string|Buffer} content 源文件的内容
 * @param {object} [map] 可以被 https://github.com/mozilla/source-map 使用的 SourceMap 数据
 * @param {any} [meta] meta 数据，可以是任何内容
 */
function webpackLoader(content, map, meta) {
  // 你的 webpack loader 代码
}
```

不返回`map`会导致无法生成`SourceMap`。

## Raw Loader

默认情况下，资源文件会被转化为 UTF-8 字符串，然后传给 loader。通过设置 `raw` 为 `true`，loader 可以接收原始的 `Buffer`。每一个 loader 都可以用 `String` 或者 `Buffer` 的形式传递它的处理结果。complier 将会把它们在 loader 之间相互转换。

**raw-loader.js**

```javascript
module.exports = function (content) {
  assert(content instanceof Buffer);
  return someSyncOperation(content);
  // 返回值也可以是一个 `Buffer`
  // 即使不是 "raw"，loader 也没问题
};
module.exports.raw = true;  // 声明
```

## Pitching Loader

[Loader Interface | webpack 中文文档 | webpack 中文文档 | webpack 中文网 (webpackjs.com)](https://www.webpackjs.com/api/loaders/#pitching-loader)

### 接口

```js

module.exports.pitch = function (remainingRequest, precedingRequest, data) {
  if (someCondition()) {
    return (
      'module.exports = require(' +
      JSON.stringify('-!' + remainingRequest) +
      ');'
    );
  }
};
```

[这篇文章,揭秘webpack loader - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/104205895#:~:text=`pitch` 是 loader 上的一个方法，它的作用是阻断 loader 链。 %2F%2F loaders%2Fsimple-loader-with-pitch.js,%3D function() { console.log('pitching graph')%3B %2F%2F todo })用`style-loader`和`css-loader`分析了`pitch`的作用。

由于`pitch`是顺序执行的，一旦有返回值就会立即返回，执行之前的`loader`。

`style-loader`与`css-loader`的使用方式（先后顺序）：

```js
module: {
    rules: [
      {
        // 配置处理 css 的 loader
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
```

`css-loader`可以将`css`代码转换为`js`模块，`js`模块内容不会交给它的下一个`loader`: `style-loader`。

我们可以在`style-loader`的`pitch`方法内使用require方式得到`css-loader`解析的内容。然后返回一段`js`语句将创建`style`标签插入到`head`处。

- 为什么不能在loader函数内使用`css-loader`？

  1. 我们无法自己调用`css-loader`得到对应js模块。`loader`是由`loader runner`实例化的，函数中的 `this` 作为上下文会被 webpack 填充，并且 [loader runner](https://github.com/webpack/loader-runner) 中包含一些实用的方法，比如可以使 loader 调用方式变为异步，或者获取 query 参数。
  2. 既然无法自己调用`loader`，那就只能通过链式调用，如前面分析的，链式调用顺序下，我们无法获得`css-loader`的输出。

  因此，在`pitch`函数内（非编译阶段），我们修改源文件内容：

  ```js
  // loaders/simple-style-loader.js
  
  const loaderUtils = require('loader-utils');
  module.exports = function(source) {
      // do nothing
  }
  
  module.exports.pitch = function(remainingRequest) {
    console.log('simple-style-loader is working');
      // 在 pitch 阶段返回脚本
      return (
        `
        // 创建 style 标签
        let style = document.createElement('style');
  
        /**
        * 利用 remainingRequest 参数获取 loader 链的剩余部分
        * 利用 ‘!!’ 前缀跳过其他 loader 
        * 利用 loaderUtils 的 stringifyRequest 方法将模块的绝对路径转为相对路径
        * 将获取 css 的 require 表达式赋给 style 标签
        */
        style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)});
        
        // 将 style 标签插入 head
        document.head.appendChild(style);
        `
      )
  }
  ```

  ```ts
  export function stringifyRequest(loaderContext: loader.LoaderContext, resource: string): string;
  ```

  因此，`simplestyle-loader`并没有做其他处理，只是利用了`css-loader`。

## loader 工具库(Loader Utilities)

充分利用 [`loader-utils`](https://github.com/webpack/loader-utils) 包。它提供了许多有用的工具，但最常用的一种工具是获取传递给 loader 的选项。[`schema-utils`](https://github.com/webpack-contrib/schema-utils) 包配合 `loader-utils`，用于保证 loader 选项，进行与 JSON Schema 结构一致的校验。

-----

# 参考资料

- [Loaders | webpack 中文文档 | webpack 中文文档 | webpack 中文网 (webpackjs.com)](https://www.webpackjs.com/loaders/)

- [揭秘webpack loader - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/104205895#:~:text=`pitch` 是 loader 上的一个方法，它的作用是阻断 loader 链。 %2F%2F loaders%2Fsimple-loader-with-pitch.js,%3D function() { console.log('pitching graph')%3B %2F%2F todo })
- loader简介：[loader | webpack 中文文档 | webpack 中文文档 | webpack 中文网 (webpackjs.com)](https://www.webpackjs.com/concepts/loaders/#loader-features)
- 编写loader：[编写 loader | webpack 中文文档 | webpack 中文文档 | webpack 中文网 (webpackjs.com)](https://www.webpackjs.com/contribute/writing-a-loader/)
- loader 接口、API：[Loader Interface | webpack 中文文档 | webpack 中文文档 | webpack 中文网 (webpackjs.com)](https://www.webpackjs.com/api/loaders/)

