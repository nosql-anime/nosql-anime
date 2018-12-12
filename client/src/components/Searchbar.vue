<template>
<!-- <div class="wrapper"> -->
<div class="search">
  <input class="search-bar" type="text" v-model="searchField" placeholder="Type to search">
  <div class="search-button" v-on:click="search()">
    <i class="fas fa-search"></i>
  </div>
</div>
<!--   </div> -->
</template>

<script>
export default {
  props: ['searchCallback'],
  data () {
    return {
      searchField: ''
    }
  },
  methods: {
    search () {
      if (this.query !== '') {
        this.$emit('search', this.searchField)
      }
    }
  }
}
</script>

<style scoped>
  .search {
    height: 48px;
    margin: 16px auto;
    position: relative;
    width: 600px;
  }
  .search-bar {
    border-radius: 50px;
    border: 2px solid #434C3A;
    box-sizing: border-box;
    color: #434C3A;
    font-family: 'Open Sans', sans-serif;
    font-size: 20px;
    height: 48px;
    outline: 0;
    padding: 8px;
    padding-left: 24px;
    padding-right: 48px;
    width: 400px;
    transition: all 0.8s ease;
  }
  .search-button {
    cursor: pointer;
    display: inline-block;
    left: -42px;
    position: relative;
  }
</style>
