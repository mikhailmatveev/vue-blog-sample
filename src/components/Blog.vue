<template>
  <div class="content">
    <add-post></add-post>
    <ul>
      <li v-for="post in getPosts">
        <post
          :id="post.id"
          :author="post.author"
          :title="post.title"
          :content="post.content"
          :comments="post.comments"
        ></post>
      </li>
    </ul>
  </div>
</template>

<script>
  import { orderBy } from 'lodash'
  import AddPost from './AddPost'
  import Post from './Post'
  import { mapGetters } from 'vuex'

  export default {
    name: 'blog',
    components: { AddPost, Post },
    computed: {
      getPosts() {
        // Самые свежие записи наверх
        return orderBy(this.$store.getters.GET_POSTS, ['id'], ['desc'])
      },
      ...mapGetters({
        getSettings: 'GET_SETTINGS',
        isEmpty: 'IS_EMPTY'
      })
    },
    created() {
      // Грузим настройки
      this.$store.dispatch('GET_SETTINGS').then(() => {
        // Если настройки отсутствуют, либо свойство loaded
        if (!this.getSettings || !this.getSettings.loaded) {
          // Проверяем, есть ли записи в localStorage
          if (this.isEmpty) {
            // Грузим из .json только если в localStorage нет записей
            this.$http.get('/static/api/blog.json').then(response => {
              console.log('Loaded from Blog.json')
              // Сохраняем записи
              this.$store.dispatch('UPDATE_POSTS', response.body)
              // Сохраняем настройки
              this.$store.dispatch('SET_SETTINGS', {
                loaded: true
              })
            })
          }
        }
      })
    }
  }
</script>
