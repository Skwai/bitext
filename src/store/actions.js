import db from '@/services/firestore'
import * as types from '@/store/types'

export const createUser = async (data) => {
  await db.collection('users').add(data)
}

export const getCurrencies = async ({ commit }) => {
  const snapshot = await db.collection('countries').get()
  snapshot.forEach((doc) => commit(types.ADD_CURRENCY, doc))
}

export const getCountries = async ({ commit }) => {
  const snapshot = await db.collection('countries').get()
  snapshot.forEach((doc) => commit(types.ADD_COUNTRY, doc))
}
