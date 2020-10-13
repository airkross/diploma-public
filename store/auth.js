export const state = () => ({
  user: [],
  isAuth: false
});

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_AUTH(state) {
    state.isAuth = true
  }
};

export const actions = {
  setUser({
    commit
  }, payload) {
    commit('SET_USER', payload);
  },
  setAuth({
    commit
  }) {
    commit('SET_AUTH')
  }
};
export const getters = {
  authUser: s => s.user,
  isAuth: s => s.isAuth,
}
