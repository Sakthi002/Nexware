import Vue from 'vue'

import VueRouter from 'vue-router'

import Login from '../components/Auth/Login.vue'

import Register from '../components/Auth/Register.vue'

import CustomersIndex from '../components/Customer/CustomersIndex.vue'

import CustomerCreateEdit from '../components/Customer/CustomerCreateEdit.vue'

Vue.use(VueRouter)

  const routes = [
    
    {
      path: '/',
      name: 'Login',
      component: Login
    },

    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    
    {
      path: '/register',
      name: 'Register',
      component: Register
    },

    {
      path: '/customers',
      name: 'Customers',
      component: CustomersIndex
    },

    {
      path: '/create',
      name: 'Create',
      component: CustomerCreateEdit
    },

    {
      path: '/edit/:id',
      name: 'Edit',
      component: CustomerCreateEdit
    },
]

const router = new VueRouter({
    
  mode: 'history',
  
  base: process.env.BASE_URL,
  
  routes
})

export default router
