import {movieService} from '../../services/MovieService.js';

export const MovieStore = {
  state: {
    allMovies: null,
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
    async fetchAllMovies(context) {
      const response = await movieService.getAll();
      context.commit("SET_MOVIES", response.data);
      return response;
    },
    async fetchSingleMovie(context, id) {
      const response = await movieService.getSingleMovie(id);
      console.log(response);
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