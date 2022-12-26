// 供node.js读取，使用CommonJS规范
const { defineConfig } = require('@vue/cli-service');
const { BlogListGenerationPlugin } = require('./src/utils/BlogListGenerationPlugin');
module.exports = defineConfig({
  configureWebpack: {
    // plugins: [new BlogListGenerationPlugin({ options: true })],
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

