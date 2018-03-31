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
    const prevPrice = await notify.getPreviousPrice()

    // Get the current bitcoin price
    let currPrice
    try {
      currPrice = await notify.getPrice()
      await notify.saveCurrentPrice(currPrice)
    } catch (err) {
      throw Error(`Could not retrieve price: ${err.message}`)
    }

    // If we don't have a previous price then end here
    if (prevPrice === null) {
      throw Error(`There was no previous price in the database`)
    }

    const formattedPrice = Notify.formatPrice(currPrice)
    console.info(`Fetched price: ${formattedPrice}`)

    // Get the users to notify
    let users
    try {
      users = await notify.getUsersToNotify(currPrice, prevPrice)
    } catch (err) {
      throw Error(`Could not retrieve users from Firestore: ${err.message}`)
    }

    // Check if we have any users to notify
    if (!users.length) {
      console.info('No users to notify')
      return
    }

    // Send SMS to all of the users
    const message = `Hi. Bitcoin is now at ${formattedPrice} USD. This is a one-time alert`
    console.info(`Messaging users: ${users.length}`)
    try {
      await notify.sendUsersNotification({ from, users, message })
    } catch (err) {
      throw Error(`Failed to notify users: ${err.message}`)
    }
    console.info('Messaging complete')
  } catch (err) {
    console.error(err)
  } finally {
    res.sendStatus(204).end()
  }
})
