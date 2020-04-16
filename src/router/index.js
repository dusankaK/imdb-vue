import Vue from 'vue';
import VueRouter from 'vue-router';
import Movies from '../views/Movies.vue';
import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: 'home',
    component: Movies
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
] 


export const router = new VueRouter({
  routes, 
  mode: 'history'
})