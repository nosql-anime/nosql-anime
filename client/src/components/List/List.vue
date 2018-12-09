<template>
<div>
    <div class="header row">
        <div class="col-8">Title</div>
        <div class="col-2">Score</div>
        <div class="col-2">Genre</div>
    </div>
    <list-item v-for="item in items" :key="item.id" v-bind:item="item"></list-item>
</div>
</template>

<script>
import ListItem from './ListItem'
export default {
  data () {
    return {
      items: [
        {id: 1, title: 'asd', score: 5, genre: ['asd', 'jkl']},
        {id: 2, title: 'asd', score: 5, genre: ['asd', 'jkl']},
        {id: 3, title: 'asd', score: 5, genre: ['asd', 'jkl']}
      ]
    }
  },
  components: {
    ListItem
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
