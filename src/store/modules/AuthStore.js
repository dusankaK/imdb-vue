import { authService } from '../../services/AuthService.js';

export const AuthStore = {
  state:
  {
    token: localStorage.getItem("token"),
    registerErrors: [],
    loginErrors: null
  },
  mutations: 
  {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_REGISTER_ERRORS: (state, errors) => {
      state.registerErrors = errors
    },
    SET_LOGIN_ERRORS: (state, error) => {
      state.loginErrors = error
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
    },
    async loginUser(context, credentials) {
      try {
        const response = await authService.login(credentials);
        context.commit("SET_TOKEN", response.data.token);
        context.commit("SET_LOGIN_ERRORS", null);
        localStorage.setItem("token", response.data.token);
        return response;
      } catch (exception) {
        context.commit("SET_LOGIN_ERRORS", exception.response.data.error);
      }
    },
    async logoutUser(context){
      context.commit('SET_TOKEN', null); 
      localStorage.removeItem("token")

    }
  },
  getters: {
    registerErrors(state) {
      return state.registerErrors
    },
    loginErrors(state) {
      return state.loginErrors
    },
    isUserLoggedIn(state) {
      return !!state.token
    }
  }
}