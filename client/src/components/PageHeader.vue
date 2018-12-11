<template>
  <div class="title-block">
    <div class="main-title" v-on:click="goToMain">
      noSQL Anime
    </div>
    <div class="logo">
      <img src="../assets/thumbnail.png" alt="chibi" width="100" height="100">
    </div>
  </div>
</template>

<script>
import Router from '../router'
export default {
  methods: {
    goToMain () {
      Router.push('/')
    }
  }

}
</script>

<style scoped>

  .title-block {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  .main-title {
    color: #434C3A;
    cursor: pointer;
    font-size: 32px;
    padding: 10px;
  }
  .logo {
    align-self: flex-end;
    padding: 10px;
  }
</style>
