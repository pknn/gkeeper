import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    greenhouses: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setGreenhouses(state, greenhouses) {
      state.greenhouses = greenhouses;
    }
  },
  actions: {
    async login({ commit }, { username, password }) {
      try {
        const response = await axios.post("/auth/login", {
          username,
          password
        });
        commit("setUser", response.data);
      } catch (error) {
        throw error;
      }
    },
    async register(_, { username, email, password }) {
      try {
        await axios.post("/auth/signup", {
          username,
          email,
          password
        });
      } catch (error) {
        throw error;
      }
    },
    logout({ commit }) {
      commit("setUser", null);
      commit("setGreenhouses", []);
    },
    async fetchGreenhouse({ state, commit }) {
      const response = await axios.get(`/users/${state.user.id}/greenhouses`);
      commit("setGreenhouses", response.data);
    },
    async createGreenhouse({ state }, { name, plant }) {
      try {
        await axios.post(`/users/${state.user.id}/greenhouses`, {
          name,
          plant
        });
      } catch (error) {
        throw error;
      }
    }
  },
  getters: {
    greenhouses: state => state.greenhouses,
    greenhousesCount: state => state.greenhouses.length,
    greenhouse: state => index => state.greenhouses[index]
  }
});
