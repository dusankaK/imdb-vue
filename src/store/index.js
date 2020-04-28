import Vue from 'vue';
import Vuex from 'vuex';
import { AuthStore } from './modules/AuthStore.js'
import { MovieStore } from './modules/MovieStore.js';

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    AuthStore,
    MovieStore
  }
})