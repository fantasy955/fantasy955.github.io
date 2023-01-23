# Plugin

[plugin | webpack 中文文档 | webpack 中文文档 | webpack 中文网 (webpackjs.com)](https://www.webpackjs.com/concepts/plugins/)

插件目的在于解决 [loader](https://www.webpackjs.com/concepts/loaders) 无法实现的**其他事**。Webpack 提供很多开箱即用的 [插件](https://www.webpackjs.com/plugins/)。

webpack **插件**是**一个具有 [`apply`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 方法的 JavaScript 对象**。`apply` 方法会被 webpack compiler 调用，并且在 **整个** **编译生命周期**都可以访问 compiler 对象。

# Plugin API

[webpack 中文文档 | webpack 中文文档 | webpack 中文网 (webpackjs.com)](https://www.webpackjs.com/api/plugins)

插件是 webpack 生态的关键部分， 它为社区用户提供了一种强有力的方式来直接触及 webpack 的编译过程(compilation process)。 插件能够 [hook](https://www.webpackjs.com/api/compiler-hooks/#hooks) 到每一个编译(compilation)中发出的关键事件中。 在编译的每个阶段中，插件都拥有对 `compiler` 对象的完全访问能力， 并且在合适的时机，还可以访问当前的 `compilation` 对象。

## Tapable

这个小型库是 webpack 的一个核心工具，但也可用于其他地方， 以提供类似的插件接口。 在 webpack 中的许多对象都扩展自 `Tapable` 类。 它对外暴露了 `tap`，`tapAsync` 和 `tapPromise` 等方法， 插件可以使用这些方法向 webpack 中注入自定义构建的步骤，这些步骤将在构建过程中触发。

请查阅[文档](https://github.com/webpack/tapable)了解更多知识。 理解上面的的三种 `tap` 方法， 以及提供这些方法的钩子(hooks)对于编写插件来说是至关重要的。 那些扩展自 `Tapable` 的对象（例如：compiler）， 以及其提供的钩子(hooks)和每个钩子的类型（例如：`同步钩子(SyncHook)`）值得关注。

```js
const {
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook
 } = require("tapable");
```

[GitHub - webpack/tapable: Just a little module for plugins.](https://github.com/webpack/tapable)

## 插件类型

根据使用不同的钩子(hooks)和 `tap` 方法， 插件可以以多种不同的方式运行。 这个工作方式与 Tapable 提供的[钩子(hooks)](https://github.com/webpack/tapable#tapable)密切相关。 [compiler hooks](https://www.webpackjs.com/api/compiler-hooks/#hooks) 分别记录了 Tapable 内在的钩子， 并指出哪些 tap 方法可用。

所以，依赖于使用的 `tap` 方法的不同， 插件可能会以不同的方式运行。 例如：**当你钩入到 `编译(compile)` 阶段时**，只有同步的 `tap` 方法可以使用。

```js
compiler.hooks.compile.tap('MyPlugin', (params) => {
  console.log('以同步方式触及 compile 钩子。');
});
```

然而，对于可以使用 `AsyncHook` 的 `run` 阶段， 则需使用 `tapAsync` 或 `tapPromise`（以及 `tap`）方法。

```js
compiler.hooks.run.tapAsync(
  'MyPlugin',
  (source, target, routesList, callback) => {
    console.log('以异步方式触及运行钩子。');
    callback();
  }
);

compiler.hooks.run.tapPromise('MyPlugin', (source, target, routesList) => {
  return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
    console.log('以异步的方式触发具有延迟操作的钩子。');
  });
});

compiler.hooks.run.tapPromise(
  'MyPlugin',
  async (source, target, routesList) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('以异步的方式触发具有延迟操作的钩子。');
  }
);
```

这些需求(story)的含义在于， 我们可以有多种方式 hook 到 compiler 中，可以让各种插件都以合适的方式去运行。

## 自定义钩子

为了便于其他插件的编译过程中可以 `tap` 到， 你可以这样做：

1. Create a module-scope `WeakMap` for compilation hooks:

   ```ts
   const compilationHooks = new WeakMap<Compilation, MyHooks>();
   
   interface MyHooks {
     custom: SyncHook<[number, string]>;
   }
   ```

2. 在插件中创建一个静态方法：

   ```ts
   static getCompilationHooks(compilation: Compilation) : MyHooks {
     let hooks = compilationHooks.get(compilation);
     if(hooks === undefined) {
       compilationHooks.set(compilation, hooks = {
         custom: new SyncHook()
       });
     }
     return hooks;
   }
   ```

3. 像下面这样在你的插件中调用钩子函数：

   ```ts
   const hooks = MyPlugin.getCompilationHooks(compilation);
   
   hooks.custom.call(1, 'hello');
   ```

4. 其他插件也可以访问你的自定义钩子函数：

   ```ts
   import MyPlugin from 'my-plugin';
   
   const hooks = MyPlugin.getCompilationHooks(compilation);
   
   hooks.custom.tap('OtherPlugin', (n, s) => {
     // magic
   });
   ```

再次声明， 查看 `tapable` [文档](https://github.com/webpack/tapable) 来了解更多不同的钩子类(hook class)，以及它们是如何工作的。

## 进度报告

插件能够通过 [`ProgressPlugin`](https://www.webpackjs.com/plugins/progress-plugin/) 这个在默认情况下将信息打印到标准错误输出(stderr)的插件来进行进度报告。如果想要使用这个功能，只需要在使用 [webpack CLI](https://www.webpackjs.com/api/cli/) 的时候传入 `--progress` 参数。

如果想要自定义打印输出，只需要传递不同的参数到 [`ProgressPlugin`](https://www.webpackjs.com/plugins/progress-plugin/) 的 `reportProgress` 方法。

如果想要报告进度，插件必须在 `tap` 到 hook 的时候使用 `context: true` 选项。

```js
compiler.hooks.emit.tapAsync(
  {
    name: 'MyPlugin',
    context: true,
  },
  (context, compiler, callback) => {
    const reportProgress = context && context.reportProgress;
    if (reportProgress) reportProgress(0.95, 'Starting work');
    setTimeout(() => {
      if (reportProgress) reportProgress(0.95, 'Done work');
      callback();
    }, 1000);
  }
);
```

`reportProgress` 方法在被调用的时候会传入以下的参数：

```js
reportProgress(percentage, ...args);
```

- `percentage`：此参数未使用。作为代替，[`ProgressPlugin`](https://www.webpackjs.com/plugins/progress-plugin/) 插件会基于当前的钩子(hook)计算进度。
- `...args`：任意数量的字符串，这些字符串会传递给 `ProgressPlugin` 插件并报告给用户。

注意：只有 compiler 和 compilation 钩子的子集才支持 `reportProgress` 方法。请查看 [`ProgressPlugin`](https://www.webpackjs.com/plugins/progress-plugin/#supported-hooks) 了解更多信息。

## 日志

日志的 API 在 webpack 4.37 版本后提供支持。当 `logging` 在 [`统计配置(stats configuration)`](https://www.webpackjs.com/configuration/stats/#statslogging)中可用和(或)当 [`infrastructure logging`](https://www.webpackjs.com/configuration/other-options/#infrastructurelogging) 可用的时候，插件会通过各自的记录格式(stats，infrastructure)打印信息。

- 插件可以使用 `compilation.getLogger('PluginName')` 来做记录。这种形式的记录保存在统计数据(Stats)中并做相应的格式化。它能够被用户过滤和导出。
- 插件也可以使用 `compilation.getInfrastructureLogger('PluginName')` 来做记录。使用 `infrastructure` 的形式并不会被保存在统计数据(Stats)中，因此也不会被格式化。它通常直接将记录载入到 console/dashboard/GUI 中。它能够被用户过滤。
- 插件也可以使用特殊的降级逻辑 `compilation.getLogger ? compilation.getLogger('PluginName') : console` 来检测是否支持记录，以此来在不支持 `compilation.getLogger` 方法的旧版本 webpack 中提供降级方法。

# Compiler 钩子

[compiler 钩子 | webpack 中文文档 | webpack 中文文档 | webpack 中文网 (webpackjs.com)](https://www.webpackjs.com/api/compiler-hooks/)

`Compiler` 模块是 webpack 的主要引擎，它通过 [CLI](https://www.webpackjs.com/api/cli) 或者 [Node API](https://www.webpackjs.com/api/node) 传递的所有选项创建出一个 **compilation 实例**。 它扩展（extends）自 `Tapable` 类，用来注册和调用插件。 大多数面向用户的插件会首先在 `Compiler` 上注册。

# Compilation 钩子

[compilation 钩子 | webpack 中文文档 | webpack 中文文档 | webpack 中文网 (webpackjs.com)](https://www.webpackjs.com/api/compilation-hooks/)

`Compilation` 模块会被 `Compiler` 用来创建新的 compilation 对象（或新的 build 对象）。 `compilation` 实例能够访问所有的模块和它们的依赖（大部分是循环依赖）。 它会对应用程序的依赖图中所有模块， 进行字面上的编译(literal compilation)。 在编译阶段，模块会被加载(load)、封存(seal)、优化(optimize)、 分块(chunk)、哈希(hash)和重新创建(restore)。

`Compilation` 类扩展(extend)自 `Tapable`，并提供了以下生命周期钩子。 可以按照 compiler 钩子的相同方式来调用 tap：

```js
compilation.hooks.someHook.tap(/* ... */);
```

和 `compiler` 用法相同，取决于不同的钩子类型， 所以也可以在某些钩子上访问 `tapAsync` 和 `tapPromise`。

## Compilation对象方法

[Compilation Object | webpack 中文文档 | webpack 中文文档 | webpack 中文网 (webpackjs.com)](https://www.webpackjs.com/api/compilation-object/#compilation-object-methods)

# 自定义插件

[自定义插件 | webpack 中文文档 | webpack 中文文档 | webpack 中文网 (webpackjs.com)](https://www.webpackjs.com/contribute/writing-a-plugin/)