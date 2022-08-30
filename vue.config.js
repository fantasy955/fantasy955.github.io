const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'https://github.com/fantasy995/fantasy995.github.io'
  }
})  

