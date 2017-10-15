/**
 * Get the countries in the store
 * @return {Object}
 */
export const countries = ({ countries }) => countries

/**
 * Get the Bitcoin price in dollars
 * @return {(Number|null)}
 */
export const btcPriceDollars = ({ btcPrice }) => {
  if (!btcPrice || isNaN(btcPrice)) return null
  return Number(Number(btcPrice).toFixed(0)).toLocaleString('en-US')
}

/**
 * Get the submitted state in the store
 * @return {Boolean}
 */
export const submitted = ({ submitted }) => submitted
