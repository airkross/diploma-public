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
            <nuxt-link exact active-class="active" class="nav-link" to="/"
              >Главная
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link active-class="active" class="nav-link" to="/create"
              >Создать отправление</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link active-class="active" class="nav-link" to="/blockchain"
              >Текущий Blockchain</nuxt-link
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
    <div class="auth-user" v-if="isAuth()">
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
import { mapGetters } from "vuex";
export default {
  methods: {
    ...mapGetters("auth", ["authUser", "isAuth"]),
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