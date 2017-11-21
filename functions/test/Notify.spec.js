const expect = require('chai').expect
const Notify = require('../notify/Notify')
const config = require('../.runtimeconfig.json')

const user = {
  ref: {
    update () {
      return user
    }
  },

  data () {
    return {

    }
  }
}

const db = {
  collection () {
    return {
      where () {
        return db.collection()
      },
      get () {
        return [
          user,
          user,
          user
        ]
      }
    }
  }
}

describe('Notify', () => {
  describe('#createTwilioClient()', () => {
    it('should create a Twilio client instance if correct parameters are given', () => {
      expect(Notify.createTwilioClient(config.twilio.accountsid, config.twilio.authtoken))
        .to.be.an.instanceof(Object)
    })

    it('should return an error if invalid parameters are given', () => {
      expect(() => Notify.createTwilioClient('foo', 'bar'))
        .to.throw(Error)
    })
  })
})
