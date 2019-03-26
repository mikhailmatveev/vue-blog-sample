<template>
  <div class="content">
    <h1>Новая запись</h1>
    <input v-model="title"
           class="post-title"
           placeholder="Заголовок"
    />
    <textarea v-model="content"
              class="post-content"
              placeholder="Контент"
    ></textarea>
    <input v-model="author"
           class="post-author"
           placeholder="Как Вас зовут?"
    />
    <div class="button-wrapper">
      <button v-on:click.prevent="addPost"
              class="publish">
        Опубликовать
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'add-post',
    data() {
      return {
        author: '',
        title: '',
        content: ''
      }
    },
    methods: {
      addPost() {
        this.$store.dispatch('ADD_POST', {
          author: this.author,
          title: this.title,
          content: this.content,
          comments: []
        })
        this.author = ''
        this.title = ''
        this.content = ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  h1 {
    margin:        0;
    margin-bottom: 12px;
    font-size:     20px;
  }

  input {
    margin-bottom: 4px;
    width:         100%;
  }

  textarea {
    width: 100%;
  }

  .content {
    padding:       12px;
    margin-bottom: 20px;
    border:        1px #ddd solid;
  }

  .button-wrapper {
    margin:     6px 0;
    text-align: right;
  }
</style>
