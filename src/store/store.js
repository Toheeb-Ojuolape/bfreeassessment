import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: "urls",
  storage: window.localStorage,
  reducer: (state) => state.urls,
  filter: (mutation) => mutation.type == "addUrl",
});

export default new Vuex.Store({
  state: {
    urls: [],
  },
  mutations: {
    addUrl(state, link) {
      state.urls.push(link);
    },
  },
  actions: {
    addUrl: (context, link) => {
      context.commit("addUrl", link);
    },
  },
  plugins: [vuexLocal.plugin],
});
