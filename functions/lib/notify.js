const functions = require('firebase-functions')
const admin = require('firebase-admin')
const fetch = require('node-fetch')
const Twilio = require('twilio')

const COINDESK_API_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json'

// Init Twilio
const client = new Twilio(
  functions.config().twilio.accountsid,
  functions.config().twilio.authtoken
)

// Init Firebase
admin.initializeApp(functions.config().firebase)
const db = admin.firestore()

/**
 * Get the current Bitcoin price
 * @return {Promise.<Number>}
 */
const getPrice = () => {
  return fetch(COINDESK_API_URL)
    .then((res) => res.json())
    .then((data) => data.bpi.USD.rate_float)
}

/**
 * Get users who want to be notified of the price
 * @param {Number} price
 * @return {Promise.<Array>}
 */
const getUsers = (price) => {
  return Promise.all([
    getHighUsers(price),
    getLowUsers(price)
  ]).then(([high, low]) => {
    return [].concat(high.docs).concat(low.docs)
  })
}

/**
 * Get users who want to be notified of a high price
 * @param {Number} price
 * @return {Promise}
 */
const getHighUsers = (price) => {
  const collection = db.collection('users')
  return collection.where('notified', '==', null).where('dir', '==', 'GT').where('price', '<=', price).get()
}

/**
 * Get users who want to be notified of a low price
 * @param {Number} price
 * @return {Promise}
 */
const getLowUsers = (price) => {
  const collection = db.collection('users')
  return collection.where('notified', '==', null).where('dir', '==', 'LT').where('price', '>=', price).get()
}

/**
 * Get a user's phone number
 * @param {DocumentSnapshot} user
 * @return {Array}
 */
const getUserPhoneNumber = (userData) => {
  const { phoneCountryCode, phoneNumber } = userData
  return [phoneCountryCode, phoneNumber].join('')
}

/**
 * Format price
 * @param {Number} price To format
 * @return {String}
 */
const formatPrice = (price) => `$${price.toFixed(2).toLocaleString()}`

/**
 *
 * @param {DocumentSnapshot} user
 * @param {String} message
 * @return {Promise.<Object>}
 */
const sendUserMessage = (user, message) => {
  const userData = user.data()
  const phoneNumber = getUserPhoneNumber(userData)
  return sendMessage(phoneNumber, message)
    .then(() => setUserNotified(user))
}

/**
 * Send an SMS
 * @param {String} to Phone number to send message to
 * @param {String} body The message to send
 * @return {Promise.<Object>}
 */
const sendMessage = (to, body) => {
  return client.messages.create({
    to,
    body,
    from: functions.config().twilio.phonenumber
  })
}

/**
 * Set notified on the user
 * @param {DocumentSnapshot} user
 * @return {Promise.<Object>}
 */
const setUserNotified = (user) => {
  return user.ref.update({
    notified: new Date()
  })
}
exports.setUserNotified = setUserNotified

/**
 * Listen to request
 */
module.exports = functions.https.onRequest((req, res) => {
  getPrice().then((price) => {
    const formattedPrice = formatPrice(price)
    console.log(`Fetched price: ${formattedPrice}`)
    const message = `Hi. Bitcoin is at ${formattedPrice}. This is a one-time notification`

    getUsers(price).then((users) => {
      console.log(`Messaging users: ${users.length}`)

      if (users.length) {
        Promise.all(users.map((user) => sendUserMessage(user, message)))
          .then(() => console.log('Messaging complete'))
      }
      res.sendStatus(200).end()
    })
  }).catch((err) => console.error(`Could not retreive price: ${err.message}`))
})
