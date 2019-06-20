import 'babel-polyfill'
import Vue from 'vue'
import fastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import App from './App'
import router from './router'
import store from './store'

import 'common/stylus/index.styl'

fastClick.attach(document.body)

Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png'),
  error: require('common/image/default.png')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
