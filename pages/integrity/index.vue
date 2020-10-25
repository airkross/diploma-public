<template>
    <div class="container pt-5">
        <div class="message" v-if="!blockchainsCheckList.length">
            Если вы создали блокчейн, но его еще нет в чеклисте - подождите 60 секунд. / Если вы не создали блокчейн - создайте
        </div>
        <div class="list-wrap" v-else>
            <div class="list-wrap-left">
                <div class="integrity">
                    <vsa-list>
                        <vsa-item v-for="(call,index) in blockchainsCheckList" :key="index">
                            <vsa-heading>
                                <div class="wrap">
                                    <div class="left">
                                        Проверка целостности № {{call.blockcahinsAnswersId + 1}}
                                    </div>
                                    <div class="right">
                                        {{call.date}}
                                    </div>
                                </div>
                            </vsa-heading>

                            <vsa-content>
                                <div class="empty" v-if="!blockchainsCheckList[blockchainsCheckList.length - 1].length">
                                    Блокчейн/ы созданы, но в них не добавлены блоки!
                                </div>
                                <vsa-list v-for="(blockchain, index1) in blockchainsCheckList[index]" :key="index1" >
                                    <vsa-item>
                                        <vsa-heading>
                                            Блокчейн № {{blockchain.blockchainId}}
                                        </vsa-heading>

                                        <vsa-content>

                                            <vsa-list v-for="(blockchain, index2) in blockchainsCheckList[index][index1]" :key="index2">
                                                <vsa-item>
                                                    <vsa-heading>
                                                        Блок № {{index2 + 1}}
                                                    </vsa-heading>

                                                    <vsa-content>
                                                        {{blockchainsCheckList[index][index1][index2].message}} <br>
                                                    </vsa-content>
                                                </vsa-item>
                                            </vsa-list> 

                                        </vsa-content>
                                    </vsa-item>
                                </vsa-list>    

                            </vsa-content>
                        </vsa-item>
                    </vsa-list>
                </div>
            </div>
            <div class="list-wrap-right" v-if="blockchainsCheckList.length">
                <label for="blockchainInput">Введи номер блокчейна</label>
                <input type="text" id="blockchainInput" placeholder="Введи номер блокчейна"  v-model="blockchainInput">

                <label for="blockInput">Введи номер блока</label>
                <input type="text" id="blockInput" placeholder="Введи номер блока" v-model="blockInput">
                 <button class="btn btn-primary" @click="correctData()">
                    Изменить данные в блоке
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
export default {
    data(){
        return{
            blockchainInput: '',
            blockInput: '',
        }
    },
    computed:{
        ...mapGetters('blockchain',['blockchainsCheckList', 'blockchains']),
    },
    methods:{
        correctData(){
            if(this.blockchainInput.length && this.blockInput.length){
                if(this.blockchainInput != 0 && this.blockInput != 0){
                    this.CORRECT_DATA_IN_BLOCK({blockchainInput:this.blockchainInput, blockInput:this.blockInput})
                } else {
                    alert('Значения не могут быть равны Нулю!')
                }
            } else{
                alert('Заполните поля!')
            }
        },
        ...mapMutations('blockchain', ['CORRECT_DATA_IN_BLOCK'])
    }
}
</script>

<style scoped>
.wrap{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}
.left{
    max-width: 70%;
}
.right{
    max-width: 25%;
    margin-left: 5%;
}
.list-wrap{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}
.list-wrap-right{
    display: flex;
    flex-direction: column;
}
.message{
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    max-width: 700px;
    padding-top: 40px;
    margin-left: auto;
    margin-right: auto;
}
</style>