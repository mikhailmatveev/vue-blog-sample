<template>
  <div class="content">
    <h1>Новая запись</h1>
    <div class="form-group">
      <input v-model="title"
             class="post-title input"
             placeholder="Заголовок"
      />
    </div>
    <div class="form-group">
      <textarea v-model="content"
                class="post-content input"
                placeholder="Контент"
      ></textarea>
    </div>
    <div class="form-group">
      <input v-model="author"
             class="post-author input"
             placeholder="Как Вас зовут?"
      />
    </div>
    <div class="button-wrapper">
      <button :disabled="!isValid" v-on:click.prevent="addPost"
              class="btn btn-primary publish">
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
    computed: {
      isValid() {
        return this.author && this.title && this.content
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
  @import "../scss/buttons/buttons";
  @import "../scss/inputs/inputs";

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
    padding:    6px 0;
    text-align: right;
  }
</style>
