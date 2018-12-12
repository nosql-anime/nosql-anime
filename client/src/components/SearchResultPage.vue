<template>
  <div class="search-result-page">
    <searchbar v-on:search="doSearch($event)"></searchbar>
    <div class="select">
      <label for="page-size-select">Result per page</label>
      <select id="page-size-select" v-on:change="pageSizeChange()" v-model="pageSize">
        <option>5</option>
        <option>10</option>
        <option>20</option>
      </select>
    </div>
    <list v-bind:items="items"></list>
     <b-pagination v-on:change="pageChange($event)"
      class="pagination-bar"
      v-if="total"
      align="center"
      size="md"
      :total-rows="total"
      v-model="currentPage"
      :per-page="parseInt(pageSize)">
    </b-pagination>
  </div>
</template>

<script>
import Searchbar from '@/components/Searchbar'
import List from '@/components/List/List'
import Axios from 'axios'
export default {
  components: {
    Searchbar,
    List
  },
  data () {
    return {
      items: [],
      pageSize: 10,
      total: 0,
      currentPage: 1
    }
  },
  methods: {
    async doSearch (event) {
      let query = event ? `?q=${event}` : ''
      this.total = (await Axios.get(`/animes/results${query}`)).data.animeCount
      query = query.indexOf('?') > -1 ? `${query}&s=${this.pageSize}&p=${this.currentPage - 1}` : `?s=${this.pageSize}&p=${this.currentPage - 1}`
      const response = await Axios.get(`/animes${query}`)
      this.items = response.data.animes
      this.$router.push({path: 'result', query: {q: event, p: this.currentPage}})
    },
    async pageChange (event) {
      let query = this.$route.query['q'] ? `?q=${this.$route.query['q']}` : ''
      query = query.indexOf('?') > -1 ? `${query}&s=${this.pageSize}&p=${event - 1}` : `?s=${this.pageSize}&p=${event - 1}`
      const response = await Axios.get(`/animes${query}`)
      this.items = response.data.animes
      query = this.$route.query['q'] ? this.$route.query['q'] : ''
      this.$router.push({path: 'result', query: {q: query, p: this.currentPage}})
    },
    async pageSizeChange () {
      this.currentPage = 1
      let query = this.$route.query['q'] ? `?q=${this.$route.query['q']}` : ''
      query = query.indexOf('?') > -1 ? `${query}&s=${this.pageSize}&p=${this.currentPage - 1}` : `?s=${this.pageSize}&p=${this.currentPage - 1}`
      const response = await Axios.get(`/animes${query}`)
      this.items = response.data.animes
      query = this.$route.query['q'] ? this.$route.query['q'] : ''
      this.$router.push({path: 'result', query: {q: query, p: this.currentPage}})
    }
  },
  async mounted () {
    let query = this.$route.query['q'] ? `?q=${this.$route.query['q']}` : ''
    this.total = (await Axios.get(`/animes/results${query}`)).data.animeCount
    query = query.indexOf('?') > -1 ? `${query}&s=${this.pageSize}&p=${this.currentPage - 1}` : `?s=${this.pageSize}&p=${this.currentPage - 1}`
    const response = await Axios.get(`/animes${query}`)
    this.items = response.data.animes
  }
}
</script>

<style>
  .pagination-bar {
    margin: 24px;
  }
  .pagination-bar .page-item .page-link{
    color: #434C3A !important;
  }
  .pagination-bar .page-item.active .page-link{
    background-color: #6B9D80 !important;
    color: #E7E0D9 !important;
  }
  .select {
    margin: 8px 8px 8px 90%;
  }
</style>
