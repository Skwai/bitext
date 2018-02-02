import State from './State'

export const btcPrice = ({ btcPrice }: State) => btcPrice || null
export const submitted = ({ submitted }: State) => submitted
export const historicalBtcPrices = ({ historicalBtcPrices }: State) => historicalBtcPrices
export const storedPhoneNumber = ({ storedPhoneNumber }: State) => storedPhoneNumber
export const storedCountryCode = ({ storedCountryCode }: State) => storedCountryCode
