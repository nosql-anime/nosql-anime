<template>
<div>
  <searchbar></searchbar>
  <user-list v-bind:items="items"></user-list>
</div>
</template>

<script>
import Searchbar from './Searchbar'
import UserList from './UserList/UserList'
import Axios from 'axios'
export default {
  components: {
    Searchbar,
    UserList
  },
  data () {
    return {
      items: []
    }
  },
  async mounted () {
    console.log('mounted userlist')
    let username = this.$store.state.userName
    this.items = (await Axios.get(`/users/animes/?username=${username}`)).data
    console.log(this.items)
  }
}
</script>

<style scoped>

</style>
