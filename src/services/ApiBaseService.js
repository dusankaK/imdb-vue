import axios from 'axios'

const baseURL = "http://127.0.0.1:8000/api/"

class ApiBaseService {
  constructor() {
    this.client = axios.create({
      baseURL
    });
    this.setInterceptor();
  }

  setInterceptor = () => {
    this.client.interceptors.request.use(config => {
      const token = window.localStorage.getItem("token");
      if (token) {
        Object.assign(config.headers, { Authorization: `Bearer ${token}`});
      }
      return config;
    });
  };

  getApiClient() {
    return this.client;
  }
}

export const apiBaseService = new ApiBaseService();
