const STORAGE_KEY = 'blog-vuejs-2.0'

export default {
  // Читает данные из localStorage
  read: function () {
    var items = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return items
  },
  // Записывает данные в localStorage
  write: function (items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }
}
