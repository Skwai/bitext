import { expect } from 'chai'
import mutations from '@/store/mutations'
import * as types from '@/store/types'

import { country } from '../mocks'

describe('mutations', () => {
  describe(types.ADD_COUNTRY, () => {
    it('Adds a country object to the state', () => {
      const state = { countries: {} }
      const doc = {
        id: 'country1',
        data: () => country
      }
      mutations[types.ADD_COUNTRY](state, doc)
      expect(state.countries).to.have.own.property(doc.id)
      expect(state.countries[doc.id]).to.deep.equal(country)
    })
  })

  describe(types.SET_BTC_PRICE, () => {
    it('Adds updates the btcPrice in the store', () => {
      const state = { btcPrice: null }
      mutations[types.SET_BTC_PRICE](state, 123)
      expect(state.btcPrice).to.equal(123)
      mutations[types.SET_BTC_PRICE](state, 123.45)
      expect(state.btcPrice).to.equal(123.45)
    })
  })

  describe(types.SET_SUBMITTED, () => {
    it('Sets the submitted state in the store to true', () => {
      const state = { submitted: false }
      mutations[types.SET_SUBMITTED](state)
      expect(state.submitted).to.equal(true)
    })
  })

  describe(types.SET_UNSUBMITTED, () => {
    it('Sets the submitted state in the store to false', () => {
      const state = { submitted: true }
      mutations[types.SET_UNSUBMITTED](state)
      expect(state.submitted).to.equal(false)
    })
  })
})
