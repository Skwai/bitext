const COINDESK_CURRENT_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json'
const COINDESK_HISTORICAL_URL = 'https://api.coindesk.com/v1/bpi/historical/close.json'

// exporting as non-default so that sinon can stub it in tests
export const getPrice = async () => {
  const response = await fetch(COINDESK_CURRENT_URL, {
    mode: 'cors',
    headers: {
      Accept: 'application/json'
    }
  })
  const data = await response.json()
  const price = data.bpi.USD.rate_float
  return price
}

export const getHistoricalPrice = async () => {
  const end = new Date().toISOString().split('T').shift()
  const start = (() => {
    const date = new Date()
    date.setMonth(date.getMonth() - 3)
    return date.toISOString().split('T').shift()
  })()
  const query = `start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`
  const response = await fetch(`${COINDESK_HISTORICAL_URL}?${query}`, {
    mode: 'cors',
    headers: {
      Accept: 'application/json'
    }
  })
  const { bpi } = await response.json()
  return bpi
}
