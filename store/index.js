const cookieparser = process.server ? require("cookieparser") : undefined;

export const types = {
  SET_DARK: "SET_DARK"
};

export const state = () => ({
  isDark: false
});

export const getters = {};

export const mutations = {
  [types.SET_DARK](state, payload) {
    state.isDark = payload;
  }
};

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      const { theme } = parsed;
      commit(types.SET_DARK, theme === "true");
    }
  }
};
