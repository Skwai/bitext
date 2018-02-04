const COINDESK_CURRENT_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json'
const COINDESK_HISTORICAL_URL = 'https://api.coindesk.com/v1/bpi/historical/close.json'

export const getPrice = async () => {
  const response = await fetch(COINDESK_CURRENT_URL, {
    headers: {
      Accept: 'application/json'
    },
    mode: 'cors'
  })
  const data = await response.json()
  return data.bpi.USD.rate_float as number
}

export const getHistoricalPrice = async () => {
  const end = getEndDate()
  const start = getStartDate()
  const query = `start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`
  const response = await fetch(`${COINDESK_HISTORICAL_URL}?${query}`, {
    headers: {
      Accept: 'application/json'
    },
    mode: 'cors'
  })
  const { bpi } = await response.json()
  return bpi as number
}

const getStartDate = (months: number = 3) => {
  const date = new Date()
  date.setMonth(date.getMonth() - months)
  return date
    .toISOString()
    .split('T')
    .shift() as string
}

const getEndDate = () => {
  return new Date()
    .toISOString()
    .split('T')
    .shift() as string
}
