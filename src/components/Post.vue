<template xmlns="http://www.w3.org/1999/html">
  <div class="content">
    <header>
      <h1>
        <router-link :to="{ path: '/post/' + id }">
          {{ title }}
        </router-link>
      </h1>
    </header>
    <div v-html="content" class="body">
      {{ content }}
    </div>
    <footer>
      <ul>
        <li><span class="icon user"></span>{{ author }}</li>
        <li><span class="icon comment"></span>{{ comments.length }}</li>
      </ul>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'post',
    props: ['id', 'title', 'content', 'author', 'comments']
  }
</script>

<style lang="scss" scoped>
  .content {
    header, .body, footer {
      padding:      12px;
      border-left:  1px #ddd solid;
      border-right: 1px #ddd solid;
    }
    header {
      border-top: 1px #ddd solid;
      h1 {
        margin:      0;
        font-size:   20px;
        line-height: 125%;
      }
    }
    footer {
      border-bottom: 1px #ddd solid;
      p {
        margin-bottom: 0;
      }
      ul {
        li {
          display:      inline-block;
          margin-left:  4px;
          margin-right: 4px;
          &:first-child {
            margin-left: 0;
          }
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
</style>
