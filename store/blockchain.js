export const state = () => ({
  blockchain: [],
  blockchains: []
});

export const mutations = {
  SET_BLOCK(state, block) {
    state.blockchain.push(block);
  }
};

export const actions = {
  sendData({
    commit
  }, payload) {
    console.log(payload)
    commit('SET_BLOCK', payload)
  }
};
export const getters = {
    blockchain: s => s.blockchain,
}
