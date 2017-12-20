import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import Notify from './Notify'

// Init Firebase
admin.initializeApp(functions.config().firebase)
const db: Firestore = admin.firestore()
const config: Object = functions.config()

/**
 * Listen to request
 */
export default functions.https.onRequest(async (req: object, res;) => {
  const notify = new Notify({
    db,
    twilio: config.twilio
  })

  const from: string = config.twilio.phonenumber

  try {
    const price: number = await notify.getPrice()
    const formattedPrice: string = notify.formatPrice(price)
    console.info(`Fetched price: ${formattedPrice}`)
    const message: string = `Hi. Bitcoin is now at ${formattedPrice} USD. This is a one-time alert`
    try {
      const users: DocumentSnapshot[] = await notify.getUsers(price)

      if (!users.length) {
        console.log('No users to notify')
      } else {
        console.info(`Messaging users: ${users.length}`)
        await Promise.all(users.map((user: Do) => notify.sendUserMessage({
          from,
          user,
          message
        })))
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
