const COINDESK_API_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json'

const getPrice = async () => {
  const response = await fetch(COINDESK_API_URL, {
    mode: 'cors',
    headers: {
      Accept: 'application/json'
    }
  })
  const data = await response.json()
  const price = data.bpi.USD.rate_float
  return price
}

export default getPrice