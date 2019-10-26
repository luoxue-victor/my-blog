import View from './myrouter-view'

import { listener, pushState } from './index'

let _Vue, _curVM, baseUrl = 'http://localhost:8080/source-code/dist/#'
export function install (Vue) {
  if (install.installed && _Vue === Vue) return
  install.installed = true

  _Vue = Vue
  _curVM = _Vue

  Vue.mixin({
    beforeCreate () {
      this._myrouterRoot = (this.$parent && this.$parent._myrouterRoot) || this
      Vue.util.defineReactive(this._myrouterRoot, '_myrouter', {})
      this._myrouterRoot._myrouter.push = function (params) {
        pushState(baseUrl + params.path)
      }
      _curVM = this
    },
    mounted () {
      listener(_curVM);
    }
  })

  Object.defineProperty(Vue.prototype, '$myrouter', {
    get () { return this._myrouterRoot._myrouter }
  })

  Vue.component('MyRouterView', View)
}