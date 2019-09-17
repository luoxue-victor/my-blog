import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './router/route'

Vue.use(Router)

const r = [
  { path: '/', redirect: '/Home' },
  ...routes
]

export default new Router({
  routes: r
})
