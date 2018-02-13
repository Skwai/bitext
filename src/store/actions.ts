import { Action, ActionContext } from 'vuex'
import config from '../config'
import User from '../models/User'
import db from '../services/firestore'
import * as priceService from '../services/price'
import * as types from '../store/types'
import State from './State'

interface IActionContext extends ActionContext<State, any> {}

export const addUser = async (context: IActionContext, user: User) => {
  const data = { ...user }
  await db.collection('users').add(data)
}

export const wasSubmitted = ({ commit }: IActionContext) => {
  commit(types.SET_SUBMITTED)
}

export const resetSubmitted = ({ commit }: IActionContext) => {
  commit(types.SET_UNSUBMITTED)
}

export const getBtcPrice = async ({ commit }: IActionContext) => {
  const price = await priceService.getPrice()
  commit(types.SET_BTC_PRICE, price)
}

export const getHistoricalBtcPrices = async ({ commit }: IActionContext) => {
  const prices = await priceService.getHistoricalPrice()
  commit(types.SET_HISTORICAL_BTC_PRICES, prices)
}

export const setStoredPhoneNumber = ({ commit }: IActionContext, phoneNumber: string) => {
  if (phoneNumber) {
    commit(types.SET_STORED_PHONE_NUMBER, phoneNumber)
    localStorage.setItem(config.STORAGE_PHONE_NUMBER, phoneNumber)
  }
}

export const setStoredCountryCode = ({ commit }: IActionContext, countryCode: string) => {
  if (countryCode) {
    localStorage.setItem(config.STORAGE_COUNTRY_CODE, countryCode)
    commit(types.SET_STORED_COUNTRY_CODE, countryCode)
  }
}
