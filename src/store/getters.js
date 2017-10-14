export const countries = ({ countries }) => countries

export const btcPrice = ({ btcPrice }) => {
  if (!btcPrice) return null
  const [dollars, cents] = btcPrice.toFixed(2).toLocaleString().split('.')
  return { dollars, cents }
}

export const submitted = ({ submitted }) => submitted
