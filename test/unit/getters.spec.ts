import { btcPrice, submitted } from '@/store/getters'
import State from '@/store/State'

describe('getters.js', () => {
  describe('btcPrice', () => {
    it('returns the bitcoin price in the store', () => {
      const state = new State({ btcPrice: 100 })
      expect(btcPrice(state)).toEqual(100)
    })
  })

  describe('submitted()', () => {
    it('Adds returns the submitted status in the store', () => {
      const state = new State({ submitted: false })
      expect(submitted(state)).toEqual(false)
      state.submitted = true
      expect(submitted(state)).toEqual(true)
    })
  })
})
