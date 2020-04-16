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

      var tokenTrue = !!token
      if (tokenTrue) {
        const {assign} = Object
        const {headers} = config
        assign(headers, {Authorization: `Bearer ${token}`})
      }

      return config;
    });
  };

  getApiClient() {
    return this.client;
  }
}

export const apiBaseService = new ApiBaseService();
