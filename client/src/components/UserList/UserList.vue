<template>
<div>
    <div class="header row">
        <div class="col-6">Title</div>
        <div class="col-2">Current episode</div>
        <div class="col-2">My score</div>
        <div class="col-2">Completed</div>
    </div>
    <user-list-item v-for="item in items" :key="item.aid" v-bind:item="item"></user-list-item>
</div>
</template>

<script>
import UserListItem from './UserListItem'
export default {
  props: ['items'],
  data () {
    return {

    }
  },
  components: {
    UserListItem
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
