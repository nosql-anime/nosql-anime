<template>
  <div class="login">
    <h4>Log in</h4>
    <input class="form-input" v-model="username" type="text" placeholder="Username">
    <input class="form-input" v-model="password" type="password" placeholder="Password">
    <button class="login-button" v-on:click="login">Log in</button>
    <div v-if="showError" class="error">
      Your username or password is invalid
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data () {
    return {
      username: '',
      password: '',
      showError: false
    }
  },
  methods: {
    async login () {
      if (this.username && this.password) {
        try {
          const response = await Axios.post('http://localhost:8081/login', {
            username: this.username,
            password: this.password
          })
          const accessToken = response.data['access-token']
          const expires = new Date(response.data.expires)
          this.$cookies.set('access-token', accessToken, expires)
          this.$store.commit('setAccessToken', accessToken)
          this.$store.commit('login')
          this.$router.push('/')
        } catch (error) {
          console.error(error)
          this.showError = true
        }
      }
    }
  }
}
</script>

<style scoped>
  .login {
    align-items: center;
    border: 4px solid #434C3A;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    margin: 16px auto;
    padding: 16px;
    width: 400px;
  }
  .form-input {
    border-radius: 50px;
    border: 2px solid #434C3A;
    box-sizing: border-box;
    color: #434C3A;
    font-family: 'Open Sans', sans-serif;
    font-size: 20px;
    height: 48px;
    margin-top: 16px;
    outline: 0;
    padding: 8px;
    padding-left: 24px;
    padding-right: 48px;
    width: 300px;
    transition: all 0.8s ease;
  }
  .login-button {
    background-color: #6B9D80;
    border: 2px solid #434C3A;
    border-radius: 16px;
    color: #E7E0D9;
    height: 40px;
    margin-top: 16px;
    width: 120px;
  }
  .login-button:hover {
    background-color: #E7E0D9;
    color: #434C3A;
    cursor: pointer;
  }
</style>
