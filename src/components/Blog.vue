<template>
  <div class="content">
    <add-post></add-post>
    <ul>
      <li v-for="post in getPosts">
        <span
          v-on:click="removePost(post.id)"
          class="icon times remove"
        ></span>
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
      // Грузим из .json только если в localStorage нет записей
      if (this.$store.getters.IS_EMPTY) {
        this.$http.get('/static/api/blog.json').then(response => {
          console.log('Loaded from Blog.json')
          // Сохраняем записи
          this.$store.dispatch('UPDATE_POSTS', response.body)
        })
      }
    },
    methods: {
      removePost(payload) {
        this.$store.dispatch('REMOVE_POST', payload)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    li {
      position: relative;
      .remove {
        position: absolute;
        top:      12px;
        right:    12px;
        margin:   0;
        opacity:  .5;
        &:hover {
          cursor:  pointer;
          opacity: 1;
        }
      }
    }
  }
</style>
