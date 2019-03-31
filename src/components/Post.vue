<template xmlns="http://www.w3.org/1999/html">
  <div class="content">
    <header v-if="!editModeEnabled">
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
        v-on:click="editPost()"
        class="icon edit"
      ></span>
    </header>
    <div v-if="!editModeEnabled" v-html="truncate(content, 255)" class="body">
      {{ content }}
    </div>
    <div v-else class="body edit-post">
      <div class="form-group">
        <input v-model="post.title"
               class="post-title input"
               placeholder="Заголовок"
        />
      </div>
      <div class="form-group">
        <textarea v-model="post.content"
                  class="post-content input"
                  placeholder="Контент"
                  rows="5"
        ></textarea>
      </div>
      <div class="form-group">
        <input v-model="post.author"
               class="post-author input"
               placeholder="Как Вас зовут?"
        />
      </div>
      <div class="button-wrapper">
        <button :disabled="!isValid" v-on:click.prevent="savePost"
                class="btn btn-primary save">
          Сохранить
        </button>
      </div>
    </div>
    <footer v-if="!editModeEnabled">
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
    data() {
      return {
        post: {
          title: this.title,
          content: this.content,
          author: this.author
        },
        editModeEnabled: false
      }
    },
    computed: {
      isValid() {
        return this.title && this.content && this.author
      }
    },
    methods: {
      editPost() {
        if (!this.editModeEnabled) {
          this.editModeEnabled = true
        }
      },
      savePost() {
        if (this.editModeEnabled === true) {
          this.editModeEnabled = false
        }
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
  @import "../scss/inputs/inputs";
  @import "../scss/buttons/buttons";

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
    .body {
      &.edit-post {
        border-top: 1px #ddd solid;
        border-bottom: 1px #ddd solid;
        .button-wrapper {
          padding:    6px 0;
          text-align: right;
        }
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
