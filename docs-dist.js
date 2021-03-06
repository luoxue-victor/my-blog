const fs = require('fs-extra')
const globby = require('globby')
const path = require('path')
const chalk = require('chalk')
const tagMap = require('./config/tag.map.config')()

let mdStr = ''
const mdStore = []
let readmeContent = `
`

class CopyDirWebpackPlugin {
  constructor (options) {
    this.options = options
  }
  apply (compiler) {
    const opt = this.options
    compiler.plugin('done', (stats) => done(opt))
  }
}

function done (opt) {
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
      psf.forEach(_ => ganerator(_, opt))
      const mdPath = path.join(opt.to, 'guide', 'README.md')
      fs.writeFileSync(mdPath, mdStr)
      fs.writeFileSync(path.join(opt.to, 'README.md'), fs.readFileSync(path.join('src', 'views', 'home-index.md')).toString())
      fs.writeFileSync('README.md', createMd(readmeContent, mdStore))
      require('./issue2doc')
    })()
  }
}

function ganerator (_, opt) {
  const _ori = _
  _ = _.replace('src', opt.to)
  const dirpaths = _.substring(0, _.lastIndexOf('/'))
  if (_.includes('home-index.md')) return
  if (/\.(png|jpg|jpeg|gif)$/.test(_) && _.includes('views')) {
    fs.mkdirpSync(dirpaths)
    fs.copySync(_ori, _)
  }
  filterMd(dirpaths, _ori, _)
}

function filterMd (dirpaths, _ori, _) {
  if (/\.md$/.test(_) && _.includes('views')) {
    fs.mkdirpSync(dirpaths)
    fs.copySync(_ori, _)
    const mpath = _.replace('vuepress-docs/', '')
    const text = fs.readFileSync(_ori).toString()
    const name = _ori.split('/').pop().replace('.md', '')
    const tag = _ori.split('/')[2]
    const content = text.match(/\>.+/)
      ? text.match(/\>.+/)[0]
      : ''
    mdStr += `<card :title="'${name}'" :link="'${mpath}'" :content="'${content.replace('> ', '')}'" /> \n`
    const title = `[${name}](${_ori}) \n` // ${content} \n\n
    pushMdStore(tag, title, content)
  }
}

function pushMdStore (tag, title, content) {
  if (tag !== '推荐语.md') {
    mdStore.push({
      tag: tag,
      title: title,
      content: content
    })
  }
}

function createMd (doc, mdStore) {
  const s = {}
  mdStore.forEach(_ => {
    if (s[_.tag]) {
      s[_.tag].push(_)
    } else {
      s[_.tag] = [_]
    }
  })

  tagMap.sortByLevel.forEach(_ => {
    const config = tagMap.config
    const name = config[_] ? config[_].name : _
    doc += `\n### ${name} \n\n`
    s[_] && s[_].forEach(__ => {
      doc += `- ${__.title}`
    })
  })

  return doc
}

module.exports = CopyDirWebpackPlugin
