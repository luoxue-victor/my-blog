import { install } from './install'
import { HashHistory } from './hash'

export default class VueRouter {
  static install;
  static version;

  constructor (options = {}) {
    this.options = options
    this.matcher = options.routes || []

  }
}

VueRouter.install = install
VueRouter.version = '__VERSION__'

if (window.Vue) {
  window.Vue.use(VueRouter)
}

function getHash () {
  let href = window.location.href
  const index = href.indexOf('#')
  // empty path
  if (index < 0) return ''

  href = href.slice(index + 1)
  
  const searchIndex = href.indexOf('?')
  if (searchIndex < 0) {
    const hashIndex = href.indexOf('#')
    if (hashIndex > -1) {
      href = decodeURI(href.slice(0, hashIndex)) + href.slice(hashIndex)
    } else href = decodeURI(href)
  } else {
    if (searchIndex > -1) {
      href = decodeURI(href.slice(0, searchIndex)) + href.slice(searchIndex)
    }
  }

  return href
}