// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import BootstrapVue from 'bootstrap-vue'
import Axios from 'axios'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueCookies)

Axios.defaults.baseURL = 'http://localhost:8081'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
