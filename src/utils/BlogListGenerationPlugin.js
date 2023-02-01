const menu = require('../pages/blog/menu.json');
const fs = require('fs');
const npath = require('node:path');
const { readdir, stat } = require('node:fs/promises');

class BlogListGenerationPlugin {
    constructor(options) {
        this.options = options || null;
        Object.assign(this.options, {
            menu: menu,
            max_file_items: 5,
        });
    }

    // 在插件函数的 prototype 上定义一个 `apply` 方法，以 compiler 为参数。
    apply(compiler) {
        // 可以通过 compiler 对象访问webpack 模块实例，
        // 这样确保使用的是模块的正确版本
        // （不要直接 require/import webpack）
        const { webpack } = compiler;
        // Compilation 对象提供了对一些有用常量的访问。
        const { Compilation } = webpack;
        // RawSource 是其中一种 “源码”("sources") 类型，
        // 用来在 compilation 中表示资源的源码
        const { RawSource } = webpack.sources;

        // 指定一个挂载到 webpack 自身的事件钩子。
        compiler.hooks.thisCompilation.tap(
            'BlogListGenerationPlugin',
            // 通过compilation对象管理asset
            async (compilation) => {
                for (const { sname, aname, dirName, path } of this.options.menu['categories']) {
                    const content = {
                        'files': [],
                        'pages': [],
                        'totalPage': 0
                    }
                    const outputPath = `${path}/list.json`
                    let addFile = 0;
                    const files = await readdir(path.replace('./', './public/'));
                    const filesWithTime = [];
                    const fileInfo = {};
                    for (const file of files) {
                        const state = await stat(`${path.replace('./', './public/')}/${file}`);
                        filesWithTime.push({
                            'name': file,
                            'mtime': state.mtimeMs
                        });
                    }
                    filesWithTime.sort((a, b) => {
                        return b.mtime - a.mtime;
                    })
                    for (const { name, mtime } of filesWithTime) {
                        if (name.endsWith('.md')) {
                            const currentPage = Math.floor(addFile / this.options.max_file_items) + 1;
                            if (addFile % this.options.max_file_items === 0) {
                                content['totalPage'] += 1
                                content['pages'].push({
                                    'page': currentPage,
                                    'files': []
                                })
                            }
                            const mDate = new Date(Math.trunc(mtime));
                            const fileInfo = {}
                            fileInfo['name'] = name
                            fileInfo['relapath'] = `${path}/${name}`;
                            fileInfo['updatetime'] = {}
                            fileInfo['updatetime']['raw'] = Math.trunc(mtime);
                            fileInfo['updatetime']['year'] = mDate.getFullYear();
                            fileInfo['updatetime']['mon'] = mDate.getMonth()+1;
                            fileInfo['updatetime']['day'] = mDate.getDate();
                            fileInfo['updatetime']['hour'] = mDate.getHours()+1;
                            fileInfo['updatetime']['min'] = mDate.getMinutes()+1;
                            fileInfo['updatetime']['sec'] = mDate.getSeconds()+1;
                            content['pages'][currentPage - 1]['files'].push(fileInfo)
                            content['files'].push(fileInfo)
                            addFile += 1
                        }
                    }

                    compilation.emitAsset(
                        outputPath,
                        new RawSource(JSON.stringify(content))
                    );
                }

                // 向 compilation 添加新的资源，
                // 这样 webpack 就会自动生成并输出到 output 目录
            }
        )
    }
}

module.exports = { BlogListGenerationPlugin }