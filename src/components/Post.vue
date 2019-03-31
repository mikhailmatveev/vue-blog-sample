<template xmlns="http://www.w3.org/1999/html">
  <div class="content">
    <header>
      <h1>
        <router-link :to="{ path: '/post/' + id }">
          {{ title }}
        </router-link>
      </h1>
      <span
        v-on:click="removePost(id)"
        class="icon times remove"
      ></span>
      <span
        v-on:click="editPost(id)"
        class="icon edit"
      ></span>
    </header>
    <div v-html="truncate(content, 255)" class="body">
      {{ content }}
    </div>
    <footer>
      <ul>
        <li><span class="icon user"></span>{{ author }}</li>
        <li v-if="comments.length > 0"><span class="icon comment"></span>{{ comments.length }}</li>
      </ul>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'post',
    props: ['id', 'title', 'content', 'author', 'comments'],
    methods: {
      editPost(id) {
        console.log(id)
      },
      removePost(payload) {
        this.$store.dispatch('REMOVE_POST', payload)
      },
      truncate(value, limit) {
        if (value.length > limit) {
          value = value.substring(0, limit - 3) + '...';
        }
        return value
      }
    }
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
      position: relative;
      border-top: 1px #ddd solid;
      h1 {
        margin:      0;
        font-size:   20px;
        line-height: 125%;
      }
      .edit,
      .remove {
        position: absolute;
        top:      12px;
        margin:   0;
        opacity:  .5;
        &:hover {
          cursor:  pointer;
          opacity: 1;
        }
      }
      .edit {
        right: 32px;
      }
      .remove {
        right: 12px;
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
