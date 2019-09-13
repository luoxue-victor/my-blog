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
      (async function() {
        execa.shellSync('cp -r dist ../dist')

        execa.shellSync('cd ../dist')
        execa.shellSync('git init')
        try {
          execa.shellSync('git remote rename origin old-origin')
        } catch (error) {
          
        }
        try {
          execa.shellSync('git remote add origin https://github.com/luoxue-victor/luoxue.github.io.git')
        } catch (error) {

        }
        execa.shellSync('git add .')
        execa.shellSync('git commit -m "fix"')
        execa.shellSync('git pull origin master --allow-unrelated-histories')
        execa.shellSync('git push origin master')

        console.log('完成')
      })()
    });
  }
}

module.exports = CopyDirWebpackPlugin