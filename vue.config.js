// 供node.js读取，使用CommonJS规范
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
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
    'style-resources-loader': {
      preProcessor: 'sass',
      patterns: []
    }
  }
})

