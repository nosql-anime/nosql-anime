<template>
  <div>
    <div class="main-title" v-on:click="goToMain">
      noSQL Anime
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
  .main-title {
    color: #434C3A;
    font-size: 32px;
    padding: 10px;
    text-align: left;
    width: 100%;
  }
</style>
