<template>
  <div class="main-page">
    <searchbar v-on:search="doSearch($event)"></searchbar>
    <carousel></carousel>
    <high-score></high-score>
  </div>
</template>

<script>
import Searchbar from '@/components/Searchbar'
import Carousel from '@/components/Carousel'
import HighScore from '@/components/HighScore'
export default {
  components: {
    Searchbar,
    Carousel,
    HighScore
  },
  methods: {
    doSearch (event) {
      this.$router.push({path: 'result', query: {q: event}})
    }
  }
}
</script>

<style scoped>

</style>
