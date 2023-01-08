const hljs = require('highlight.js')
const cheerio = require('cheerio')
const md = require('markdown-it')()
const mdContainer = require('markdown-it-container')

module.exports = function (source) {
    this.cacheable();
    md.set({
        linkify: true, // 将类似 URL 的文本自动转换为链接。
        html: false, // Enable HTML tags in source
        // 代码高亮
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return (
                        '<pre class="hljs"><code>' +
                        hljs.highlight(lang, str, true).value +
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

    const $ = cheerio.load(html, {
        decodeEntities: false,
        lowerCaseAttributeNames: false,
        lowerCaseTags: false
    })

    const style = $.html('style')

    $('style').remove()

    const temp = $.html()

    const template = (
        `<template>
          <div class="markdown-body editormd-html-preview">
            ${html}
          </div>
        </template>
        ${style}`
    )

    return template
}