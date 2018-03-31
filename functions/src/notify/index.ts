import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import Notify from './Notify'

// Init Firebase
admin.initializeApp(functions.config().firebase)
const db = admin.firestore()
const config = functions.config()
const from = config.twilio.phonenumber

export default functions.https.onRequest(async (req, res) => {
  const notify = new Notify({
    db,
    twilio: config.twilio
  })

  try {
    // Get the current bitcoin price
    let price
    try {
      price = await notify.getPrice()
    } catch (err) {
      throw Error(`Could not retrieve price: ${err.message}`)
    }

    const formattedPrice = Notify.formatPrice(price)
    console.info(`Fetched price: ${formattedPrice}`)

    // Get the users to notify
    let users
    try {
      users = await notify.getUsers(price)
    } catch (err) {
      throw Error('Could not retrieve users from Firestore')
    }

    if (!users.length) {
      console.info('No users to notify')
      return
    }

    // Message users
    const message = `Hi. Bitcoin is now at ${formattedPrice} USD. This is a one-time alert`
    console.info(`Messaging users: ${users.length}`)
    try {
      await notify.sendUsersNotification({ from, users, message })
    } catch (err) {
      throw Error('Failed to notify users')
    }
    console.info('Messaging complete')
  } catch (err) {
    console.error(err)
  } finally {
    res.sendStatus(204).end()
  }
})
