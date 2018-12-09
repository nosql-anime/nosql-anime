<template>
  <div id="app">
    <page-header></page-header>
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import PageHeader from '@/components/PageHeader'
export default {
  name: 'App',
  components: {
    Navbar,
    PageHeader
  }
}
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.css';
@import 'bootstrap-vue/dist/bootstrap-vue.css';

/*Move this to external css*/
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

#app {
  background-color: #ECDEC4;
  font-family: 'Pacifico', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #434C3A;
  margin: 0;
  height: 100%;
  width: 100%;
}
</style>
