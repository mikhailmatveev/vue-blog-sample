import { isEmpty, find } from 'lodash'
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
  REMOVE_COMMENT: (state, payload) => {
    // Фильтр по ID записи
    const post = find(state.posts, {
      id: payload.postID
    })
    if (!isEmpty(post)) {
      const comment = find(post.comments, {
        id: payload.commentID
      })
      if (!isEmpty(comment)) {
        const index = post.comments.indexOf(comment)
        if (index !== -1) {
          // Удалить комментарий по его индексу
          post.comments.splice(index, 1)
        }
        // Пересчитать ID в массиве post.comments
        if (post.comments.length > 0) {
          for (let i = 0; i < post.comments.length; ++i) {
            const item = post.comments[i]
            if (item.id > payload.commentID) {
              item.id--
            }
          }
        }
        // Записываем новые данные в localStorage
        Storage.write(state.posts)
      }
    }
  },
  REMOVE_POST: (state, payload) => {
    // Фильтр по ID записи
    const post = find(state.posts, {
      id: payload
    })
    if (!isEmpty(post)) {
      const index = state.posts.indexOf(post)
      if (index !== -1) {
        // Удалить запись по её индексу
        state.posts.splice(index, 1)
      }
      // Пересчитать ID в массиве state.posts
      if (state.posts.length > 0) {
        for (let i = 0; i < state.posts.length; ++i) {
          const item = state.posts[i]
          if (item.id > payload) {
            item.id--
          }
        }
      }
      // Записываем новые данные в localStorage
      Storage.write(state.posts)
    }
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
  REMOVE_COMMENT: (state, payload) => {
    state.commit('REMOVE_COMMENT', payload)
  },
  REMOVE_POST: (state, payload) => {
    state.commit('REMOVE_POST', payload)
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
