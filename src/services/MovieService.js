import {apiBaseService} from './ApiBaseService.js'

const ENDPOINTS = {
  MOVIES: page => `/movies?page=${page}`,
  MOVIE: id => `/movies/${id}`
};

class MovieService {
  getAll(page) {
    return apiBaseService.getApiClient().get(ENDPOINTS.MOVIES(page));
  }
  getSingleMovie(id) {
    return apiBaseService.getApiClient().get(ENDPOINTS.MOVIE(id))
  }
}

export const movieService = new MovieService();