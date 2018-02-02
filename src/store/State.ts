import config from '../config'

const { localStorage: storage } = window

export default class State {
  public countries: {} = {}
  public btcPrice: number | null = null
  public submitted: boolean = false
  public historicalBtcPrices: {}
  public storedPhoneNumber: string | null = storage.getItem(config.STORAGE_PHONE_NUMBER) || null
  public storedCountryCode: string | null = storage.getItem(config.STORAGE_COUNTRY_CODE) || null
}
