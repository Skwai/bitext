import Vue from 'vue'
import Vuex from 'vuex'

import config from '../config'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import State from './State'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state: new State(),
  strict: debug
})
