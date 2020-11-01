<template>
  <div class="container pt-3">
    <h2>Поиск отправления</h2>
    <hr />
    <div class="search-block">
      <!-- <pre>
          {{blockchains()}}
        </pre> -->
      <strong>ID Блокчейнa:</strong> <br />
      <input
        type="text"
        v-model="searchBlockchain"
        placeholder="Введите ID блокчейна"
      />
      <br />
    </div>
    <div
      class="all-info-about-blockchain"
      v-if="blockchains()[searchBlockchain - 1] && searchBlockchain.length"
    >
      <div class="d-flex">
        <h6>Идентификатор Блокчейна:</h6>
        {{ searchBlockchain }} <br />
      </div>
      <div class="d-flex">
        <h6>Название Блокчейна:</h6>
        {{ blockchains()[searchBlockchain - 1].nameSend }}<br />
      </div>
      <div class="creater pl-3 pt-3 pb-3">
        <div class="d-flex">
          <h6>Идентификатор создателя цепи:</h6>
          {{ blockchains()[searchBlockchain - 1].creater.id }}<br />
        </div>
        <div class="d-flex">
          <h6>Занимаемая должность:</h6>
          {{ blockchains()[searchBlockchain - 1].creater.user_type }}<br />
        </div>
        <div class="d-flex">
          <h6>Электронная почта:</h6>
          {{ blockchains()[searchBlockchain - 1].creater.email }}<br />
        </div>
        <div class="d-flex">
          <h6>ФИО:</h6>
          {{ blockchains()[searchBlockchain - 1].creater.full_name }}<br />
        </div>
        <div class="d-flex">
          <h6>Фото:</h6>
          <img
            :src="blockchains()[searchBlockchain - 1].creater.photo"
            alt="Фото создателя цепи"
            class="creater-img"
          />
        </div>
      </div>
      <div class="d-flex">
        <h6>Дата и время создания:</h6>
        {{ blockchains()[searchBlockchain - 1].date }}<br />
      </div>
      <div class="d-flex">
        <h6>Кол-во блоков в цепи:</h6>
        {{ blockchains()[searchBlockchain - 1].blockchain.length - 1}}<br />
      </div>
      <div class="row pt-5" v-if="blockchains().length">
        <div
          class="col-4 mb-3"
          v-for="(block, index) in blockchains()[searchBlockchain - 1].blockchain.length ? blockchains()[searchBlockchain - 1].blockchain : []"
          :key="index"
        >
          <Card :block="block" :index="index" v-if="blockchains()[searchBlockchain - 1].blockchain.length - 1 > index"/>
        </div>
      </div>
      <b-alert show class="my-5" v-else>На данный момент блоков нет!</b-alert>
    </div>
    <b-alert show class="my-5 d-flex justify-content-center" v-else
      >Введите ID отправления для совершения поиска!</b-alert
    >
  </div>
</template>

<script>
import sha256 from "crypto-js/sha256";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      show: false,
      searchBlockchain: "",
      foundedBlockchain: [],
      formData: {
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
      },
    };
  },
  methods: {
    onSubmit() {
      this.sendData({
        index: this.searchBlockchain - 1,
        data: {
          previousHash: this.blockchains()[this.searchBlockchain - 1]
            .blockchain[
            this.blockchains()[this.searchBlockchain - 1].blockchain.length - 1
          ].hash,
          hash: sha256(
            this.formData.sender.city +
              this.formData.sender.full_name +
              this.formData.sender.address +
              this.formData.sender.phone_number +
              this.formData.recipient.city +
              this.formData.recipient.full_name +
              this.formData.recipient.address +
              this.formData.recipient.phone_number +
              this.formData.departure.fact_weight +
              this.formData.departure.volume_weight +
              this.formData.departure.price +
              this.formData.departure.state_departure +
              new Date()
          ).toString(),
          data: JSON.stringify(this.formData),
          date: new Date().toLocaleString(),
          createrBlock: this.authUserComplete(),
        },
      });
      this.formData.sender.city = "";
      this.formData.sender.full_name = "";
      this.formData.sender.address = "";
      this.formData.sender.phone_number = "";
      this.formData.recipient.city = "";
      this.formData.recipient.full_name = "";
      this.formData.recipient.address = "";
      this.formData.recipient.phone_number = "";
      this.formData.departure.fact_weight = "";
      this.formData.departure.volume_weight = "";
      this.formData.departure.price = "";
      this.formData.departure.phone_number = "";
      this.formData.departure.state_departure = "";
    },
    ...mapActions("blockchain", ["sendData"]),
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
</style>