<template>
    <div class="container">
        <h2 class="pt-3">
            Детальная информация об отправлении № {{$route.params.id}}
        </h2>
        <hr>
        <nuxt-link class="btn btn-primary" to="/blockchains">
            Вернутся назад
        </nuxt-link>
        <hr>
        <div class="all-info-about-blockchain" v-if="blockchains().length">
                <div class="d-flex">
                <h6>Идентификатор Блокчейна:</h6> {{$route.params.id}} <br>
            </div>
            <div class="d-flex">
                <h6>Название Блокчейна:</h6>  {{blockchains()[$route.params.id - 1].nameSend}}<br>
            </div>
            <div class="creater pl-3 pt-3 pb-3">
                <div class="d-flex">
                    <h6>Идентификатор создателя цепи:</h6> {{blockchains()[$route.params.id - 1].creater.id}}<br>
                </div>
                <div class="d-flex">
                    <h6>Занимаемая должность:</h6> {{blockchains()[$route.params.id - 1].creater.user_type}}<br>
                </div>
                <div class="d-flex">
                    <h6>Электронная почта:</h6> {{blockchains()[$route.params.id - 1].creater.email}}<br>
                </div>
                <div class="d-flex">
                    <h6> ФИО:</h6> {{blockchains()[$route.params.id - 1].creater.full_name}}<br>
                </div>
                <div class="d-flex">
                    <h6>Фото:</h6> <img :src="blockchains()[$route.params.id - 1].creater.photo" alt="Фото создателя цепи" class="creater-img">
                </div>
            </div>
            <div class="d-flex">
                <h6>Дата и время создания:</h6> {{blockchains()[$route.params.id - 1].date}}<br>
            </div>
            <div class="d-flex">
                <h6>Кол-во блоков в цепи:</h6> {{blockchains()[$route.params.id - 1].blockchain.length}}<br>
            </div>
            <div class="row pt-5" v-if="blockchains().length">
                <div class="col-4 mb-3" v-for="(block, index) in blockchains()[$route.params.id - 1].blockchain" :key="index" >
                    <Card :block="block" :index="index" />
                </div>
            </div>
             <b-alert show class="my-5" v-else>На данный момент блоков нет!</b-alert>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
    methods:{
        ...mapGetters("blockchain", ["blockchains"]),
    }
}
</script>

<style scoped>
.creater-img{
    width: 200px;
    height: 200px;
}
h6{
    margin-bottom: 0;
}
</style>