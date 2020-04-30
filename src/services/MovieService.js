import {apiBaseService} from './ApiBaseService.js'

const ENDPOINTS = {
  MOVIES: (page, elastic) => `/movies?page=${page}&elastic=${elastic}`,
  MOVIESEARCH: (page, searchTerm, elastic) => `/movies?page=${page}&search=${searchTerm}&elastic=${elastic}`,
  MOVIEGENRE: (page, genre, elastic) => `/movies?page=${page}&genre=${genre}&elastic=${elastic}`,
  MOVIESEARCHGENRE: (page, searchTerm, genre, elastic) => `/movies?page=${page}&search=${searchTerm}&genre=${genre}&elastic=${elastic}`,
  MOVIE: id => `/movies/${id}`,
  GENRE: "/genres",
  MOVIEREACTIONS: "/movies/reactions",
  MOVIECOMMENTS: "/comments",
  COMMENTSPAGINATION: (id, page) => `/movies/${id}?page=${page}`,
  MOVIEWATCHLIST: "/movies/watchlist",
  POPULARMOVIES: "movies?popular=true"
};

class MovieService {
  getAll(page, searchTerm, genre, elastic = false) {
    if(searchTerm && !genre) {
      return apiBaseService.getApiClient().get(ENDPOINTS.MOVIESEARCH(page, searchTerm, elastic))
    }
    if(genre && !searchTerm) {
      return apiBaseService.getApiClient().get(ENDPOINTS.MOVIEGENRE(page, genre, elastic))
    }
    if(genre && searchTerm) {
      return apiBaseService.getApiClient().get(ENDPOINTS.MOVIESEARCHGENRE(page, searchTerm, genre, elastic))
    }
    return apiBaseService.getApiClient().get(ENDPOINTS.MOVIES(page, elastic));
  }
  getSingleMovie(id) {
    return apiBaseService.getApiClient().get(ENDPOINTS.MOVIE(id))
  }
  getGenres() {
    return apiBaseService.getApiClient().get(ENDPOINTS.GENRE);
  }
  reactToMovie(reaction) {
    return apiBaseService.getApiClient().post(ENDPOINTS.MOVIEREACTIONS, reaction)
  }
  sendComment(comment) {
    return apiBaseService.getApiClient().post(ENDPOINTS.MOVIECOMMENTS, comment)
  }
  paginateComments(id, page) {
    return apiBaseService.getApiClient().get(ENDPOINTS.COMMENTSPAGINATION(id, page));
  }
  handleWatchList(mId) {
    return apiBaseService.getApiClient().post(ENDPOINTS.MOVIEWATCHLIST, { movie_id: mId });
  }
  getPopularMovies() {
    return apiBaseService.getApiClient().get(ENDPOINTS.POPULARMOVIES);
  }
  getRelatedMovies(genresArr) {
    let genres = {
      genres: genresArr
    }
    return apiBaseService.getApiClient().post(`/movies/related`, genres)
  }
  createMovie(movie) {
    return apiBaseService.getApiClient().post("/movies", movie)
  }
}

export const movieService = new MovieService();