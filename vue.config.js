// 供node.js读取，使用CommonJS规范
const { defineConfig } = require('@vue/cli-service');
const { BlogListGenerationPlugin } = require('./src/utils/BlogListGenerationPlugin');
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const path = require('path');
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    optimization: {
      minimizer: [
        new TerserWebpackPlugin({
          test: /\.js(\?.*)?$/i,    //匹配参与压缩的文件
          terserOptions: {    //Terser 压缩配置
            output: { comments: false },
            extractComments: true,    //将注释剥离到单独的文件中
            compress: {//console删除
              pure_funcs: ["console.log"]
            }
          },
        })
      ]
    }
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

