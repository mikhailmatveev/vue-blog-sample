<template>
  <div class="content">
    <add-post></add-post>
    <ul>
      <li v-for="post in getPosts">
        <post
          :id="post.id"
          :author="post.author"
          :title="post.title"
          :content="post.content | truncate(255)"
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

  export default {
    name: 'blog',
    components: { AddPost, Post },
    computed: {
      getPosts() {
        // Самые свежие записи наверх
        return orderBy(this.$store.getters.GET_POSTS, ['id'], ['desc'])
      }
    },
    filters: {
      truncate(value, limit) {
        if (value.length > limit) {
          value = value.substring(0, limit - 3) + '...';
        }
        return value
      }
    },
    created() {
      this.$http.get('/static/api/blog.json').then(response => {
        // Грузим из .json только если в localStorage нет записей
        if (this.$store.getters.IS_EMPTY) {
          this.$store.dispatch('UPDATE_POSTS', response.body).then(() => {
            console.log('Loaded from Blog.json')
          })
        }
      })
    }
  }
</script>
