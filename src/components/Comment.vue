<template>
  <div class="content">
    <div class="body">
      <span class="bold">{{ author }}</span>
      <span>{{ comment }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'comment',
    props: ['author', 'comment']
  }
</script>

<style lang="scss">
  span {
    display: block;
    margin-bottom: 4px;
    & + span {
      margin-bottom: 0;
    }
  }
</style>
