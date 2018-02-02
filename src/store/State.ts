import config from '../config'

const { localStorage: storage } = window

export default class State {
  public countries: {} = {}
  public btcPrice: number | null = null
  public submitted: boolean = false
  public historicalBtcPrices: {
    [key: string]: string
  }
  public storedPhoneNumber: string | null = null
  public storedCountryCode: string | null = null

  constructor() {
    this.storedPhoneNumber = storage.getItem(config.STORAGE_PHONE_NUMBER) || null
    this.storedCountryCode = storage.getItem(config.STORAGE_COUNTRY_CODE) || null
  }
}
