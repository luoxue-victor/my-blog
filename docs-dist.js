const execa = require('execa')
const fs = require('fs-extra')
const globby = require('globby')
const path = require('path')
let mdStr = ''
let readmeContent = `# 技匠
> 总结了个人的一些新技术、最佳实践、工程化、效率、工作体会等文章。欢迎star、pr，微信luoxue2479，下面是我的公众号，可以关注我【前端技匠】，随时获取最新动态哦！

![前端技匠](public/gongzhonghao.jpeg)
`;
class CopyDirWebpackPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    const opt = this.options
    compiler.plugin('done', (stats) => {
      if (process.env.NODE_ENV === 'production') {
        (async () => {
          const ps = await globby([`${opt.to}/**`, '!../vuepress-docs/package.json'])
          ps.forEach(p => {
            try {
              p && !p.includes('node_modules') && fs.removeSync(p)
            } catch (error) {
              console.error(error)
            }
          })
          const psf = await globby([`${opt.from}/**`])
          
          psf.forEach(_ => {
            const _ori = _
            _ = _.replace('src', opt.to)
            const dirpaths = _.substring(0, _.lastIndexOf('/'))
            if (_.includes('home-index.md')) return;
            if (/\.md$/.test(_) && _.includes('views')) {
              fs.mkdirpSync(dirpaths)
              fs.copySync(_ori, _)
              const mpath = _.replace('vuepress-docs/', '')
              const text = fs.readFileSync(_ori).toString()
              const name = _ori.split('/').pop().replace('.md', '')
              const content = text.match(/\>.+/)
                ? text.match(/\>.+/)[0]
                : '' 
              mdStr += `<card :title="'${name}'" :link="'${mpath}'" :content="'${content.replace('> ', '')}'" /> \n`

              readmeContent += `#### [${name}](${_ori}) \n ${content} \n\n`
            }
          })
          const mdPath = path.join(opt.to, 'guide', 'README.md')
          fs.writeFileSync(mdPath, mdStr)
          fs.writeFileSync(path.join(opt.to, 'README.md'), fs.readFileSync(path.join('src', 'views', 'home-index.md')).toString())
          fs.writeFileSync('README.md', readmeContent)
          console.log(`  生成markdown`)
        })()
      }
    })
  }
}

module.exports = CopyDirWebpackPlugin
