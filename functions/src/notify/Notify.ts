// https://cloud.google.com/nodejs/docs/reference/firestore/0.8.x/QuerySnapshot

import fetch from 'node-fetch'
import Twilio from 'twilio'

const COINDESK_API_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json'
const LT = 'LT'
const GT = 'GT'

export default class Notify {
  twilio: Twilio = null

  constructor ({
    db,
    from,
    twilio
  }: {
    db: Firestore,
    from: string,
    twilio: Object
  }) {
    Object.assign(this, { db, from })
    this.twilio = this.constructor.createTwilioClient(twilio.accountsid, twilio.authtoken)
  }

  /**
   * Create a new Twilio instance
   */
  static createTwilioClient (sid: string, token: string): Twilio {
    return new Twilio(sid, token)
  }

  /**
   * Get the current Bitcoin price
   */
  getPrice (): Promise<number> {
    return fetch(COINDESK_API_URL)
      .then((res) => res.json())
      .then((data) => data.bpi.USD.rate_float)
  }

  /**
   * Get users who want to be notified of the price
   */
  getUsers (price: number): Promise<DocumentSnapshot[]> {
    return Promise.all([
      this.getHighUsers(price),
      this.getLowUsers(price)
    ]).then(([high, low]) => [].concat(high.docs || [], low.docs || []))
  }

  /**
   * Get users who want to be notified of a high price
   */
  getHighUsers (price: number): Promise<QuerySnapshot> {
    const collection: CollectionReference = this.db.collection('users')
    return collection.where('notified', '==', null)
      .where('dir', '==', GT)
      .where('price', '<=', price)
      .get()
  }

  /**
   * Get users who want to be notified of a low price
   */
  getLowUsers (price: number): Promise<QuerySnapshot>  {
    const collection: CollectionReference = this.db.collection('users')
    return collection.where('notified', '==', null)
      .where('dir', '==', LT)
      .where('price', '>=', price)
      .get()
  }

  /**
   * Get a user's phone number
   */
  getUserPhoneNumber (userData: DocumentSnapshot): Object[] {
    const { phoneCountryCode, phoneNumber } = userData
    return [phoneCountryCode, phoneNumber].join('')
  }

  /**
   * Send a messag to a user
   */
  async sendUserMessage ({ from: string, user: DocumentSnapshot, message: string }): Promise {
    const userData = user.data()
    const to = this.getUserPhoneNumber(userData)
    try {
      this.sendMessage({ from, to, message })
      this.setUserNotified(user)
    } catch (err) {
      console.error(err)
      if (err.status === 400) {
        this.setUserNotified(user)
      }
    }
  }

  /**
   * Send an SMS
   */
  sendMessage ({ from: string, to: string, message: string }): Promise {
    return this.twilio.messages.create({
      to,
      from,
      body: message
    })
  }

  /**
   * Format price
   */
  formatPrice (price: number): string {
    return `$${price.toFixed(2).toLocaleString()}`
  }

  /**
   * Set notified on the user
   */
  setUserNotified (user: DocumentSnapshot): Promise {
    return user.ref.update({
      notified: new Date()
    })
  }
}
