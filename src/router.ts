import Vue from 'vue'
import Router from 'vue-router'
const p = 'route'
let aa: any = []

console.log(aa)

Vue.use(Router)

const context = require.context('./router', true, /\/[\w]+\.(js|ts)/)
let routes = []

context.keys().reverse().forEach((_, i) => {
  const path = _.replace('./', '')
  const arr = require('./router/' +  path).routes
  routes.push(...arr)
})

export default new Router({
  routes: [
    { path: '/', redirect: '/Home' },
    ...routes
  ]
})
