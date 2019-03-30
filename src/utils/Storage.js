import { isArray, isObject } from 'lodash'

export default {
  // Читает данные из localStorage
  read: function (key) {
    return JSON.parse(localStorage.getItem(key))
  },
  // Записывает данные в localStorage
  write: function (key, items) {
    if (isArray(items) || isObject(items)) {
      localStorage.setItem(key, JSON.stringify(items))
    } else {
      localStorage.setItem(key, items)
    }
  }
}
