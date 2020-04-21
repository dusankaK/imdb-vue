import {movieService} from '../../services/MovieService.js';

export const MovieStore = {
  state: {
    allMovies: [],
    singleMovie: {} 
  },
  mutations: {
    SET_MOVIES(state, movies) {
      state.allMovies = movies
    },
    SET_SINGLE_MOVIE(state, movie) {
      state.singleMovie = movie
    }
  },
  actions: {
    async fetchAllMovies(context, page) {
      const response = await movieService.getAll(page);
      context.commit("SET_MOVIES", response.data);
      return response;
    },
    async fetchSingleMovie(context, id) {
      const response = await movieService.getSingleMovie(id);
      context.commit("SET_SINGLE_MOVIE", response.data);
      return response;
    }
  },
  getters: {
    allMovies(state) {
      return state.allMovies;
    },
    singleMovie(state) {
      return state.singleMovie;
    }
  }
}