import * as types from './types'

export default {
  [types.SET_BTC_PRICE] (state, price) {
    state.btcPrice = price
  },

  [types.SET_SUBMITTED] (state) {
    state.submitted = true
  },

  [types.SET_UNSUBMITTED] (state) {
    state.submitted = false
  },

  [types.SET_HISTORICAL_BTC_PRICES] (state, prices) {
    state.historicalBtcPrices = prices
  }
}
