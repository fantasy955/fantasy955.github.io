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
  }
})

