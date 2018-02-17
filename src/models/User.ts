interface IUserOptions {
  created?: Date
  notified?: Date
  price?: number
  dir?: 'LT' | 'GT'
  phoneCountryCode?: string
  phoneNumber?: string
}

export default class User {
  public created: Date = new Date()
  public notified: Date | null = null
  public price: number | null = null
  public dir: 'LT' | 'GT' = 'GT'
  public phoneCountryCode: string | null = '+1'
  public phoneNumber: string | null = null

  constructor(args: IUserOptions = {}) {
    Object.assign(this, args)
  }
}
