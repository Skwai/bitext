import { expect } from 'chai'
import { btcPrice, submitted } from '@/store/getters'

describe('getters.js', () => {
  describe('btcPrice', () => {
    it('returns the bitcoin price in the store', () => {
      expect(btcPrice({ btcPrice: 100 })).to.equal(100)
    })
  })

  describe('submitted()', () => {
    it('Adds returns the submitted status in the store', () => {
      expect(submitted({ submitted: false })).to.equal(false)
      expect(submitted({ submitted: true })).to.equal(true)
    })
  })
})
