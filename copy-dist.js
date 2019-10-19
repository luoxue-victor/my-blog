const execa = require('execa')
const fs = require('fs-extra')
const globby = require('globby')
class CopyDirWebpackPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    const opt = this.options
    compiler.plugin('done', (stats) => {
      if (process.env.NODE_ENV === 'production') {
        (async ()=>{
          const ps = await globby([`${opt.to}/**`, '!.git/**'])
          
          ps.forEach(p => fs.removeSync(p))
          const psf = await globby([`${opt.from}/**`])
          psf.forEach(_ => {
            const _ori = _
            _ = _.replace('dist', opt.to)
            const dirpaths = _.substring(0, _.lastIndexOf('/'))
            fs.mkdirpSync(dirpaths)
            fs.copySync(_ori, _)
          })
          console.log(`  完成copy ${opt.from} to ${opt.to}`)
        })()
      }
    });
  }
}

module.exports = CopyDirWebpackPlugin