// const hljs = require('highlight.js')
// const cheerio = require('cheerio')
// const md = require('markdown-it')()
// const mdContainer = require('markdown-it-container')
// const compileSFC = require('@vue/compiler-sfc');
// const compileDOM = require('@vue/compiler-dom')
import hljs from 'highlight.js';
import { load } from 'cheerio';
import MarkdownIt from 'markdown-it';
import mdContainer from 'markdown-it-container';
import compileSFC from '@vue/compiler-sfc';
import compileDOM from '@vue/compiler-dom';
// import 'highlight.js/styles/github.css';
const fileRegex = /\.(md)$/
const md = new MarkdownIt();

export default function () {
    return {
        name: 'md-loader',
        transform(source, id) {
            if (fileRegex.test(id)) {
                md.set({
                    linkify: true, // 将类似 URL 的文本自动转换为链接。
                    html: false, // Enable HTML tags in source
                    typographer: true,  //启用一些语言中立的替换 + 引号美化
                    // 代码高亮
                    highlight: function (str, lang) {
                        lang = lang || 'shell';
                        if (lang && hljs.getLanguage(lang)) {
                            try {
                                return (
                                    '<pre class="hljs"><code>' +
                                    hljs.highlight(strl, { lang }).value +
                                    '</code></pre>'
                                )
                            } catch (__) { }
                        }

                        return (
                            '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
                        )
                    }
                })

                // 自定义容器，:::tip 会转换为 <div class="tip">
                md.use(mdContainer, 'tip')
                md.use(mdContainer, 'warning')

                const html = md.render(source)

                const $ = load(html, {
                    decodeEntities: false,
                    lowerCaseAttributeNames: false,
                    lowerCaseTags: false
                })

                const style = $.html('style')

                $('style').remove()

                const temp = $.html()

                const template =
                    `<template>
                      <div class="markdown-body editormd-html-preview">
                        ${html}
                      </div>
                    </template>
                    ${style}`
                const ret = compileSFC.parse(template)
                const code = compileDOM.compile(ret.descriptor.template.content, { mode: 'module' }).code;
                const render = `${code};
                let __script = {};
                __script.render = render;
                  export default __script;`

                return {
                    code: render,
                    map: null
                }
            }
        },
    }
}