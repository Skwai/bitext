import config from '../config'

const { localStorage: storage } = window

export default class State {
  public btcPrice: number | null = null
  public submitted: boolean = false
  public historicalBtcPrices: {
    [key: string]: string
  }
  public storedPhoneNumber: string | null = null
  public storedCountryCode: string | null = null

  constructor(args = {}) {
    Object.assign(this, args)
    if (!process.env.NODE_ENV) {
      this.storedPhoneNumber = storage.getItem(config.STORAGE_PHONE_NUMBER) || null
      this.storedCountryCode = storage.getItem(config.STORAGE_COUNTRY_CODE) || null
    }
  }
}
