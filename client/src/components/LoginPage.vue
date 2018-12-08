<template>
  <div class="login">
    <input v-model="username" type="text" placeholder="Username">
    <input v-model="password" type="password" placeholder="Password">
    <button v-on:click="login">Login</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      console.log('logging in...')
    }
  }
}
</script>

<style scoped>

</style>
