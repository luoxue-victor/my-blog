const Glob = require('glob')
const pify = require('pify')
const path = require('path')
const fs = require('fs')
const glob = pify(Glob)

generateRoutesAndFiles = async () => {
  const files = {};

  (await glob(`views/**/*.vue`, {
    cwd: path.resolve(process.cwd(), './src'),
    ignore: ['**/*.test.*', '**/*.spec.*', '**/-*.*']
  })).forEach((f) => {
    const key = f.replace(/\.(vue)$/, '')
    if (/\.vue$/.test(f) || !files[key]) {
      files[key] = f.replace(/('|")/g, '\\$1')
    }
  })

  return createRoutes(
    Object.values(files),
    path.resolve(process.cwd(), './src'),
    'views'
  )
}
function createRoutes (files, srcDir, pagesDir) {
  const routes = []
  const requireComponent = []
  files.forEach((file) => {
    const keys = file
      .replace(RegExp(`^${pagesDir}`), '')
      .replace(/\.(vue|js)$/, '')
      .replace(/\/{2,}/g, '/')
      .split('/')
      .slice(1)

    const route = {
      name: '',
      path: '',
      component: `views${camelCase(keys.join('').replace('_', ''))}`
    }

    requireComponent.push(`const views${camelCase(keys.join('').replace('_', ''))} = () => import('../views/${keys.join('/')}.vue')`)
    let parent = routes
    keys.forEach((key, i) => {
      const name = `${camelCase(keys.join('-').replace('_', ''))}`
      route.name = name
      route.path = '/' + name
      route.disc = name
    })
    parent.push(route)
  })
  sortRoutes(routes)
  return {
    'routes': cleanChildrenRoutes(routes),
    'requireComponent': requireComponent
  }
}

const DYNAMIC_ROUTE_REGEX = /^\/(:|\*)/

function sortRoutes (routes) {
  routes.sort((a, b) => {
    if (!a.path.length) {
      return -1
    }
    if (!b.path.length) {
      return 1
    }
    if (a.path === '/') {
      return DYNAMIC_ROUTE_REGEX.test(b.path) ? -1 : 1
    }
    if (b.path === '/') {
      return DYNAMIC_ROUTE_REGEX.test(a.path) ? 1 : -1
    }

    let i
    let res = 0
    let y = 0
    let z = 0
    const _a = a.path.split('/')
    const _b = b.path.split('/')
    for (i = 0; i < _a.length; i++) {
      if (res !== 0) {
        break
      }
      y = _a[i] === '*' ? 2 : _a[i].includes(':') ? 1 : 0
      z = _b[i] === '*' ? 2 : _b[i].includes(':') ? 1 : 0
      res = y - z
      if (i === _b.length - 1 && res === 0) {
        res = _a[i] === '*' ? -1 : (
          _a.length === _b.length ? a.path.localeCompare(b.path) : (_a.length - _b.length)
        )
      }
    }

    if (res === 0) {
      res = _a[i - 1] === '*' && _b[i] ? 1 : (
        _a.length === _b.length ? a.path.localeCompare(b.path) : (_a.length - _b.length)
      )
    }
    return res
  })

  routes.forEach((route) => {
    if (route.children) {
      sortRoutes(route.children)
    }
  })
  return routes
}

function cleanChildrenRoutes (routes, isChild = false) {
  let start = -1
  const routesIndex = []
  routes.forEach((route) => {
    if (/-index$/.test(route.name) || route.name === 'index') {
      const res = route.name.split('-')
      const s = res.indexOf('index')
      start = start === -1 || s < start ? s : start
      routesIndex.push(res)
    }
  })
  routes.forEach((route) => {
    route.path = isChild ? route.path.replace('/', '') : route.path
    if (route.path.includes('?')) {
      const names = route.name.split('-')
      const paths = route.path.split('/')
      if (!isChild) {
        paths.shift()
      }
      routesIndex.forEach((r) => {
        const i = r.indexOf('index') - start
        if (i < paths.length) {
          for (let a = 0; a <= i; a++) {
            if (a === i) {
              paths[a] = paths[a].replace('?', '')
            }
            if (a < i && names[a] !== r[a]) {
              break
            }
          }
        }
      })
      route.path = (isChild ? '' : '/') + paths.join('/')
    }
    route.name = route.name.replace(/-index$/, '')
    if (route.children) {
      if (route.children.find(child => child.path === '')) {
        delete route.name
      }
      route.children = cleanChildrenRoutes(route.children, true)
    }
  })
  return routes
}

function camelCase (string) {
  return string.replace(/-([a-z])/g, function (all, letter) {
    return letter.toUpperCase()
  })
}
module.exports.creatRouter = (flag = false) => {
  if (flag) return
  generateRoutesAndFiles().then(res => {
    let string = `/* eslint-disable */\n`
    res.requireComponent.forEach(res => {
      string += `${res}\n`
    })
    string += `export const routes = ${JSON.stringify(res.routes, null, 2)}`
      .replace(/"component": "(\w+?)"/g, `"component": $1`)
      .replace(/"(\w+?)":/g, '$1:')
    fs.mkdir(path.resolve(process.cwd(), './src/router'), err => {
      if (err) {
        console.log('router文件已存在')
      }
    })
    fs.writeFile(path.resolve(process.cwd(), './src/router/route.ts'), string, (file) => {
      console.log('router文件写入完毕')
    })
  })
}
