import sha256 from "crypto-js/sha256";
export const state = () => ({
  blockchain: [],
  blockchains: [],
  blockchainsCheckList: []
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
  },
  DATA_INTEGRITY_CHECK(state){
    let answersArray = [], blockcahinsAnswers = [], callsArray = []
    state.blockchains.forEach((blockchain, index) => {
      if(blockchain.blockchain.length > 1){
        answersArray = []
        blockchain.blockchain.forEach((block, index1) =>{
          if(index1){
            if(blockchain.blockchain[index1].previousHash ===  blockchain.blockchain[index1-1].hash){
              answersArray.push({message: `В блоке №${index1 - 1} изменений не найдено! :)`})
            }else{
              answersArray.push({message: `В блоке №${index1 - 1} найдены изменения! :(`})
            }
          }
        })
        console.log('массив ответов по блокчейну', answersArray)
        answersArray.blockchainId =  blockchain.id
        blockcahinsAnswers.push(answersArray)
      }
    });
    blockcahinsAnswers.blockcahinsAnswersId = state.blockchainsCheckList.length
    blockcahinsAnswers.date = new Date().toLocaleString()
    state.blockchainsCheckList.push(blockcahinsAnswers)
  },
  CORRECT_DATA_IN_BLOCK(state, payload){
    console.log(state.blockchains[payload.blockchainInput - 1])
    if(state.blockchains[payload.blockchainInput - 1] && state.blockchains[payload.blockchainInput - 1].blockchain[payload.blockInput]){
      state.blockchains[payload.blockchainInput - 1].blockchain[payload.blockInput].hash = sha256('').toString()
    }else{
      alert('Введены некорректные данные!')
    }
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
  },
  setDataIntegrityCheck({commit, state}, payload){
    commit('DATA_INTEGRITY_CHECK')
  },
};

export const getters = {
    blockchain: s => s.blockchain,
    blockchains: s => s.blockchains,
    blockchainsCheckList: s => s.blockchainsCheckList,
}
