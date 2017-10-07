const functions = require('firebase-functions')
const admin = require('firebase-admin')
const fetch = require('node-fetch')
const Twilio = require('twilio')
const config = require('./config')

// Init Twilio
const client = new Twilio(config.TWILIO.accountSID, config.TWILIO.authToken)

// Init Firebase
admin.initializeApp(functions.config().firebase)
const db = admin.firestore()

/**
 * @return {Promise.<Number>}
 */
const getPrice = () => {
  return fetch(config.COINDESK.url)
    .then((res) => res.json())
    .then((data) => data.bpi.USD.rate_float)
}

/**
 * @return {Number} price
 * @return {Promise.<Array>}
 */
const getUsers = (price) => {
  return Promise.all([
    db.collection('users').where('high', '<=', price).get(),
    db.collection('users').where('low', '>=', price).get()
  ]).then(([high, low]) => {
    const users = []
    if (!high.empty) {
      users.concat(high.docs)
    }
    if (!low.empty) {
      users.concat(low.docs)
    }
  })
}

/**
 *
 * @param {Array} users
 * @return {Array}
 */
const getPhoneNumbers = (users) => {
  return users.map((user) => user.data())
    .map(({ phoneNumber, phoneCountryCode }) => [phoneNumber, phoneCountryCode].join(''))
}

/**
 * @param {String} to Phone number to send message to
 * @param {String} body The message to send
 */
const sendMessage = (to, body) => {
  client.messages.create({
    to,
    body,
    from: config.TWILIO.phoneNumber
  })
}

module.exports = functions.https.onRequest((request, response) => {
  getPrice().then((price) => {
    console.log(`Fetched price: $${price}`)
    const message = `Hi. Bitcoin is now ${price}`
    getUsers(price).then((users) => {
      getPhoneNumbers(users).then((phoneNumbers) => {
        phoneNumbers.forEach((phoneNumber) => sendMessage(phoneNumber, message))
      })
    })
  }).catch((err) => console.error(err.message))
})
