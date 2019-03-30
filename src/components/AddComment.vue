<template>
  <div class="content">
    <div class="form-control">
      <textarea v-model="content"
                class="post-content input"
                placeholder="Контент"
      ></textarea>
    </div>
    <div class="form-control">
      <input v-model="author"
             class="post-author input"
             placeholder="Как Вас зовут?"
      />
    </div>
    <div class="button-wrapper">
      <button v-on:click.prevent="addComment"
              class="publish">
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
