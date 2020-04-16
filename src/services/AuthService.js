import {apiBaseService} from './ApiBaseService.js'

const ENDPOINTS = {
  LOGIN: "auth/login",
  REGISTER: "auth/register"
};

class AuthService {
  login(credentials) {
    return apiBaseService.getApiClient().post(ENDPOINTS.LOGIN, credentials);
  }

  register(credentials) {
    return apiBaseService.getApiClient().post(ENDPOINTS.REGISTER, credentials);
  }
}

export const authService = new AuthService(); 