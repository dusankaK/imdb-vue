import {authService} from '../../services/AuthService.js';

export const AuthStore = {
  state:
  {
    token: localStorage.getItem("token"),
    registerErrors: []
  },
  mutations: 
  {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_REGISTER_ERRORS: (state, errors) => {
      state.registerErrors = errors
    }
  },
  actions: 
  {
    async registerUser(context, credentials) {
      try {
        const response = await authService.register(credentials);
        context.commit("SET_TOKEN", response.data.token);
        context.commit("SET_REGISTER_ERRORS", null);
        localStorage.setItem("token", response.data.token);
        return response;
      } catch (exception) {
        context.commit("SET_REGISTER_ERRORS", exception.response.data.errors);
      }
    }
  },
  getters: {
    registerErrors(state) {
      return state.registerErrors
    }
  }
}