<template>
  <div class="main-page">
    <searchbar></searchbar>
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
  }
}
</script>

<style scoped>

</style>
