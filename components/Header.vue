<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="nav-left">
      <nuxt-link class="navbar-brand" to="/">Diploma</nuxt-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <!-- видят все -->
            <nuxt-link exact active-class="active" class="nav-link" to="/"
              >Главная
            </nuxt-link>
          </li>
          <!-- админ и работник -->
          <li class="nav-item" v-if="
            isAuth() && authUser()[0].user_type === 'admin' || 
            isAuth() && authUser()[0].user_type === 'employee'
          ">
            <nuxt-link active-class="active" class="nav-link" to="/blockchains"
              >Список Блокчейнов</nuxt-link
            >
          </li>
          <!-- только админ -->
          <li class="nav-item" v-if="isAuth() && authUser()[0].user_type === 'admin'">
            <nuxt-link active-class="active" class="nav-link" to="/create/blockchain"
              >Создать отправление</nuxt-link
            >
          </li>
          <!-- админ и работник -->
          <li class="nav-item" v-if="isAuth() && authUser()[0].user_type === 'admin' || isAuth() && authUser()[0].user_type === 'employee'">
            <nuxt-link active-class="active" class="nav-link" to="/create/block"
              >Добавить блок</nuxt-link
            >
          </li>
          <!-- админ и работник -->
          <li class="nav-item" >
            <nuxt-link active-class="active" class="nav-link" to="/search"
              >Поиск отправления</nuxt-link
            >
          </li>
          <li class="nav-item" >
            <nuxt-link active-class="active" class="nav-link" to="/integrity"
              >Целостность Блокчейнов</nuxt-link
            >
          </li>
          <li class="nav-item" >
            <nuxt-link active-class="active" class="nav-link" to="/documentation"
              >Документация</nuxt-link
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="nav-rigth" v-if="!isAuth()">
      <nuxt-link
        active-class="active"
        class="nav-link text-capitalize text-light"
        to="/login"
        >Авторизация</nuxt-link
      >
    </div>
    <div class="auth-user" v-if="isAuth()" @click="logout()">
      <div class="full-name">
        {{ authUser()[0].full_name }}
      </div>
      <div class="photo">
        <img :src="authUser()[0].photo" alt="" />
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  mounted(){
    setInterval(() => {
      if(this.blockchains().length){
        this.setDataIntegrityCheck()
      }
    }, 60000);
  },
  methods: {
    logout(){
      this.SET_LOGOUT()
      this.CLEAR_BLOCKCHAIN()
      this.$router.push('/login')
    },
    ...mapMutations("auth", ["SET_LOGOUT"]),
    ...mapMutations("blockchain", ["CLEAR_BLOCKCHAIN", "DATA_INTEGRITY_CHECK"]),
    ...mapActions("blockchain", ["setDataIntegrityCheck"]),
    ...mapGetters("auth", ["authUser", "isAuth"]),
    ...mapGetters("blockchain", ["blockchains"]),
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  .auth-user {
    display: flex;
    align-items: center;
    margin-left: auto;
    .full-name {
      color: white;
    }
    .photo {
      max-width: 30px;
      width: 100%;
      height: 30px;
      margin-left: 10px;
      img {
        border-radius: 50%;
        width: 100%;
      }
    }
  }
  .nav-left {
    display: flex;
  }
  .nav-rigth {
    margin-left: auto;
    p {
      margin-bottom: 0;
      cursor: pointer;
    }
  }
}
</style>