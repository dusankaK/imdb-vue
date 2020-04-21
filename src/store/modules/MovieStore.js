import {movieService} from '../../services/MovieService.js';

export const MovieStore = {
  state: {
    allMovies : null
  },
  mutations: {
    SET_MOVIES(state, movies) {
      state.allMovies = movies
    }
  },
  actions: {
    async fetchAllMovies(context) {
      const response = await movieService.getAll();
      context.commit("SET_MOVIES", response.data);
      return response;
    }
  },
  getters: {
    allMovies(state) {
      return state.allMovies;
    }
  }
}