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
      console.info(`Fetched price: ${Notify.formatPrice(currPrice)}`)
    } catch (err) {
      throw Error(`Could not retrieve price: ${err.message}`)
    }

    try {
      await notify.saveCurrentPrice(currPrice)
    } catch (err) {
      throw Error(`Could not save current price: ${err.message}`)
    }

    // If we don't have a previous price then end here
    if (prevPrice === null) {
      throw Error(`There was no previous price in the database`)
    }
    console.info(`Retrieved previous price: ${Notify.formatPrice(prevPrice)}`)

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
    const message = `Hi. Bitcoin is now at ${Notify.formatPrice(
      currPrice
    )} USD. This is a one-time alert`
    console.info(`Messaging users: ${users.length}`)

    try {
      await notify.sendUsersNotification({ from, users, message })
      console.info('Messaging complete')
    } catch (err) {
      throw Error(`Failed to notify users: ${err.message}`)
    }
  } catch (err) {
    console.error(err)
  } finally {
    res.sendStatus(204).end()
  }
})
