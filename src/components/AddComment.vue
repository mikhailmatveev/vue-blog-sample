<template>
  <div class="content">
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
      <button :disabled="!isValid" v-on:click.prevent="addComment"
              class="btn btn-primary publish">
        Добавить
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'add-comment',
    props: ['postID'],
    data() {
      return {
        author: '',
        content: ''
      }
    },
    computed: {
      isValid() {
        return this.author && this.content
      }
    },
    methods: {
      addComment() {
        this.$store.dispatch('ADD_COMMENT', {
          postID: this.postID,
          data: {
            author: this.author,
            content: this.content
          }
        })
        this.author = ''
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
