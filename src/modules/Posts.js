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
  ADD_COMMENT: (state, payload) => {
    // Фильтр по ID записи
    const post = state.posts.filter(item => {
      return item.id === payload.postID
    })
    // Если есть запись, сохраняем позицию этой записи в массиве state.posts
    if (post.length > 0) {
      const index = state.posts.indexOf(post[0])
      if (index !== -1) {
        const comments = state.posts[index].comments
        // Авто-инкремент ID
        payload.data.id = comments.length + 1
        // Добавляем новый комментарий в пост
        comments.push(payload.data)
        // Записываем новые данные в localStorage
        Storage.write(state.posts)
      }
    }
  },
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
  ADD_COMMENT: (state, payload) => {
    state.commit('ADD_COMMENT', payload)
  },
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
