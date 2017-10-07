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
 * Get the current Bitcoin price
 * @return {Promise.<Number>}
 */
const getPrice = () => {
  return fetch(config.COINDESK.url)
    .then((res) => res.json())
    .then((data) => data.bpi.USD.rate_float)
}

/**
 * Get users who want to be notified of the price
 * @return {Number} price
 * @return {Promise.<Array>}
 */
const getUsers = (price) => {
  const ref = db.collection('users')
  return Promise.all([
    ref.where('high', '<=', price).get(),
    ref.where('low', '>=', price).get()
  ]).then(([high, low]) => {
    high.docs.concat(low.docs)
  })
}

/**
 * Get users phone numbers
 * @param {Array} users
 * @return {Array}
 */
const getUsersPhoneNumbers = (users) => {
  const phoneNumbers = users.map(getUserPhoneNumber)
  return [...new Set(phoneNumbers)]
}

/**
 * Get a single user's phone number
 * @param {Document} user
 * @return {Array}
 */
const getUserPhoneNumber = (user) => {
  const { phoneCountryCode, phoneNumber } = user.data()
  return [phoneCountryCode, phoneNumber].join('')
}

/**
 * Send an SMS
 * @param {String} to Phone number to send message to
 * @param {String} body The message to send
 */
const sendMessage = (to, body) => {
  return client.messages.create({
    to,
    body,
    from: config.TWILIO.phoneNumber
  })
}

/**
 * Format price
 * @param {Number} price To format
 * @return {String}
 */
const formatPrice = (price) => `$${price.toFixed(2).toLocaleString()}`

module.exports = functions.https.onRequest((req, res) => {
  getPrice().then((price) => {
    const formattedPrice = formatPrice(price)
    console.log(`Fetched price: ${formattedPrice}`)
    const message = `Hi. Bitcoin is at ${formattedPrice}`
    getUsers(price).then((users) => {
      if (users.length) {
        const phoneNumbers = getUsersPhoneNumbers(users)
        console.log(`Messaging total users: ${phoneNumbers.length}`)
        phoneNumbers.forEach((phoneNumber) => sendMessage(phoneNumber, message))
        res.sendStatus(200)
      }
    })
  }).catch((err) => console.error(`Could not retreive price: ${err.message}`))
})
