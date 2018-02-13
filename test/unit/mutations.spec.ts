import mutations from '@/store/mutations'
import * as types from '@/store/types'
import State from '@/store/State'

describe('mutations.js', () => {
  describe(types.SET_BTC_PRICE, () => {
    it('Adds updates the btcPrice in the store', () => {
      const state = new State({ btcPrice: null })
      mutations[types.SET_BTC_PRICE](state, 123)
      expect(state.btcPrice).toEqual(123)
      mutations[types.SET_BTC_PRICE](state, 123.45)
      expect(state.btcPrice).toEqual(123.45)
    })
  })

  describe(types.SET_SUBMITTED, () => {
    it('Sets the submitted state in the store to true', () => {
      const state = new State({ submitted: false })
      mutations[types.SET_SUBMITTED](state, null)
      expect(state.submitted).toEqual(true)
    })
  })

  describe(types.SET_UNSUBMITTED, () => {
    it('Sets the submitted state in the store to false', () => {
      const state = new State({ submitted: true })
      mutations[types.SET_UNSUBMITTED](state, null)
      expect(state.submitted).toEqual(false)
    })
  })
})
