<template>
  <div class="search-result-page">
    <searchbar></searchbar>
    <list></list>
  </div>
</template>

<script>
import Searchbar from '@/components/Searchbar'
import List from '@/components/List/List'
export default {
  components: {
    Searchbar,
    List
  }
}
</script>

<style scoped>

</style>
