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

-----

# 自定义Loader

[编写 loader | webpack 中文文档 | webpack 中文文档 | webpack 中文网 (webpackjs.com)](https://www.webpackjs.com/contribute/writing-a-loader/)

> 我们预期 loader 模块导出为一个函数，并且编写为 Node.js 兼容的 JavaScript。通常使用 npm 进行管理 loader，但是也可以将应用程序中的文件作为自定义 loader。按照约定，loader 通常被命名为 `xxx-loader`（例如 `json-loader`）。更多详细信息，请查看 [编写一个 loader](https://www.webpackjs.com/contribute/writing-a-loader/)。

Loader是一个Node.js函数，它接收源代码文件的内容，并将内容处理后返回出去。

## 返回值





# 参考资料

- [Loaders | webpack 中文文档 | webpack 中文文档 | webpack 中文网 (webpackjs.com)](https://www.webpackjs.com/loaders/)