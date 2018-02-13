export interface ICountry {
  name: string
  phoneCode: string
  code: string
}

export default [
  {
    name: 'United States',
    phoneCode: '+1',
    code: 'US'
  },
  {
    name: 'United Kingdom',
    phoneCode: '+44',
    code: 'GB'
  },
  {
    name: 'Germany',
    phoneCode: '+49',
    code: 'DE'
  },
  {
    name: 'France',
    phoneCode: '+33',
    code: 'FR'
  },
  {
    name: 'Australia',
    phoneCode: '+61',
    code: 'AU'
  },
  {
    name: 'New Zealand',
    phoneCode: '+64',
    code: 'NZ'
  },
  {
    name: 'Israel',
    phoneCode: '+972',
    code: 'IL'
  },
  {
    name: 'India',
    phoneCode: '+91',
    code: 'IN'
  },
  {
    name: 'Japan',
    phoneCode: '+81',
    code: 'JP'
  },
  {
    name: 'Brazil',
    phoneCode: '+55',
    code: 'BR'
  }
] as ICountry[]
