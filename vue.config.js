// 供node.js读取，使用CommonJS规范
const { defineConfig } = require('@vue/cli-service');
const { BlogListGenerationPlugin } = require('./src/utils/BlogListGenerationPlugin');
const path = require('path');

module.exports = defineConfig({
  configureWebpack: {
    // plugins: [new BlogListGenerationPlugin({ options: true })],
  },
  chainWebpack: (config) => {
    // config.module
    //   .rule('md')
    //   .test(/\.md/)
    //   .use('vue-loader')
    //   .loader('vue-loader')
    //   .end()
    //   .use('vue-markdown-loader')
    //   .loader('vue-markdown-loader/lib/markdown-compiler')
    //   .options({
    //     raw: true
    //   });
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('md-loader')
      .loader(path.resolve(__dirname, 'src/utils/md-loader.js'))
      .end()
  },
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/github': {
        target: 'https://github.com/fantasy995/fantasy995.github.io',
        ws: true,
        chageOrigin: true,
        pathRewrite: { '^/github': '' }
      }
    }
  },
  pluginOptions: {
    // 传递给插件的参数
    'style-resources-loader': {
      preProcessor: 'sass',
      patterns: []
    },
  }
})

