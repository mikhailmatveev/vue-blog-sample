<template>
  <div class="content">
    <header>
      <h1>{{ post.title }}</h1>
    </header>
    <div v-html="post.content" class="body">
      {{ post.content }}
    </div>
    <footer>
      <span class="icon user"></span>{{ post.author }}
    </footer>
    <ul class="comments">
      <li v-for="comment in post.comments">
        <span
          v-on:click="removeComment({
            postID: post.id,
            commentID: comment.id
          })"
          class="icon times remove"
        ></span>
        <comment
          :author="comment.author"
          :comment="comment.content"
        ></comment>
      </li>
    </ul>
    <add-comment :postID="post.id"></add-comment>
  </div>
</template>

<script>
  import AddComment from './AddComment'
  import Comment from './Comment'

  export default {
    name: 'view-post',
    components: { AddComment, Comment },
    data() {
      return {
        post: {}
      }
    },
    mounted() {
      const id = this.$route.params.id
      const post = this.$store.getters.GET_POSTS.filter(item => {
        return item.id === Number(id)
      })
      if (post.length > 0) {
        this.post = post[0]
      }
    },
    methods: {
      removeComment(payload) {
        this.$store.dispatch('REMOVE_COMMENT', payload)
      }
    }
  }
</script>

<style lang="scss">
  .content {
    header, .body, footer {
      border: 0;
    }
    footer {
      border: 0;
    }
    .comments {
      li {
        position: relative;
        margin-bottom: 0;
        .remove {
          position: absolute;
          top: 8px;
          right: 8px;
          margin: 0;
          opacity: .5;
          &:hover {
            cursor: pointer;
            opacity: 1;
          }
        }
      }
    }
  }
</style>
