<template>
  <div class="card" style="width: 18rem">
    <div class="card-body">
      <div class="card-heade-wrap">
          <small>Блок №{{index}}</small>
        <h5 class="card-title">Хэш текущего блока: <small>{{ block.hash }}</small></h5>
        <h5 class="card-title">
          Хэш предыдущего блока:
         <small> {{
            block.previousHash
              ? block.previousHash
              : "Хэш функция предыдущего блока отсутствует!"
          }}</small>
        </h5>
      </div>
      <div class="card-content-wrap">
        <div class="card-body-wrap">
            <h6>Информация об Отправителе:</h6>
          <hr />
          <p class="card-text">Город: {{ parseData.sender.city }}</p>
          <p class="card-text">ФИО: {{ parseData.sender.full_name }}</p>
          <p class="card-text">Адрес: {{ parseData.sender.address }}</p>
          <p class="card-text">Номер телефона: {{ parseData.sender.phone_number }}</p>
          <hr />
              <h6>Информация о Получателе:</h6>
          <p class="card-text">Город: {{ parseData.recipient.city }}</p>
          <p class="card-text">ФИО: {{ parseData.recipient.full_name }}</p>
          <p class="card-text">Адрес: {{ parseData.recipient.address }}</p>
          <p class="card-text">Номер телефона: {{ parseData.recipient.phone_number }}</p>

          <hr />
              <h6>Информация об Отправлении:</h6>
          <p class="card-text">Фактический вес: {{ parseData.departure.fact_weight }}</p>
          <p class="card-text">Вес по объему: {{ parseData.departure.volume_weight }}</p>
          <p class="card-text">Оглашенная цена: {{ parseData.departure.price }}</p>
          <p class="card-text">
            Состояние отправления: {{ parseData.departure.state_departure }}
          </p>
        </div>
        <div class="card-footer-wrap">
          <hr />
          <h6 class="card-subtitle mb-2 text-muted">
            Дата публикации: {{ block.date }}
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    block: {
      type: Object,
      default: () => null,
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    parseData() {
      return JSON.parse(this.block.data);
    },
  },
};
</script>

<style scoped>
.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.card {
  height: 100%;
  width: 100% !important;
}
.card-text {
  margin-bottom: 0.5rem;
}
</style>