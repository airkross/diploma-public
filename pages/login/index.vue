<template>
  <div class="container pt-5">
    <form @submit.prevent="onSubmit()">
      <div class="form-group">
        <label>Email:</label>
        <input
          type="email"
          class="form-control"
          placeholder="Введите email"
          v-model="login.email"
          required
        />
      </div>
      <div class="form-group">
        <label>Пароль</label>
        <input
          type="text"
          class="form-control"
          placeholder="Введите пароль"
          v-model="login.password"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Вход</button>
    </form>
    <pre>
        {{ users }}
    </pre>
  </div>
</template>

<script>
import users from "../../static/users.json";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      users: [],
      login: {
        email: "",
        password: "",
      },
    };
  },
  fetch() {
    this.fetchData();
  },
  methods: {
    ...mapActions("auth", ["setUser", "setAuth"]),
    ...mapGetters("auth", ["authUser", "isAuth"]),
    fetchData() {
      this.users = users.users;
    },
    onSubmit() {
      //
      this.fetchData();
      for (let item in this.login) {
        this.users = this.users.filter(
          (user) => user[item] === this.login[item]
        );
      }
      if (this.users.length === 1) {
        this.setUser(this.users);
        this.setAuth();
        console.log(this.authUser())
        console.log(this.isAuth())
        this.$router.push("/");
      } else {
        console.log("Неверная авторизация!");
      }
    },
  },
};
</script>