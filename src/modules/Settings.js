import { isObject} from 'lodash'
import Storage from '../utils/SettingsStorage'

const state = {
  settings: {}
}

const getters = {
  GET_SETTINGS: (state, payload) => {
    state.settings = Storage.read() || {}
    return state.settings
  }
}

const mutations = {
  SET_SETTINGS: (state, payload) => {
    if (isObject(payload)) {
      Storage.write(Object.assign(state.settings, payload))
    }
  }
}

const actions = {
  SET_SETTINGS: (state, payload) => {
    state.commit('SET_SETTINGS', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
