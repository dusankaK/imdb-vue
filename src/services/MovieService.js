import {apiBaseService} from './ApiBaseService.js'

const ENDPOINTS = {
  MOVIES: page => `/movies?page=${page}`,
  MOVIESEARCH: (page, searchTerm) => `/movies?page=${page}&search=${searchTerm}`,
  MOVIE: id => `/movies/${id}`
};

class MovieService {
  getAll(page, searchTerm) {
    if(searchTerm) {
      return apiBaseService.getApiClient().get(ENDPOINTS.MOVIESEARCH(page, searchTerm))
    }
    return apiBaseService.getApiClient().get(ENDPOINTS.MOVIES(page));
  }
  getSingleMovie(id) {
    return apiBaseService.getApiClient().get(ENDPOINTS.MOVIE(id))
  }
}

export const movieService = new MovieService();