import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from '@/store/actions'
import * as getters from '@/store/getters'
import mutations from '@/store/mutations'
import config from '@/config'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state: {
    countries: {},
    btcPrice: null,
    submitted: false,
    historicalBtcPrices: {},
    storedPhoneNumber: localStorage.getItem(config.STORAGE_PHONE_NUMBER) || null,
    storedCountryCode: localStorage.getItem(config.STORAGE_COUNTRY_CODE) || null

  },
  strict: debug
})
