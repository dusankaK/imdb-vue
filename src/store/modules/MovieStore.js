import {movieService} from '../../services/MovieService.js';

export const MovieStore = {
  state: {
    allMovies: [],
    singleMovie: {},
    genres: [],
    setSingleComment: [],
    popularMovies: [],
    relatedMovies: [] 
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
    },
    SET_POPULAR_MOVIES(state, movies) {
      state.popularMovies = movies;
    },
    SET_RELATED_MOVIES(state, movies) {
      state.relatedMovies = movies;
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
      context.commit("SET_SINGLE_MOVIE", response.data.movie);
      context.commit("SET_SINGLE_COMMENTS", response.data.movie.comments.data)
      return response;
    },
    async loadMoreComments({commit}, {id, page}) {
      movieService.paginateComments(id, page)
        .then(response => {
          commit("PUSH_COMMENTS", response.data.movie.comments.data)
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
    },
    async handleWatchlist(context, mId) {
      const response = await movieService.handleWatchList(mId);
      return response;
    },
    async fetchPopularMovies(context) {
      const response = await movieService.getPopularMovies();
      context.commit("SET_POPULAR_MOVIES", response.data)
      return response;
    },
    async fetchRelatedMovies({ commit }, genres) {
      let filtered = genres.map(e => {
        return e.name;
      });
      const response = await movieService.getRelatedMovies(filtered);
      commit("SET_RELATED_MOVIES", response.data);
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
    },
    popularMovies(state) {
      return state.popularMovies;
    },
    relatedMovies(state) {
      return state.relatedMovies;
    }
  }
}