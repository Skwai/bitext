import { expect } from 'chai'
import { formatPrice } from '../check-price'

describe('checkPrice', () => {
  describe('formatPrice()', () => {
    it('correctly formats price', () => {
      const tests = {
        '1.00': 1,
        '12.00': 12,
        '123.00': 123,
        '1,234.00': 1234,
        '1,234.56': 1234.56,
        '12,345.67': 12345.67,
        '123,456.78': 123456.78,
        '1,234,567.89': 1234567.89
      }
      Object.keys(tests).forEach((k) => {
        expect(formatPrice(tests[k])).to.equal(k)
      })
    })
  })
})
