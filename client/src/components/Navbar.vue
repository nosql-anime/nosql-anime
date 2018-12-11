<template>
  <nav>
    <ul class="nav-items">
      <li class="nav-group">
        <div class="nav-item" v-on:click="home">Home</div>
        <div class="nav-item" v-if="loggedIn" v-on:click="myList">My Anime List</div>
      </li>
      <li class="nav-group">
        <div class="nav-item" v-if="!loggedIn" v-on:click="register">Register</div>
        <div class="nav-item" v-if="!loggedIn" v-on:click="login">Log in</div>
        <div class="nav-item" v-if="loggedIn" v-on:click="logout">Log out</div>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    loggedIn () {
      return this.$store.getters.loggedIn
    }
  },
  methods: {
    register () {
      console.log('register button clicked')
      this.$router.push('register')
    },
    login () {
      console.log('login button clicked')
      this.$router.push('login')
    },
    home () {
      this.$router.push('/')
    },
    myList () {
      this.$router.push('/mylist')
    },
    logout () {
      console.log('logout')
      this.$store.commit('logout')
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
    justify-content: space-between;
    margin: 0;
    padding: 0;
  }

  .nav-group {
    list-style: none;
  }

  .nav-item {
    background-color: #B55555;
    color: white;
    cursor: pointer;
    display: inline-block;
    padding: 10px;
  }

  .nav-item:hover {
    background-color: #E59D92;
  }

</style>
