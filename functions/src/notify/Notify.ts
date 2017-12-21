// https://cloud.google.com/nodejs/docs/reference/firestore/0.8.x/QuerySnapshot

import fetch from 'node-fetch'
import * as Twilio from 'twilio'

const COINDESK_API_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json'
const LT = 'LT'
const GT = 'GT'

export default class Notify {
  constructor ({
    db,
    from,
    twilio
  }) {
    Object.assign(this, {
      db,
      from,
      twilio
    })
    this.twilio = this.createTwilioClient(twilio.accountsid, twilio.authtoken)
  }

  /**
   * Create a new Twilio instance
   * @param {String} sid
   * @param {String} token
   * @return {Twilio}
   */
  createTwilioClient (sid, token) {
    return new Twilio(sid, token)
  }

  /**
   * Get the current Bitcoin price
   * @return {Promise<Number>}
   */
  async getPrice () {
    const response = await fetch(COINDESK_API_URL)
    const data = await response.json()
    return data.bpi.USD.rate_float
  }

  /**
   * Get users who want to be notified of the price
   * @param {Number} price
   * @return {Promise<DocumentSnapshot[]>}
   */
  async getUsers (price) {
    const [high, low] = await Promise.all([
      this.getHighUsers(price),
      this.getLowUsers(price)
    ])
    return [].concat(high.docs || [], low.docs || [])
  }

  /**
   * Get users who want to be notified of a high price
   * @param {Number} price
   * @return {Promise<QuerySnapshot>}
   */
  getHighUsers (price) {
    const collection = this.db.collection('users')
    return collection.where('notified', '==', null)
      .where('dir', '==', GT)
      .where('price', '<=', price)
      .get()
  }

  /**
   * Get users who want to be notified of a low price
   * @param {Number} price
   * @return {Promise<QuerySnapshot>}
   */
  getLowUsers (price) {
    const collection = this.db.collection('users')
    return collection.where('notified', '==', null)
      .where('dir', '==', LT)
      .where('price', '>=', price)
      .get()
  }

  /**
   * Get a user's phone number
   * @param {DocumentSnapshot} user
   * @return {String[]}
   */
  getUserPhoneNumber (userData) {
    const { phoneCountryCode, phoneNumber } = userData
    return [phoneCountryCode, phoneNumber].join('')
  }

  /**
   *
   * @param {DocumentSnapshot} user
   * @param {String} message
   * @return {Promise}
   */
  async sendUserMessage ({ from, user, message }) {
    const userData = user.data()
    const to = this.getUserPhoneNumber(userData)
    try {
      await this.sendMessage({ from, to, message })
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
   * @param {String} to Phone number to send message to
   * @param {String} body The message to send
   * @return {Promise}
   */
  sendMessage ({ from, to, message }) {
    return this.twilio.messages.create({
      to,
      from,
      body: message
    })
  }

  /**
   * Format price
   * @param {Number} price To format
   * @return {String}
   */
  formatPrice (price) {
    return `$${price.toFixed(2).toLocaleString()}`
  }

  /**
   * Set notified on the user
   * @param {DocumentSnapshot} user
   * @return {Promise}
   */
  setUserNotified (user) {
    return user.ref.update({
      notified: new Date()
    })
  }
}
