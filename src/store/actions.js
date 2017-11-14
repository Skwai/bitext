import db from '@/services/firestore'
import * as types from '@/store/types'
import * as priceService from '@/services/price'

export const addUser = async (_, user) => {
  const data = { ...user }
  await db.collection('users').add(data)
}

export const wasSubmitted = ({ commit }) => {
  commit(types.SET_SUBMITTED)
}

export const resetSubmitted = ({ commit }) => {
  commit(types.SET_UNSUBMITTED)
}

export const getBtcPrice = async ({ commit }) => {
  try {
    const price = await priceService.getPrice()
    commit(types.SET_BTC_PRICE, price)
  } catch (err) {}
}

export const getHistoricalBtcPrices = async ({ commit }) => {
  const prices = await priceService.getHistoricalPrice()
  commit(types.SET_HISTORICAL_BTC_PRICES, prices)
}
