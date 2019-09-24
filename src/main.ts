import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import './registerServiceWorker'
import './plugins/iview.js'
import 'swiper/css/swiper.css'
import Clazz from './views/performance/fmp/browser/clazz'

Vue.config.productionTip = false
Vue.config.performance = true
window.eventHub = new Vue();

Vue.use(VueAwesomeSwiper, /* { default global options } */)
new Clazz();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
