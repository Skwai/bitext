import { Mutation, MutationTree } from 'vuex'

import State from './State'
import * as types from './types'

interface IMutationState extends Mutation<State> {}

const mutations: MutationTree<State> = {
  [types.SET_BTC_PRICE]: (state, price: number) => {
    state.btcPrice = price
  },
  [types.SET_SUBMITTED](state) {
    state.submitted = true
  },

  [types.SET_UNSUBMITTED](state) {
    state.submitted = false
  },

  [types.SET_HISTORICAL_BTC_PRICES](state, prices: {}) {
    state.historicalBtcPrices = prices
  },

  [types.SET_STORED_PHONE_NUMBER](state, phoneNumber: string) {
    state.storedPhoneNumber = phoneNumber
  },

  [types.SET_STORED_COUNTRY_CODE](state, countryCode: string) {
    state.storedCountryCode = countryCode
  }
}

export default mutations
