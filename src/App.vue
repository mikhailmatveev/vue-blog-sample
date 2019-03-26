<template>
  <router-view></router-view>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss">
  @import "scss/main";

  .content {
    margin:    0 auto;
    padding:   8px 0;
    max-width: 800px;
    .content {
      padding: 0;
    }
    @media (max-width: 800px) {
      padding-left:  6px;
      padding-right: 6px;
    }
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
    ul {
      margin: 0;
      li {
        margin-bottom: 20px;
        &:last-child, li {
          margin-bottom: 0;
        }
      }
    }
  }

  .bold {
    font-weight: 700;
  }

  .icon {
    display:        inline-block;
    margin-right:   4px;
    width:          16px;
    height:         16px;
    vertical-align: middle;
    &.comment {
      background: url("/static/icons/icon-comment.svg") 0 0 no-repeat;
    }
    &.user {
      background: url("/static/icons/icon-user.svg") 0 0 no-repeat;
    }
  }
</style>
