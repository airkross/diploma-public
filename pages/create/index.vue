<template>
  <div class="container">
    <b-alert show class="my-5"
      >На данной странице представлен пример создания отправления</b-alert
    >
    <transition name="fade">
      <button class="btn btn-primary" @click="createBlockchain()" v-if="!show">
        Заполнить информацию
      </button>
    </transition>

    <transition name="fade">
      <div class="form" v-if="show">
        <h1 class="col-12 d-flex justify-content-center my-5">
          Создание отправления
        </h1>
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
            <label>Адрес отправителя</label>
            <input
              type="text"
              class="form-control"
              placeholder="Адрес отправителя"
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
              v-model="formData.departure.phone_number"
            />
          </div>
          <div class="form-group">
            <label>Вес объема</label>
            <input
              type="text"
              class="form-control"
              placeholder="Вес объема"
              v-model="formData.departure.fact_weight"
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
          Создать отправление (Цепочку)
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import sha256 from "crypto-js/sha256";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      show: false,
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
    createBlockchain() {
      this.show = !this.show;
      if (!this.blockchain().length) {
        this.sendData({
          hash: sha256(0).toString(),
          previousHash: null,
          data: JSON.stringify(this.formData),
          date: new Date().toLocaleString(),
        });
      }
    },
    onSubmit() {
      this.sendData({
        previousHash: this.blockchain()[this.blockchain().length - 1].hash,
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
      });
    },
    ...mapActions("blockchain", ["sendData"]),
    ...mapGetters("blockchain", ["blockchain"]),
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