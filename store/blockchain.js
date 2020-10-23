export const state = () => ({
  blockchain: [],
  blockchains: []
});

export const mutations = {
  SET_BLOCK(state, payload) {
    state.blockchains[payload.index].blockchain.push(payload.data);
  },
  CLEAR_BLOCKCHAIN(state){
    state.blockchain = []
  },
  SET_BLOCKCHAIN_ID(state, blockchain){
    state.blockchains.push(blockchain)
  }
};

export const actions = {
  sendData({
    commit
  }, payload) {
    commit('SET_BLOCK', payload)
  },
  setBlockchainId({commit}, payload){
    commit('SET_BLOCKCHAIN_ID', payload)
  }
};
export const getters = {
    blockchain: s => s.blockchain,
    blockchains: s => s.blockchains,
}
