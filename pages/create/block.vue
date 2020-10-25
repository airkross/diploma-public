<template>
  <div class="container pt-3">
    <h2>Страница добавления блока</h2>
    <hr />
    <div class="search-block">
      <strong>ID Блокчейнa:</strong> <br />
      <input
        type="text"
        v-model="searchBlockchain"
        placeholder="Введите ID блокчейна"
      />
      <br />
    </div>
    <div class="form" v-if="blockchains()[searchBlockchain - 1] ? true : false">
      <div class="sender">
        <h2>Информация об Отправителе</h2>
        <div class="form-group">
          <label>Город</label>
          <input
            type="text"
            class="form-control"
            placeholder="Город"
            v-model="formData.sender.city"
          />
        </div>
        <div class="form-group">
          <label>ФИО</label>
          <input
            type="text"
            class="form-control"
            placeholder="ФИО"
            v-model="formData.sender.full_name"
          />
        </div>
        <div class="form-group">
          <label>Адрес отправителя</label>
          <input
            type="text"
            class="form-control"
            placeholder="Адрес отправителя"
            v-model="formData.sender.address"
          />
        </div>
        <div class="form-group">
          <label>Телефон</label>
          <input
            type="text"
            class="form-control"
            placeholder="Телефон"
            v-model="formData.sender.phone_number"
          />
        </div>
      </div>
      <div class="recipient">
        <h2>Информация о Получателе</h2>
        <div class="form-group">
          <label>Город</label>
          <input
            type="text"
            class="form-control"
            placeholder="Город"
            v-model="formData.recipient.city"
          />
        </div>
        <div class="form-group">
          <label>ФИО</label>
          <input
            type="text"
            class="form-control"
            placeholder="ФИО"
            v-model="formData.recipient.full_name"
          />
        </div>
        <div class="form-group">
          <label>Адрес получателя</label>
          <input
            type="text"
            class="form-control"
            placeholder="Адрес получателя"
            v-model="formData.recipient.address"
          />
        </div>
        <div class="form-group">
          <label>Телефон</label>
          <input
            type="text"
            class="form-control"
            placeholder="Телефон"
            v-model="formData.recipient.phone_number"
          />
        </div>
      </div>
      <div class="departure">
        <h2>Информация об отправлении</h2>
        <div class="form-group">
          <label>Фактический вес</label>
          <input
            type="text"
            class="form-control"
            placeholder="Фактический вес"
            v-model="formData.departure.fact_weight"
          />
        </div>
        <div class="form-group">
          <label>Вес объема</label>
          <input
            type="text"
            class="form-control"
            placeholder="Вес объема"
            v-model="formData.departure.volume_weight"
          />
        </div>
        <div class="form-group">
          <label>Оглашенная стоимость</label>
          <input
            type="text"
            class="form-control"
            placeholder="Оглашенная стоимость"
            v-model="formData.departure.price"
          />
        </div>
        <div class="form-group">
          <label>Состояние отправления</label>
          <textarea
            class="form-control"
            rows="3"
            v-model="formData.departure.state_departure"
          ></textarea>
        </div>
      </div>
      <button class="btn btn-primary mb-5" @click="onSubmit()">
        Добавить блок
      </button>
    </div>
    <b-alert show class="my-5 d-flex justify-content-center" v-else
      >Введите ID существующего блокчейна для доступа к полям блока.</b-alert
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
      if(
        !this.formData.sender.city ||
        !this.formData.sender.full_name ||
        !this.formData.sender.address ||
        !this.formData.sender.phone_number ||
        !this.formData.recipient.city ||
        !this.formData.recipient.full_name ||
        !this.formData.recipient.address ||
        !this.formData.recipient.phone_number ||
        !this.formData.departure.fact_weight ||
        !this.formData.departure.volume_weight ||
        !this.formData.departure.price ||
        !this.formData.departure.state_departure 
      ){
        alert('Заполните все поля!')
        return
      }
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
          createrBlock: this.authUserComplete()
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