import 'babel-polyfill'
import Vue from 'vue'
import fastClick from 'fastclick'
import App from './App'
import router from './router'

import 'common/stylus/index.styl'

fastClick.attach(document.body)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
