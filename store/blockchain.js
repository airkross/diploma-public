import sha256 from "crypto-js/sha256";
export const state = () => ({
  blockchain: [],
  blockchains: [],
  blockchainsCheckList: [],
  checkLast: []// {1,2},{2,2}
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
  DATA_INTEGRITY_CHECK(state){// 1 2
    let answersArray = [], blockcahinsAnswers = [], callsArray = []
    state.blockchains.forEach((blockchain, index) => {
      if(blockchain.blockchain.length > 1){
        answersArray = []
        blockchain.blockchain.forEach((block, index1) =>{
          if(index1 && index1 < blockchain.blockchain.length - 1){
            if(blockchain.blockchain[index1].hash ===  blockchain.blockchain[index1 + 1].previousHash){
              answersArray.push({message: `В блоке №${index1} изменений не найдено! :)`})
            }else{
              answersArray.push({message: `В блоке №${index1} найдены изменения! :(`})
            }
          } else if(index1 && index1 == blockchain.blockchain.length - 1){
            let flag = false
            if(state.checkLast.length){
              for(let key in state.checkLast){// {1,1} / {1,1},{2,1}
                if((index + 1) == state.checkLast[key].blockchainInput && index1 == state.checkLast[key].blockInput){
                  flag = true
                  // answersArray.push({message: `В блоке №${index1} найдены изменения! :(`})
                  break
                }else{
                  // answersArray.push({message: `В блоке №${index1} изменений не найдено! :)`})
                }
              }
              flag ? answersArray.push({message: `В блоке №${index1} найдены изменения! :(`}) : answersArray.push({message: `В блоке №${index1} изменений не найдено! :)`})
            } else{
              answersArray.push({message: `В блоке №${index1} изменений не найдено! :)`})
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
  CORRECT_DATA_IN_BLOCK(state, payload){//1 2
    if(state.blockchains[payload.blockchainInput - 1] && state.blockchains[payload.blockchainInput - 1].blockchain[payload.blockInput]){
      if(state.blockchains[payload.blockchainInput - 1].blockchain.length == (+payload.blockInput + 1)){
        state.checkLast.push({blockchainInput: payload.blockchainInput, blockInput: payload.blockInput})
      }else {
        state.blockchains[payload.blockchainInput - 1].blockchain[payload.blockInput].hash = sha256('').toString()
      }
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
