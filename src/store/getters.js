/**
 * Get the Bitcoin price in dollars
 * @return {(Number|null)}
 */
export const btcPrice = ({ btcPrice }) => btcPrice || null

/**
 * Get the submitted state in the store
 * @return {Boolean}
 */
export const submitted = ({ submitted }) => submitted

/**
 * Get the historical Bitcoin price
 * @return {Object}
 */
export const historicalBtcPrices = ({ historicalBtcPrices }) => historicalBtcPrices

export const storedPhoneNumber = ({ storedPhoneNumber }) => storedPhoneNumber
export const storedCountryCode = ({ storedCountryCode }) => storedCountryCode
