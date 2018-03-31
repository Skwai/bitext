// https://cloud.google.com/nodejs/docs/reference/firestore/0.8.x/QuerySnapshot

import fetch from 'node-fetch'
import * as Twilio from 'twilio'

const COINDESK_API_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json'
const LT = 'LT'
const GT = 'GT'

interface TwilioConfig {
  authtoken: string
  accountsid: string
}

export default class Notify {
  /** Format price */
  public static formatPrice(price: number): string {
    return `$${price.toFixed(2).toLocaleString()}`
  }

  private twilio: Twilio.RestClient
  private db: FirebaseFirestore.Firestore

  constructor({ db, twilio }: { db: any; twilio: TwilioConfig }) {
    Object.assign(this, { db, twilio })
    this.createTwilioInstance(twilio.accountsid, twilio.authtoken)
  }

  /** Get the current Bitcoin price */
  public async getPrice(): Promise<number> {
    const response = await fetch(COINDESK_API_URL)
    const data = await response.json()
    return data.bpi.USD.rate_float
  }

  /** Get users who want to be notified of the price */
  public async getUsers(price: number): Promise<FirebaseFirestore.DocumentSnapshot[]> {
    const [high, low] = await Promise.all([this.getHighUsers(price), this.getLowUsers(price)])
    return [...high.docs, ...low.docs]
  }

  /** Get users who want to be notified of a high price */
  public getHighUsers(price: number): Promise<FirebaseFirestore.QuerySnapshot> {
    const collection = this.db.collection('users')
    return collection
      .where('notified', '==', null)
      .where('dir', '==', GT)
      .where('price', '<=', price)
      .get()
  }

  /** Get users who want to be notified of a low price */
  public getLowUsers(price: number): Promise<FirebaseFirestore.QuerySnapshot> {
    const collection = this.db.collection('users')
    return collection
      .where('notified', '==', null)
      .where('dir', '==', LT)
      .where('price', '>=', price)
      .get()
  }

  /** Get a user's phone number */
  public getUserPhoneNumber(userData: FirebaseFirestore.DocumentData): string {
    const { phoneCountryCode, phoneNumber } = userData
    return [phoneCountryCode, phoneNumber].join('')
  }

  /** Send a message to a user */
  public async sendUserNotification({
    from,
    user,
    message
  }: {
    from: string
    user: FirebaseFirestore.DocumentSnapshot
    message: string
  }): Promise<void> {
    const userData = user.data()
    const to = this.getUserPhoneNumber(userData)

    try {
      await this.sendTwilioMessage({ from, to, message })
      this.setUserNotified(user)
    } catch (err) {
      console.error(err)
      if (err.status === 400) {
        this.setUserNotified(user)
      }
    }
  }

  /** Send an SMS */
  public async sendTwilioMessage({
    from,
    to,
    message
  }: {
    from: string
    to: string
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

  /** Set notified on the user */
  public setUserNotified(
    user: FirebaseFirestore.DocumentSnapshot
  ): Promise<FirebaseFirestore.WriteResult> {
    return user.ref.update({
      notified: new Date()
    })
  }

  /** Message an array of users */
  public sendUsersNotification({
    from,
    users,
    message
  }: {
    from: string
    users: FirebaseFirestore.DocumentSnapshot[]
    message: string
  }) {
    return Promise.all(
      users.map((user) =>
        this.sendUserNotification({
          from,
          user,
          message
        })
      )
    )
  }

  /** Create a new Twilio instance */
  private createTwilioInstance(twilioAccountSid: string, twilioAuthToken: string): void {
    this.twilio = new Twilio.RestClient(twilioAccountSid, twilioAuthToken)
  }
}
