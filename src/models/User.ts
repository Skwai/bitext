export default class User {
  public created: Date = new Date()
  public notified: Date | null = null
  public price: number | null = null
  public dir: 'LT' | 'GT' = 'GT'
  public phoneCountryCode: string | null = '+1'
  public phoneNumber: string | null = null

  constructor(args = {}) {
    Object.assign(this, args)
  }
}
