import Vue from 'vue';
import VueRouter from 'vue-router';
import { store } from "../store/index.js";
import Movies from '../views/Movies.vue';
import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: 'home',
    component: Movies,
    meta: {
      guest: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      guest: true
    }
  },
] 

const router = new VueRouter({
  routes, 
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  const isUserLoggedIn = store.getters.isUserLoggedIn;

  if (!to.meta.guest && !isUserLoggedIn) {
    return next({
      name: "login"
    });
  }

  if ((to.name === "login" && isUserLoggedIn) || (to.name === "register" && isUserLoggedIn)) {
    return next({
      name: "home"
    });
  }

  return next();
});

export default router;