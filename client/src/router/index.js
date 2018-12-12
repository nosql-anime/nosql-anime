import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import LoginPage from '@/components/LoginPage'
import RegisterPage from '@/components/RegisterPage'
import UserListPage from '@/components/UserListPage'
import SearchResultPage from '@/components/SearchResultPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/result',
      name: 'result',
      component: SearchResultPage
    },
    {
      path: '/mylist',
      name: 'mylist',
      component: UserListPage
    }
  ]
})
