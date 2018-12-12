import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loggedIn: false,
    accessToken: '',
    userName: ''
  },
  mutations: {
    login (state, {accessToken, userName}) {
      state.loggedIn = true
      state.accessToken = accessToken
      state.userName = userName
    },
    logout (state) {
      state.loggedIn = false
      state.accessToken = ''
      state.userName = ''
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
