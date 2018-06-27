import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import User from './views/User.vue'
import NewPhoto from './views/NewPhoto.vue'
import Detail from './views/Detail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/new',
      name: 'NewPhoto',
      component: NewPhoto
    },
    {
      path: '/:photoid',
      name: 'Detail',
      component: Detail
    },

  ]
})
