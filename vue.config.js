const CopyPlugin = require('./copy-dist')
const DocsPlugin = require('./docs-dist')
const { creatRouter } = require('./createRouter')
module.exports = {
  publicPath: '/luoxue.github.io/',
  lintOnSave: false,
  runtimeCompiler: true,
  devServer: {
    port: 8080,
    https: false,
    proxy: null,
    hotOnly: false,
    disableHostCheck: true
  },
  chainWebpack (config) {
    creatRouter()
    config.plugin('copy-dist')
      .use(new CopyPlugin({
        from: 'dist',
        to: '../luoxue.github.io'
      }))
    config.plugin('docs-dist')
      .use(new DocsPlugin({
        from: 'src',
        to: '../vuepress-docs'
      }))
  }
}