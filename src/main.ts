import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import './registerServiceWorker'
import './plugins/iview.js'
import 'swiper/css/swiper.css'

import Clazz from './views/performance/fmp/browser/clazz'

new Clazz();

Vue.config.productionTip = false
Vue.config.performance = true

Vue.use(VueAwesomeSwiper, /* { default global options } */)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
