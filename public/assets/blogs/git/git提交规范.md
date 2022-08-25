# Git 的提交规范

## 1 概述

格式：

```
<type>(<scope>): <subject>

<body>

<footer>
```

上述大概分为3部分（使用空行分割）：

1. 标题行（必填）：描述主要修改类型和内容
2. 主题内容: 描述为什么修改, 做了什么样的修改, 以及开发的思路等等
3. 页脚注释: 放 Breaking Changes 或 Closed Issues

### 标题行

`type`(必填): 用于说明commit的类别，只允许使用以下几个标识：

- feat：新功能（feature）
- fix：修改bug
- docs：文档修改
- style：代码格式修改（不影响代码运行的变动，例如分号修改），注意⚠️不是 CSS 修改
- refactor：代码重构
- test：测试用例修改
- build: 影响项目构建或依赖项修改，如 webpack版本升级等
- perf: 性能优化
- revert: 撤销之前的 commit
- ci: 持续集成相关文件修改
- chore：其它修改（不在 上述类型中的修改）

`scope`(可选): 用于说明commit的影响范围，比如route、component、utils、build等，视项目不同而不同。

`subject`(必填): commit信息的简短描述，不超过50个字符，要求如下：

- 以动词开头，使用第一人称现在时，比如change，而不是changed或changes
- 第一个字母小写
- 结尾不加句号（.）

### 主题内容

`body`: commit 具体修改内容, 可以分为多行。

### 页脚注释

`footer`: 一些备注, 通常是 BREAKING CHANGE 或修复的 bug 的链接。

## 2 示例

2.1 feat

```
# 包含了描述以及正文内有破坏性变更的提交说明
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files

# 包含作用域的提交说明
feat(lang): add polish language
```

2.2 fix

```
# 为 fix 编写的提交说明，包含（可选的） issue 编号
fix: correct minor typos in code

see the issue for details on the typos fixed

closes issue #12
```

2.3 chore

```
# 包含了可选的 ! 字符以提醒注意破坏性变更的提交说明
chore!: drop Node 6 from testing matrix

BREAKING CHANGE: dropping Node 6 which hits end of life in April
```

2.4 docs

```
# 不包含正文的提交说明
docs: correct spelling of CHANGELOG
```

## 3 约定式提交规范

1. 每个提交都**必须**使用类型字段前缀，它由一个名词组成，诸如 `feat` 或 `fix` ，其后接一个**可选的**作用域字段，以及一个**必要的**冒号（英文半角）和空格。
2. 当一个提交为应用或类库实现了新特性时，**必须**使用 `feat` 类型。
3. 当一个提交为应用修复了 bug 时，**必须**使用 `fix` 类型。
4. 作用域字段**可以**跟随在类型字段后面。作用域**必须**是一个描述某部分代码的名词，并用圆括号包围，例如： `fix(parser):`
5. 描述字段**必须**紧接在类型/作用域前缀的空格之后。描述指的是对代码变更的简短总结，例如： *fix: array parsing issue when multiple spaces were contained in string.*
6. 在简短描述之后，**可以**编写更长的提交正文，为代码变更提供额外的上下文信息。正文**必须**起始于描述字段结束的一个空行后。
7. 在正文结束的一个空行之后，**可以**编写一行或多行脚注。脚注**必须**包含关于提交的元信息，例如：关联的合并请求、Reviewer、破坏性变更，每条元信息一行。
8. 破坏性变更**必须**标示在正文区域最开始处，或脚注区域中某一行的开始。一个破坏性变更**必须**包含大写的文本 `BREAKING CHANGE`，后面紧跟冒号和空格。
9. 在 `BREAKING CHANGE: `之后**必须**提供描述，以描述对 API 的变更。例如： *BREAKING CHANGE: environment variables now take precedence over config files.*
10. 在提交说明中，**可以**使用 `feat` 和 `fix` 之外的类型。
11. 工具的实现**必须不**区分大小写地解析构成约定式提交的信息单元，只有 `BREAKING CHANGE` **必须**是大写的。
12. **可以**在类型/作用域前缀之后，`:` 之前，附加 `!` 字符，以进一步提醒注意破坏性变更。当有 `!` 前缀时，正文或脚注内**必须**包含 `BREAKING CHANGE: description`

## 4 为什么使用约定式提交

- 自动化生成 CHANGELOG。
- 基于提交的类型，自动决定语义化的版本变更。
- 向同事、公众与其他利益关系者传达变化的性质。
- 触发构建和部署流程。
- 让人们探索一个更加结构化的提交历史，以便降低对你的项目做出贡献的难度。

## 5 参考资料

1. [约定式提交](https://www.conventionalcommits.org/zh-hans/v1.0.0-beta.4/)
2. [git commit 提交规范](https://zhuanlan.zhihu.com/p/90281637)