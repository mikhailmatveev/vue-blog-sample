import { isObject} from 'lodash'
import Storage from '../utils/SettingsStorage'

const state = {
  settings: {
    loaded: false
  }
}

const getters = {
  GET_SETTINGS: (state, payload) => {
    return state.settings
  }
}

const mutations = {
  GET_SETTINGS: (state, payload) => {
    state.settings = Storage.read()
  },
  SET_SETTINGS: (state, payload) => {
    if (isObject(payload)) {
      const settings = Object.assign({ ...state.settings }, payload)
      Storage.write(settings)
    }
  }
}

const actions = {
  GET_SETTINGS: (state, payload) => {
    state.commit('GET_SETTINGS')
  },
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
