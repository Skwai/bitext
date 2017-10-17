import { expect } from 'chai'
import sinon from 'sinon'
import { wasSubmitted, resetSubmitted, getBtcPrice } from '@/store/actions'
import * as price from '@/services/price'
import db from '@/services/firestore'

/* eslint-disable no-unused-expressions */
describe('actions.js', () => {
  describe('addUser()', () => {
    it('returns the bitcoin price in the store', () => {

    })
  })

  describe('wasSubmitted()', () => {
    it('sets the submitted state to true', () => {
      const context = {
        state: { submitted: false },
        commit () {
          context.state.submitted = true
        }
      }
      wasSubmitted(context)
      expect(context.state.submitted).to.be.true
    })
  })

  describe('resetSubmitted()', () => {
    it('sets the submitted state to false', () => {
      const context = {
        state: { submitted: true },
        commit () {
          context.state.submitted = false
        }
      }
      resetSubmitted(context)
      expect(context.state.submitted).to.be.false
    })
  })

  describe('getBtcPrice()', () => {
    let stub
    const fakePrice = 123.45

    beforeEach(() => {
      stub = sinon.stub(price, 'getPrice').callsFake(() => fakePrice)
    })

    it('gets the Bicoin price then adds it to the store', async () => {
      const context = {
        state: {
          btcPrice: null
        },
        commit (_, val) {
          context.btcPrice = val
        }
      }

      await getBtcPrice(context)
      expect(stub.called).to.be.true
      expect(context.btcPrice).to.equal(fakePrice)
    })
  })
})
