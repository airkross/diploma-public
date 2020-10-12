export const state = () => ({
  user: [],
  isAuth: false,
  authUserComplete: []
});

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_AUTH(state, payload) {
    state.isAuth = true
    state.authUserComplete = payload
  },
  SET_LOGOUT(state){
    state.isAuth = false
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
  }, payload) {
    commit('SET_AUTH', payload)
  }
};
export const getters = {
  authUser: s => s.user,
  isAuth: s => s.isAuth,
  authUserComplete: s => s.authUserComplete,
}
