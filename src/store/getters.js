/**
 * @return {Object}
 */
export const countries = ({ countries }) => countries

/**
 * @return {(Number|null)}
 */
export const btcPriceDollars = ({ btcPrice }) => {
  if (!btcPrice || isNaN(btcPrice)) return null
  return Number(Number(btcPrice).toFixed(0)).toLocaleString('en-US')
}

/**
 * @return {Boolean}
 */
export const submitted = ({ submitted }) => submitted
