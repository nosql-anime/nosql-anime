<template>
<div>
  <user-list v-bind:items="items"></user-list>
</div>
</template>

<script>
import UserList from './UserList/UserList'
import Axios from 'axios'
export default {
  components: {
    UserList
  },
  data () {
    return {
      items: []
    }
  },
  async mounted () {
    let token = this.$store.getters.accessToken
    const response = (await Axios.get(`/users/animes/${token}`))
    this.items = response.data
  }
}
</script>

<style scoped>

</style>
