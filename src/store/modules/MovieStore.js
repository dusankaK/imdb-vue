import {movieService} from '../../services/MovieService.js';

export const MovieStore = {
  state: {
    allMovies: [],
    singleMovie: {},
    genres: [] 
  },
  mutations: {
    SET_MOVIES(state, movies) {
      state.allMovies = movies
    },
    SET_SINGLE_MOVIE(state, movie) {
      state.singleMovie = movie
    },
    SET_GENRES(state, genres) {
      state.genres = genres
    }
  },
  actions: {
    fetchAllMovies({commit}, { page, searchTerm = "", genre = [] }) {
      movieService.getAll(page, searchTerm, genre)
        .then(response => {
          commit("SET_MOVIES", response.data)
        })
    },
    async fetchGenres({commit}){
      const response = await movieService.getGenres();
      commit('SET_GENRES', response.data);
    },
    async fetchSingleMovie(context, id) {
      const response = await movieService.getSingleMovie(id);
      context.commit("SET_SINGLE_MOVIE", response.data);
      return response;
    },
    async reactToMovie(context, reaction) {
      const response = await movieService.reactToMovie(reaction);
      alert(response.data.message);
      return response.data;
    }
  },
  getters: {
    allMovies(state) {
      return state.allMovies;
    },
    singleMovie(state) {
      return state.singleMovie;
    },
    allGenres(state) {
      return state.genres;
    }
  }
}