<template>
  <div class="register">
    <h4>New User Registration</h4>
    <input class="form-input" v-model="email" type="email" placeholder="E-Mail" required>
    <input class="form-input" v-model="username" type="text" placeholder="Username" required>
    <input class="form-input" v-model="password" type="password" placeholder="Password" required>
    <button class="register-button" v-on:click="register">Register</button>
    <div v-if="showError" class="error">
      Username or email already in use
    </div>
    <div v-if="showEmailError" class="error">
      Invalid email
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data () {
    return {
      username: '',
      email: '',
      password: '',
      showError: false,
      showEmailError: false
    }
  },
  methods: {
    async register () {
      if (this.validateUserNameAndPassword() && this.validateEmail()) {
        try {
          await Axios.post('/registration', {
            headers: {
              'Content-Type': 'application/json'
            },
            username: this.username,
            password: this.password,
            email: this.email
          })
          this.$router.go(-1)
        } catch (error) {
          console.error(error)
          this.showError = true
        }
      } else {
        this.showEmailError = true
      }
    },
    validateUserNameAndPassword () {
      return (this.username && this.password)
    },
    validateEmail () {
      return this.email && /^.*@.*\..*$/.test(this.email)
    }
  }
}
</script>

<style scoped>
  .register {
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
  .register-button {
    background-color: #6B9D80;
    border: 2px solid #434C3A;
    border-radius: 16px;
    color: #E7E0D9;
    height: 40px;
    margin-top: 16px;
    width: 120px;
  }
  .register-button:hover {
    background-color: #E7E0D9;
    color: #434C3A;
    cursor: pointer;
  }
</style>
