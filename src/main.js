import 'babel-polyfill'
import 'whatwg-fetch'

import Vue from 'vue'
import App from '@/App'

import store from '@/store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#App',
  store,
  template: '<App/>',
  components: { App }
})
