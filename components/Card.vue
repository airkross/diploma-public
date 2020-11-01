<template>
  <div class="card" style="width: 18rem">
    <div class="card-body">
      <div class="card-heade-wrap">
          <small>Блок №{{index}} {{index === 0 ? '(Genesis Block)' : ''}}</small>
        <h5 class="card-title">Хэш текущего блока: <small>{{ block.hash }} </small></h5>
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
          <div class="wrap-info" v-if="isShow">
             <h6 v-if="parseData ? parseData.sender.city : false">Информация об Отправителе:</h6>
            <hr v-if="parseData ? parseData.sender.city : false" />
            <p class="card-text" v-if="parseData ? parseData.sender.city : false">Город: {{ parseData.sender.city }}</p>
            <p class="card-text" v-if="parseData ? parseData.sender.city : false">ФИО: {{ parseData.sender.full_name }}</p>
            <p class="card-text" v-if="parseData ? parseData.sender.city : false">Адрес: {{ parseData.sender.address }}</p>
            <p class="card-text" v-if="parseData ? parseData.sender.city : false">Номер телефона: {{ parseData.sender.phone_number }}</p>
            <hr v-if=" parseData ? parseData.recipient.city : false" />
                <h6 v-if=" parseData ? parseData.recipient.city : false"> Информация о Получателе:</h6>
            <p class="card-text" v-if=" parseData ? parseData.recipient.city : false">Город: {{ parseData.recipient.city }}</p>
            <p class="card-text" v-if=" parseData ? parseData.recipient.city : false">ФИО: {{ parseData.recipient.full_name }}</p>
            <p class="card-text" v-if=" parseData ? parseData.recipient.city : false">Адрес: {{ parseData.recipient.address }}</p>
            <p class="card-text" v-if=" parseData ? parseData.recipient.city : false">Номер телефона: {{ parseData.recipient.phone_number }}</p>

            <hr v-if="parseData ? parseData.departure.fact_weight : false"/>
                <h6 v-if="parseData ? parseData.departure.fact_weight : false">Информация об Отправлении:</h6>
            <p class="card-text" v-if="parseData ? parseData.departure.fact_weight : false">Фактический вес: {{ parseData.departure.fact_weight }}</p>
            <p class="card-text" v-if="parseData ? parseData.departure.fact_weight : false">Вес по объему: {{ parseData.departure.volume_weight }}</p>
            <p class="card-text" v-if="parseData ? parseData.departure.fact_weight : false">Оглашенная цена: {{ parseData.departure.price }}</p>
            <p class="card-text" v-if="parseData ? parseData.departure.fact_weight : false">
              Состояние отправления: {{ parseData.departure.state_departure }}
            </p>
          </div>
          <div class="error-info" v-else>
            <hr>
            Произошла подмена данных!
          </div>
          <hr>
              <h6>Создатель блока:</h6>
          <p class="card-text">Идентификатор пользователя: {{ block.createrBlock.id }}</p>
          <p class="card-text">ФИО: {{ block.createrBlock.full_name }}</p>
          <p class="card-text">Email: {{ block.createrBlock.email }}</p>
          <p class="card-text">Фото:</p>
          <img :src="block.createrBlock.photo" alt="" style="width:100%">
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
  data(){
    return {
      isShow: true
    }
  },
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
      if(this.block.data === 'Произошла подмена данных!'){
        this.isShow = false
      }else if(this.block.data){
        return JSON.parse(this.block.data);
      }
    },
  },
};
</script>

<style scoped>
.error-info{
  text-transform: uppercase;
  text-align: center;
  font-weight: 700;
  font-size: 22px;
}
.card-body {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.card {
  height: 100%;
  width: 100% !important;
}
.card-text {
  margin-bottom: 0.5rem;
}
</style>