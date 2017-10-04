export default class User {
  active = true
  createdAt = new Date()
  high = null
  low = null
  phoneCountryCode = null
  phoneNumber = null

  isValid () {
    return Object.values(this.validations).every(v => v)
  }

  validations () {
    return {
      createdAt: this.createdAt instanceof Date,
      high: !isNaN(this.high),
      low: !isNaN(this.low),
      phoneCountryCode: !!this.phoneCountryCode,
      phoneNumber: !!this.phoneNumber
    }
  }
}
