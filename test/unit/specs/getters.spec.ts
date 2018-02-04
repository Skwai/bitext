import { btcPrice, submitted } from '../../../src/store/getters'

describe('getters.js', () => {
  describe('btcPrice', () => {
    it('returns the bitcoin price in the store', () => {
      expect(btcPrice({ btcPrice: 100 })).toEqual(100)
    })
  })

  describe('submitted()', () => {
    it('Adds returns the submitted status in the store', () => {
      expect(submitted({ submitted: false })).toEqual(false)
      expect(submitted({ submitted: true })).toEqual(true)
    })
  })
})
