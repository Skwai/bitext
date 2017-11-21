const functions = require('firebase-functions')
const admin = require('firebase-admin')
const Notify = require('./Notify')

// Init Firebase
admin.initializeApp(functions.config().firebase)
const db = admin.firestore()
const config = functions.config()

/**
 * Listen to request
 */
module.exports = functions.https.onRequest((req, res) => {
  const notify = new Notify({
    db,
    twilio: config.twilio
  })

  const from = config.twilio.phonenumber
  let message

  notify.getPrice()
    .then((price) => {
      const formattedPrice = notify.formatPrice(price)
      console.info(`Fetched price: ${formattedPrice}`)
      message = `Hi. Bitcoin is now at ${formattedPrice} USD. This is a one-time alert`
      return notify.getUsers(price)
    })
    .catch((err) => console.error(`Could not retrieve price: ${err.message}`))
    .then((users) => {
      console.info(`Messaging users: ${users.length}`)
      if (users.length) {
        return Promise.all(users.map((user) => notify.sendUserMessage({
          from,
          user,
          message
        })))
      }
    })
    .then(() => res.sendStatus(204).end())
})
