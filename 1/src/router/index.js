import Vue from 'vue'
import VueRouter from 'vue-router'
import Account from '../views/Account.vue'
import Home from "../views/Home.vue"
import Moment from "../views/Moment.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
  },
  {
    path: '/moment',
    name: 'Moment',
    component: Moment
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
