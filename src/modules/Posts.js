import Storage from './Storage'

const state = {
  posts: []
}

const getters = {
  GET_POSTS: (state, payload) => {
    state.posts = Storage.read()
    return state.posts
  },
  IS_EMPTY: (state, payload) => {
    return state.posts.length === 0
  }
};

const mutations = {
  ADD_POST: (state, payload) => {
    // Присваиваем ID записи
    payload.id = ++Storage.uid
    // Добавляем в хранилище
    state.posts.push(payload)
    // Записываем новые данные в localStorage
    Storage.write(state.posts)
  },
  UPDATE_POSTS: (state, payload) => {
    state.posts = payload
    // Записываем новые данные в localStorage
    Storage.write(state.posts)
  }
}

const actions = {
  ADD_POST: (state, payload) => {
    state.commit('ADD_POST', payload)
  },
  UPDATE_POSTS: (state, payload) => {
    // Записываем в localStorage
    state.commit('UPDATE_POSTS', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
}
