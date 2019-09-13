const pluginName = 'copyDirWebpackPlugin';
const fs = require('fs-extra')
const globby = require('globby')
const execa = require('execa')
class CopyDirWebpackPlugin {
  constructor(options) {
    console.log(options)
    this.options = options;
  }
  apply(compiler) {
    compiler.plugin('done', (stats) => {
      execa.shellSync('cp -r dist ../dist')
      console.log('完成')
    });
  }
}

module.exports = CopyDirWebpackPlugin