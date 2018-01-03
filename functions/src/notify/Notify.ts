// https://cloud.google.com/nodejs/docs/reference/firestore/0.8.x/QuerySnapshot

import fetch from 'node-fetch'
import * as Twilio from 'twilio'
import { Message } from 'firebase-functions/lib/providers/pubsub';

const COINDESK_API_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json'
const LT = 'LT'
const GT = 'GT'

interface TwilioConfig {
  authtoken: string
  accountsid: string
}

export default class Notify {
  twilio: Twilio.RestClient
  db: FirebaseFirestore.Firestore

  constructor ({
    db,
    from,
    twilio
  }: {
    db: any,
    from: string,
    twilio: TwilioConfig
  }) {
    Object.assign(this, { db, from, twilio })
    this.initTwilio(twilio.accountsid, twilio.authtoken)
  }

  /** Create a new Twilio instance */
  initTwilio (sid: string, token: string): void {
    this.twilio = new Twilio.RestClient(sid, token)
  }

  /** Get the current Bitcoin price */
  async getPrice (): Promise<number> {
    const response = await fetch(COINDESK_API_URL)
    const data = await response.json()
    return data.bpi.USD.rate_float
  }

  /** Get users who want to be notified of the price */
  async getUsers (price: number) : Promise<FirebaseFirestore.DocumentSnapshot[]> {
    const [high, low] = await Promise.all([
      this.getHighUsers(price),
      this.getLowUsers(price)
    ])
    return [ ...high.docs, ...low.docs ]
  }

  /** Get users who want to be notified of a high price */
  getHighUsers (price: number): Promise<FirebaseFirestore.QuerySnapshot> {
    const collection = this.db.collection('users')
    return collection.where('notified', '==', null)
      .where('dir', '==', GT)
      .where('price', '<=', price)
      .get()
  }

  /** Get users who want to be notified of a low price */
  getLowUsers (price: number): Promise<FirebaseFirestore.QuerySnapshot> {
    const collection = this.db.collection('users')
    return collection.where('notified', '==', null)
      .where('dir', '==', LT)
      .where('price', '>=', price)
      .get()
  }

  /** Get a user's phone number */
  getUserPhoneNumber (userData: FirebaseFirestore.DocumentData): string {
    const { phoneCountryCode, phoneNumber } = userData
    return [phoneCountryCode, phoneNumber].join('')
  }

  /** Send a message to a user */
  async sendUserMessage ({
    from,
    user,
    message
  }: {
    from: string,
    user: FirebaseFirestore.DocumentSnapshot,
    message: string
  }): Promise<void> {
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

  /** Send an SMS */
  async sendMessage ({
    from,
    to,
    message
  }: {
    from: string,
    to: string,
    message: string
  }): Promise<Twilio.MessageResource> {
    // return's a `Q` promise. Sanitize to native promise by awaiting result
    const result = await this.twilio.messages.create({
      to,
      from,
      body: message
    })
    return result
  }

  /** Format price */
  formatPrice (price: number): string {
    return `$${price.toFixed(2).toLocaleString()}`
  }

  /** Set notified on the user */
  setUserNotified (user: FirebaseFirestore.DocumentSnapshot): Promise<FirebaseFirestore.WriteResult> {
    return user.ref.update({
      notified: new Date()
    })
  }
}
