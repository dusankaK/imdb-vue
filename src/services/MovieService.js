import {apiBaseService} from './ApiBaseService.js'

const ENDPOINTS = {
  MOVIES: "/movies",
  MOVIE: id => `/movies/${id}`
};

class MovieService {
  getAll() {
    return apiBaseService.getApiClient().get(ENDPOINTS.MOVIES);
  }
  getSingleMovie(id) {
    return apiBaseService.getApiClient().get(ENDPOINTS.MOVIE(id))
  }
}

export const movieService = new MovieService();