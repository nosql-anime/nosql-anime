import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loggedIn: false,
    accessToken: ''
  },
  mutations: {
    login (state) {
      state.loggedIn = true
    },
    logout (state) {
      state.loggedIn = false
    },
    setAccessToken (state, accessToken) {
      state.accessToken = accessToken
    },
    removeAccessToken (state) {
      state.accessToken = ''
    }
  },
  getters: {
    loggedIn: state => {
      return state.loggedIn
    },
    accessToken: state => {
      return state.accessToken
    }
  }
})

export default store
