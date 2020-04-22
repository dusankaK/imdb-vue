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
    fetchAllMovies({commit}, {page, searchTerm=""}) {
      movieService.getAll(page, searchTerm)
        .then(response => {
          commit("SET_MOVIES", response.data)
        })
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