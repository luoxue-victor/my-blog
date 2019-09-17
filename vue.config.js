const CopyPlugin = require('./copy-dist')
const { creatRouter } = require('./createRouter')

console.log(creatRouter)
module.exports = {
  publicPath: '/luoxue.github.io/',
  lintOnSave: false,
  runtimeCompiler: true,
  devServer: {
    port: 8080,
    https: true,
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
  }
}
