<template>
  <nav>
    <ul class="nav-items">
      <li class="nav-item" v-on:click="register">Register</li>
      <li class="nav-item" v-on:click="login">Log in</li>
    </ul>
  </nav>
</template>

<script>
import Router from '../router'
export default {
  methods: {
    register () {
      console.log('register button clicked')
      Router.push('register')
    },
    login () {
      console.log('login button clicked')
      Router.push('login')
    }
  }
}
</script>

<style scoped>

  .nav-items {
    align-items: center;
    background-color: #B55555;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 0;
  }

  .nav-item {
    background-color: #B55555;
    color: white;
    cursor: pointer;
    list-style: none;
    padding: 10px;
  }

  .nav-item:hover {
    background-color: #E59D92;
  }

</style>
