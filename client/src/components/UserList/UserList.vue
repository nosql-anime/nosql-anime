<template>
<div>
    <div class="header row">
        <div class="col-4">Title</div>
        <div class="col-2">Current episode</div>
        <div class="col-2">My score</div>
        <div class="col-2">Completed</div>
        <div class="col-1">Edit</div>
        <div class="col-1">Delete</div>
    </div>
    <user-list-item v-for="item in items" :key="item.aid" v-bind:item="item" v-on:delete="deleteAnime($event)"></user-list-item>
</div>
</template>

<script>
import UserListItem from './UserListItem'
import Axios from 'axios'
export default {
  props: ['items'],
  data () {
    return {

    }
  },
  components: {
    UserListItem
  },
  methods: {
    deleteAnime (event) {
      Axios.delete(`/users/animes/${event}/${this.$store.getters.accessToken}`)
      this.items.splice((this.items.findIndex(anime => anime.aid === event)), 1)
    }
  }
}
</script>

<style scoped>
    .header {
      padding: 0 8px;
      width: 100%;
    }
    .header div {
      text-align: start;
      display: inline-block;
    }
</style>
