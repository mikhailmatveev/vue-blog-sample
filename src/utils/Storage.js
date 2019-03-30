import { isArray, isObject } from 'lodash'

export default {
  // Читает данные из localStorage
  read: function (key) {
    const item = localStorage.getItem(key)
    if (isArray(item) || isObject(item)) {
      return JSON.parse(item)
    }
    return item
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
