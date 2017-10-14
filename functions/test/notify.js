import sinon from 'sinon'

// https://firebase.google.com/docs/functions/unit-testing
let checkPrice, configStub, adminInitStub, functions, admin, twilioStub, Twilio

before(() => {
  // Since index.js makes calls to functions.config and admin.initializeApp at the top of the file,
  // we need to stub both of these functions before requiring index.js. This is because the
  // functions will be executed as a part of the require process.
  // Here we stub admin.initializeApp to be a dummy function that doesn't do anything.
  admin = require('firebase-admin')
  adminInitStub = sinon.stub(admin, 'initializeApp')
  // Next we stub functions.config(). Normally config values are loaded from Cloud Runtime Config
  // here we'll just provide some fake values for firebase.databaseURL and firebase.storageBucket
  // so that an error is not thrown during admin.initializeApp's parameter check
  functions = require('firebase-functions')
  configStub = sinon.stub(functions, 'config').returns({
    firebase: {
      databaseURL: 'https://not-a-project.firebaseio.com',
      storageBucket: 'not-a-project.appspot.com'
    },
    twilio: {
      accountSid: 'test',
      authtoken: 'test',
      phonenumber: '123456'
    }
  })
  checkPrice = require('../lib/check-price')
})

describe('checkPrice', () => {
  it('should response to a https request', () => {
    const req = {}
    const res = {
      sendStatus () {},
      end () {}
    }
    checkPrice(req, res)
  })
})

after(() => {
  // Restoring our stubs to the original methods.
  configStub.restore()
  adminInitStub.restore()
})
