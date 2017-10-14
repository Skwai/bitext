import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from '@/store/getters'
import mutations from '@/store/mutations'

export const country = {
  abbreviation: 'AU',
  name: 'Australia',
  phoneCountryCode: '+61'
}

export const store = (state = {}) => {
  Vue.use(Vuex)

  return new Vuex.Store({
    actions: {
      addUser: () => Promise.resolve,
      getBtcPrice: () => Promise.resolve,
      getCountries: () => Promise.resolve
    },
    getters,
    mutations,
    state: Object.assign({
      countries: { country1: country },
      btcPrice: 100,
      submitted: false
    }, state),
    strict: false
  })
}
