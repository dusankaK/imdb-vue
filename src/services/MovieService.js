import {apiBaseService} from './ApiBaseService.js'

const ENDPOINTS = {
  MOVIES: page => `/movies?page=${page}`,
  MOVIESEARCH: (page, searchTerm) => `/movies?page=${page}&search=${searchTerm}`,
  MOVIEGENRE: (page, genre) => `/movies?page=${page}&genre=${genre}`,
  MOVIESEARCHGENRE: (page, searchTerm, genre) => `/movies?page=${page}&search=${searchTerm}&genre=${genre}`,
  MOVIE: id => `/movies/${id}`,
  GENRE: "/genres",
  MOVIEREACTIONS: "/movies/reactions",
  MOVIECOMMENTS: "/comments"
};

class MovieService {
  getAll(page, searchTerm, genre) {
    if(searchTerm && !genre) {
      return apiBaseService.getApiClient().get(ENDPOINTS.MOVIESEARCH(page, searchTerm))
    }
    if(genre && !searchTerm) {
      return apiBaseService.getApiClient().get(ENDPOINTS.MOVIEGENRE(page, genre))
    }
    if(genre && searchTerm) {
      return apiBaseService.getApiClient().get(ENDPOINTS.MOVIESEARCHGENRE(page, searchTerm, genre))
    }
    return apiBaseService.getApiClient().get(ENDPOINTS.MOVIES(page));
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
}

export const movieService = new MovieService();