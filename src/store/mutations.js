import * as types from './types'

export default {
  [types.ADD_COUNTRY] (state, doc) {
    state.countries[doc.id] = doc.data()
  },

  [types.ADD_CURRENCY] (state, doc) {
    this.currencies[doc.id] = doc.data()
  }
}
