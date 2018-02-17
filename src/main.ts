import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

// tslint:disable-next-line
new Vue({
  store,
  components: { App },
  render: (h) => h(App)
}).$mount('#App')
