const CopyPlugin = require('./copy-dist')
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
    config.plugin('copy-dist')
      .use(new CopyPlugin({
        from: 'dist',
        to: '../dist'
      }))
  }
}
