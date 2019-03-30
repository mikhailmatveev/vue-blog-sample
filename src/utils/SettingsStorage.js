import Storage from "./Storage";

const STORAGE_KEY = 'settings-vuejs-2.0'

export default {
  read: () => {
    return Storage.read(STORAGE_KEY) || []
  },
  write: data => {
    Storage.write(STORAGE_KEY, data)
  }
}
