import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

// tslint:disable-next-line
new Vue({
  components: { App },
  el: '#App',
  store,
  template: '<App/>'
})
