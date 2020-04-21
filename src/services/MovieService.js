import {apiBaseService} from './ApiBaseService.js'

const ENDPOINTS = {
  MOVIES : "/movies"
};

class MovieService {
  getAll() {
    return apiBaseService.getApiClient().get(ENDPOINTS.MOVIES);
  }
}

export const movieService = new MovieService();