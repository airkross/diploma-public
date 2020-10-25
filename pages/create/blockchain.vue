<template>
  <div class="container">
    <h1>Создать отправление</h1>
    <hr />
    <h4>Введите название отправления</h4>
    <input
      type="text"
      v-model="nameOfSend"
      placeholder="Название отправления"
      class="name-of-send mt-2"
      @keyup.enter="createBlockchain()"
    /><br />
    <button class="btn btn-primary mt-3" @click="createBlockchain()">
      Создать отправление
    </button>
  </div>
</template>

<script>
import sha256 from "crypto-js/sha256";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      nameOfSend: "",
    };
  },
  methods: {
    createBlockchain() {
      if(!this.nameOfSend){
        alert('Введите название отправления!')
        return
      }
      this.setBlockchainId({
        id: this.blockchains().length + 1,
        nameSend: this.nameOfSend,
        creater: this.authUserComplete(),
        date: new Date().toLocaleString(),
        blockchain: [
          {
            hash: sha256(0).toString(),
            previousHash: null,
            data: JSON.stringify({
              sender: {
                city: "",
                full_name: "",
                address: "",
                phone_number: "",
              },
              recipient: {
                city: "",
                full_name: "",
                address: "",
                phone_number: "",
              },
              departure: {
                fact_weight: "",
                volume_weight: "",
                price: "",
                state_departure: "",
              },
            }),
            date: new Date().toLocaleString(),
            createrBlock: this.authUserComplete()
          },
        ],
      });
      this.nameOfSend = "";
      alert('Отправление(Блокчейн) успешно создано!')
    },
    ...mapActions("blockchain", ["sendData", "setBlockchainId"]),
    ...mapGetters("blockchain", ["blockchain", "blockchains"]),
    ...mapGetters("auth", ["authUserComplete"]),
  },
};
</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.name-of-send {
  width: 50%;
}
</style>