import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import Notify from './Notify'

// Init Firebase
admin.initializeApp(functions.config().firebase)
const db = admin.firestore()
const config = functions.config()

export default functions.https.onRequest(async (req, res) => {
  const notify = new Notify({
    db,
    twilio: config.twilio
  })

  const from = config.twilio.phonenumber

  try {
    const price = await notify.getPrice()
    const formattedPrice = notify.formatPrice(price)
    console.info(`Fetched price: ${formattedPrice}`)
    const message = `Hi. Bitcoin is now at ${formattedPrice} USD. This is a one-time alert`

    try {
      const users = await notify.getUsers(price)

      if (!users.length) {
        console.info('No users to notify')
      } else {
        console.info(`Messaging users: ${users.length}`)
        await Promise.all(users.map((user) => notify.sendUserMessage({
          from,
          user,
          message
        })))
        console.info('Messaging complete')
      }
    } catch (err) {
      console.error('Could not retrieve users')
    }
  } catch (err) {
    console.error(`Could not retrieve price: ${err.message}`)
  } finally {
    res.sendStatus(204).end()
  }
})
