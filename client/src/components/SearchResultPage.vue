<template>
  <div class="search-result-page">
    <searchbar></searchbar>
    <list v-bind:items="items"></list>
  </div>
</template>

<script>
import Searchbar from '@/components/Searchbar'
import List from '@/components/List/List'
export default {
  components: {
    Searchbar,
    List
  },
  data () {
    return {
      items: [
        {id: 1, title: 'asd', score: 5, genre: ['asd', 'jkl']},
        {id: 2, title: 'asd', score: 5, genre: ['asd', 'jkl']},
        {id: 3, title: 'asd', score: 5, genre: ['asd', 'jkl']}
      ]
    }
  }
}
</script>

<style scoped>

</style>
