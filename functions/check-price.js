const functions = require('firebase-functions')
const admin = require('firebase-admin')
const fetch = require('node-fetch')
const Twilio = require('twilio')

// Init Twilio
const client = new Twilio(
  functions.config().TWILIO.accountSID,
  functions.config().TWILIO.authToken
)

// Init Firebase
admin.initializeApp(functions.config().firebase)
const db = admin.firestore()

/**
 * Get the current Bitcoin price
 * @return {Promise.<Number>}
 */
const getPrice = () => {
  return fetch(functions.config().COINDESK.url)
    .then((res) => res.json())
    .then((data) => data.bpi.USD.rate_float)
}
exports.getPrice = getPrice

/**
 * Get users who want to be notified of the price
 * @return {Number} price
 * @return {Promise.<Array>}
 */
const getUsers = (price) => {
  const ref = db.collection('users')
  return Promise.all([
    ref.where('notified', '==', null).where('dir', '==', 'GT').where('price', '<=', price).get(),
    ref.where('notified', '==', null).where('dir', '==', 'LT').where('price', '>=', price).get()
  ]).then(([high, low]) => high.docs.concat(low.docs))
}
exports.getUsers = getUsers

/**
 * Get a user's phone number
 * @param {DocumentSnapshot} user
 * @return {Array}
 */
const getUserPhoneNumber = (userData) => {
  const { phoneCountryCode, phoneNumber } = userData
  return [phoneCountryCode, phoneNumber].join('')
}
exports.getUserPhoneNumber = getUserPhoneNumber

/**
 * Format price
 * @param {Number} price To format
 * @return {String}
 */
const formatPrice = (price) => `$${price.toFixed(2).toLocaleString()}`
exports.formatPrice = formatPrice

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
exports.sendUserMessage = sendUserMessage

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
    from: functions.config().TWILIO.phoneNumber
  })
}
exports.sendMessage = sendMessage

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
      res.sendStatus(200).send()
    })
  }).catch((err) => console.error(`Could not retreive price: ${err.message}`))
})
