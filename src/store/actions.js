import db from '@/services/firestore'
import * as types from '@/store/types'
import * as priceService from '@/services/price'
import config from '@/config'

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
  const price = await priceService.getPrice()
  commit(types.SET_BTC_PRICE, price)
}

export const getHistoricalBtcPrices = async ({ commit }) => {
  const prices = await priceService.getHistoricalPrice()
  commit(types.SET_HISTORICAL_BTC_PRICES, prices)
}

export const setStoredPhoneNumber = ({ commit }, phoneNumber) => {
  localStorage.setItem(config.STORAGE_PHONE_NUMBER, phoneNumber)
  commit('SET_STORED_PHONE_NUMBER', phoneNumber)
}

export const setStoredCountryCode = ({ commit }, countryCode) => {
  localStorage.setItem(config.STORAGE_COUNTRY_CODE, countryCode)
  commit('SET_STORED_COUNTRY_CODE', countryCode)
}
