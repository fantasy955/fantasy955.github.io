# 1.创建项目

可以选用不同的脚手架创建项目，但是创建的项目一般是面向前端应用的，我们需要重新组织目录，这也意味着我们要修改脚手架的配置文件。

（也许存在为组件库开发的项目创建命令，待发现...）

目标：初始化项目结构，配置代码规范（eslint，prettier，stylelint），添加typescript支持

## 1.1 初始化项目结构

```
mkdir fanasy-ui-react
cd fantasy-ui-react
npm init --y 
mkdir components && mkdir styles && cd components && touch index.ts
```

## 1.2 代码规范

### 1.2.1 前置准备

```
npm i @umijs/fabric --dev
npm i prettier --dev # 因为@umijs/fabric没有将prettier作为依赖 所以我们需要手动安装

npm i lint-staged -D   # 本地暂存代码检查工具
npm i husky  # 操作 git 钩子的工具
```

**lint 工具简史**

> 在计算机科学中，lint是一种工具的名称，它用来标记代码中，某些可疑的、不具结构性（可能造成bug）的语句。它是一种静态程序分析工具，最早适用于C语言，在UNIX平台上开发出来。后来它成为通用术语，可用于描述在任何一种编程语言中，用来标记代码中有疑义语句的工具。    -- by wikipedia

![image](assets/16c372c1318fdfd7tplv-t2oaga2asx-zoom-in-crop-mark4536000.webp)

### 1.2.2  代码检查

**.eslintrc.js**

```
module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
};
```

### 1.2.3 代码风格

**.prettierrc.js**

```
const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.prettier,
};
```

### 1.2.4 css代码规范

**.stylelintrc.js**

```
module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/stylelint')],
};
```

### 1.2.5 提交检查

**package.json**配置：文件控制检查和操作方式（取代`.lintstagedrc.json`）：

`lint-staged`: 代码暂存检查；

```
"lint-staged": {
  "components/**/*.ts?(x)": [
    "prettier --write",
    "eslint --fix",
    "git add"  # 不需要添加这条了，https://github.com/okonet/lint-staged/issues/775
  ],
  "src/**/*.less": [
    "stylelint --syntax less --fix",
    "git add"
  ]
},
"styles": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
}
```

使用`lint-staged`进行暂存区代码检查：

`package.json`

```
"scripts": {
	// others
	"pre-commit": "lint-staged",
	// others
}
```

```shell
git add components/*
npm run pre-commit
```

**Commit message 检测**

**安装辅助提交依赖**

```
npm i @commitlint/cli @commitlint/config-conventional commitizen cz-conventional-changelog --dev
```

新增`.commitlintrc.js`，写入：

```
module.exports = { extends: ['@commitlint/config-conventional'] };
```

**安装指令和命令行的展示信息**

```
npm set-script commit "git-cz" # package.json 中添加 commit 指令, 执行 `git-cz` 指令
```

`pacakage.json`：

```
"scripts": {
	// others
	"commit": "git-cz",
	// others
}
```

## 1.3 TypeScript

```
npm i  typescript --save-dev
```

新建`tsconfig.json`并写入以下内容

```
{
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
            "@/fantasyui/*": [
                "components/*"
            ],
            "@/styles/*": [
                "styles/*"
            ],
            "fantasyui": [
                "components/index.ts"
            ],
            "fantasyui/es/*": [
                "components/*"
            ],
            "fantasyui/lib/*": [
                "components/*"
            ],
            "fantasyui/locale/*": [
                "components/locale/*"
            ]
        },
        "resolveJsonModule": true,
        "strictNullChecks": true,
        "declarationDir": "lib",
        "module": "commonjs",
        "target": "es6",
        "moduleResolution": "node",
        "esModuleInterop": true,
        "experimentalDecorators": true,
        "jsx": "react",
        "jsxFactory": "React.createElement",
        "jsxFragmentFactory": "React.Fragment",
        "noUnusedParameters": true,
        "noUnusedLocals": true,
        "noImplicitAny": true,
        "lib": [
            "dom",
            "es2017"
        ],
        "skipLibCheck": true,
        "stripInternal": true,
        "outDir": "dist", // 生成目录
        "declaration": true,
        "allowSyntheticDefaultImports": true
    },
    "exclude": [
        "node_modules",
        "lib",
        "es"
    ]
}
```

`paths`属性配置别名，我们编程中可以使用别名导入项目中的模块。

## 1.4 总结

完成上述操作后，我们生成了一个标准的react ui组件库开发项目，能够进行代码检查，风格检查，git提交检查，规范生成commit message，**我们可以开始编码工作，但不能进行构建**。

## 1.5 参考资料

- [深入理解 ESlint - 掘金 (juejin.cn)](https://juejin.cn/post/6844903901292920846)

- [Eslint + Prettier + Husky + Commitlint+ Lint-staged 规范前端工程代码规范 - 掘金 (juejin.cn)](https://juejin.cn/post/7038143752036155428)

  包含如何自定义commit message

- [Home | Stylelint 中文文档 (bootcss.com)](https://stylelint.bootcss.com/)

- [什么是npx？ - 掘金 (juejin.cn)](https://juejin.cn/post/7142666525365764104)

- [TypeScript Compiler Configuration - tsconfig.json (howtodoinjava.com)](https://howtodoinjava.com/typescript/tsconfig-json/)

# 2. 编写一个示例组件

在目录`compoents`下创建各种组件，每个组件单独创建一个目录：

![image-20230107130454569](assets/image-20230107130454569.png)

## 2.1 创建alert组件

创建`alert`目录，并创建`index.tsx`文件进行组件定义：

```tsx
import React from 'react';
import t from 'prop-types';
// https://react.docschina.org/docs/typechecking-with-proptypes.html

export type AlertProps = {
    kind?: 'info' | 'positive' | 'negative' | 'warning';
} & React.HTMLAttributes<any>

export type KindMap = Record<Required<AlertProps>['kind'], string>;

const prefixCls = 'fantasy-alert';

const kinds: KindMap = {
    info: '#5352ED',
    positive: '#2ED573',
    negative: '#FF4757',
    warning: '#FFA502',
};

const Alert: React.FC<AlertProps> = ({ children, kind = 'info', ...rest }) => (
    <div
        className={prefixCls}
        style={{
            background: kinds[kind],
        }}
        {...rest}
    >
        {children}
    </div>
);

// props类型检查
Alert.propTypes = {
    kind: t.oneOf(['info', 'positive', 'negative', 'warning']),
};

export default Alert;
```

## 2.2 组件导出

在`components/index.ts`文件内进行所有组件的导出：

```
export { default as Alert } from './alert';
```



# 2. 单元测试

## 2.1 安装依赖

```shell
npm i jest ts-jest @testing-library/react @testing-library/jest-dom identity-obj-proxy @types/jest @types/testing-library__react --dev
```

- [jest](https://jestjs.io/): JavaScript 测试框架，专注于简洁明快；
- [ts-jest](https://github.com/kulshekhar/ts-jest)：为`TypeScript`编写`jest`测试用例提供支持；
- [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro)：简单而完整的`React DOM`测试工具，鼓励良好的测试实践；
- [@testing-library/jest-dom](https://testing-library.com/docs/ecosystem-jest-dom)：自定义的`jest`匹配器(`matchers`)，用于测试`DOM`的状态（即为`jest`的`except`方法返回值增加更多专注于`DOM`的`matchers`）；
- [identity-obj-proxy](https://www.npmjs.com/package/identity-obj-proxy)：一个工具库，此处用来`mock`样式文件。

jest配置：https://jestjs.io/docs/configuration

# 3. 标准发布流程

标准流程包括：

1. 版本更新
2. 生成 CHANGELOG
3. 推送至 git 仓库
4. 组件库打包
5. 发布至 npm
6. 打 tag 并推送至 git

**package.json**

```
"scripts": {
+ "release": "ts-node ./scripts/release.ts"
},
```

```
/* eslint-disable  import/no-extraneous-dependencies,@typescript-eslint/camelcase, no-console */
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import util from 'util';
import chalk from 'chalk';
import semverInc from 'semver/functions/inc';
import { ReleaseType } from 'semver';

import pkg from '../package.json';

const exec = util.promisify(child_process.exec);

const run = async (command: string) => {
  console.log(chalk.green(command));
  await exec(command);
};

const currentVersion = pkg.version;

const getNextVersions = (): { [key in ReleaseType]: string | null } => ({
  major: semverInc(currentVersion, 'major'),
  minor: semverInc(currentVersion, 'minor'),
  patch: semverInc(currentVersion, 'patch'),
  premajor: semverInc(currentVersion, 'premajor'),
  preminor: semverInc(currentVersion, 'preminor'),
  prepatch: semverInc(currentVersion, 'prepatch'),
  prerelease: semverInc(currentVersion, 'prerelease'),
});

const timeLog = (logInfo: string, type: 'start' | 'end') => {
  let info = '';
  if (type === 'start') {
    info = `=> 开始任务：${logInfo}`;
  } else {
    info = `✨ 结束任务：${logInfo}`;
  }
  const nowDate = new Date();
  console.log(
    `[${nowDate.toLocaleString()}.${nowDate.getMilliseconds().toString().padStart(3, '0')}] ${info}
    `,
  );
};

/**
 * 询问获取下一次版本号
 */
async function prompt(): Promise<string> {
  const nextVersions = getNextVersions();
  const { nextVersion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'nextVersion',
      message: `请选择将要发布的版本 (当前版本 ${currentVersion})`,
      choices: (Object.keys(nextVersions) as Array<ReleaseType>).map((level) => ({
        name: `${level} => ${nextVersions[level]}`,
        value: nextVersions[level],
      })),
    },
  ]);
  return nextVersion;
}

/**
 * 更新版本号
 * @param nextVersion 新版本号
 */
async function updateVersion(nextVersion: string) {
  pkg.version = nextVersion;
  timeLog('修改package.json版本号', 'start');
  await fs.writeFileSync(path.resolve(__dirname, './../package.json'), JSON.stringify(pkg));
  await run('npx prettier package.json --write');
  timeLog('修改package.json版本号', 'end');
}

/**
 * 生成CHANGELOG
 */
async function generateChangelog() {
  timeLog('生成CHANGELOG.md', 'start');
  await run(' npx conventional-changelog -p angular -i CHANGELOG.md -s -r 0');
  timeLog('生成CHANGELOG.md', 'end');
}

/**
 * 将代码提交至git
 */
async function push(nextVersion: string) {
  timeLog('推送代码至git仓库', 'start');
  await run('git add package.json CHANGELOG.md');
  await run(`git commit -m "v${nextVersion}" -n`);
  await run('git push');
  timeLog('推送代码至git仓库', 'end');
}

/**
 * 组件库打包
 */
async function build() {
  timeLog('组件库打包', 'start');
  await run('npm run build');
  timeLog('组件库打包', 'end');
}

/**
 * 发布至npm
 */
async function publish() {
  timeLog('发布组件库', 'start');
  await run('npm publish');
  timeLog('发布组件库', 'end');
}

/**
 * 打tag提交至git
 */
async function tag(nextVersion: string) {
  timeLog('打tag并推送至git', 'start');
  await run(`git tag v${nextVersion}`);
  await run(`git push origin tag v${nextVersion}`);
  timeLog('打tag并推送至git', 'end');
}

async function main() {
  try {
    const nextVersion = await prompt();
    const startTime = Date.now();
    // =================== 更新版本号 ===================
    await updateVersion(nextVersion);
    // =================== 更新changelog ===================
    await generateChangelog();
    // =================== 代码推送git仓库 ===================
    await push(nextVersion);
    // =================== 组件库打包 ===================
    await build();
    // =================== 发布至npm ===================
    await publish();
    // =================== 打tag并推送至git ===================
    await tag(nextVersion);
    console.log(`✨ 发布流程结束 共耗时${((Date.now() - startTime) / 1000).toFixed(3)}s`);
  } catch (error) {
    console.log('💣 发布失败，失败原因：', error);
  }
}

main();
```

## 其他

每次初始化一个组件就要新建许多文件（夹），复制粘贴也可，不过还可以使用更高级一点的偷懒方式。

思路如下：

1. 创建组件模板，预留动态信息插槽（组件名称，组件描述等等）；
2. 基于`inquirer.js`询问动态信息；
3. 将信息插入模板，渲染至`components`文件夹下；
4. 向 components/index.ts 插入导出语句。

我们只需要配置好模板以及问题，至于询问以及渲染就交给[plop.js](https://plopjs.com/)吧。

```
yarn add plop --dev
```

新增脚本命令。

**package.json**

```
"scripts": {
+ "new": "plop --plopfile ./scripts/plopfile.ts",
},
```

新增配置文件以及组件模板，详情可见：

- 配置文件：[scripts/plopfile.ts](https://github.com/worldzhao/react-ui-library-tutorial/blob/master/scripts/plopfile.ts)
- 模板文件：[templates/component](https://github.com/worldzhao/react-ui-library-tutorial/tree/master/templates/component)

# 4. 配置Github pages

## 4.1 build

添加Action:

```
name: github pages

on:
  push:
    branches:
      - master # default branch

jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run build:site
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./doc-site

```

关键的命令：

`peaceiris/actions-gh-pages@v3`: [GitHub Pages action · Actions · GitHub Marketplace](https://github.com/marketplace/actions/github-pages-action)

这个命令将会把输出的目录发布到指定的分支：`gh-pages`

## 4.2 部署

![image-20230104172515904](assets/image-20230104172515904.png)

# 参考资料

[如何快速构建React组件库 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/196758730)

# 构建工具对比

[webpack、rollup、gulp对比 - 简书 (jianshu.com)](https://www.jianshu.com/p/cea946fa3c58)