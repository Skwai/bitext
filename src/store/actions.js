import db from '@/services/firestore'
import * as types from '@/store/types'

const COINDESK_API_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json'

export const addUser = async (ctx, user) => {
  const data = { ...user }
  await db.collection('users').add(data)
}

export const getCountries = async ({ state, commit }) => {
  if (!Object.keys(state.countries).length) {
    const snapshot = await db.collection('countries').get()
    snapshot.forEach(doc => commit(types.ADD_COUNTRY, doc))
  }
}

export const wasSubmitted = ({ commit }) => {
  commit(types.SET_SUBMITTED)
}

export const resetSubmitted = ({ commit }) => {
  commit(types.SET_UNSUBMITTED)
}

export const getBtcPrice = async ({ commit }) => {
  try {
    const response = await fetch(COINDESK_API_URL, {
      mode: 'cors',
      headers: {
        Accept: 'application/json'
      }
    })
    const data = await response.json()
    const price = data.bpi.USD.rate_float
    commit(types.SET_BTC_PRICE, price)
  } catch (err) {
    console.error(err)
  }
}
