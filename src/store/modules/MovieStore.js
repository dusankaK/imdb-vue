import {movieService} from '../../services/MovieService.js';

export const MovieStore = {
  state: {
    allMovies: [],
    singleMovie: {},
    genres: [],
    setSingleComment: [] 
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
    },
    SET_SINGLE_COMMENTS(state, comments) {
      state.setSingleComment = comments
    },
    PUSH_COMMENTS(state, comments) {
      state.setSingleComment.push(...comments);
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
      context.commit("SET_SINGLE_COMMENTS", response.data.comments.data)
      return response;
    },
    async loadMoreComments({commit}, {id, page}) {
      movieService.paginateComments(id, page)
        .then(response => {
          commit("PUSH_COMMENTS", response.data.comments.data)
      });
    },
    async reactToMovie(context, reaction) {
      const response = await movieService.reactToMovie(reaction);
      alert(response.data.message);
      return response.data;
    },
    async addComment(context, content) {
      const response = await movieService.sendComment(content);
      return response;
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
    },
    singleMovieComments(state) {
      return state.setSingleComment;
    }
  }
}