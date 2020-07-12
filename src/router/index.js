import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import TripDetails from '../views/TripDetails'
import UserDetails from '../views/UserDetails'
import SignUp from '../views/SignUp'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/trips/details/:id?',
    name:'details',
    component: TripDetails
  },
  {
    path: '/users/details/:id',
    name:'users',
    component: UserDetails
  },
  {
    path: '/signup',
    name:'signup',
    component: SignUp
  }
  
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  mode: 'history',
  scrollBehavior() {
    return {x: 0, y: 0}
}
})

export default router
