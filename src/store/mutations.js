import * as types from './types'

export default {
  [types.ADD_COUNTRY] (state, doc) {
    state.countries[doc.id] = doc.data()
  },

  [types.ADD_CURRENCY] (state, doc) {
    state.currencies[doc.id] = doc.data()
  },

  [types.SET_BTC_PRICE] (state, price) {
    state.btcPrice = price
  }
}
