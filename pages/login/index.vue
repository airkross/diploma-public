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
    <br><br>
    <h4>Выбрать Пользователя:</h4>
    <b-alert show class="my-2" v-if="users[0]">
      ФИО: {{users[0].full_name}} <br>
      Должность: {{users[0].user_type}} <br>
      <button class="btn btn-primary" @click="getUser(0)">
        Выбрать
      </button>
    </b-alert>
    <b-alert show class="my-2" v-if="users[1]">
      ФИО: {{users[1].full_name}} <br>
      Должность: {{users[1].user_type}} <br>
      <button class="btn btn-primary" @click="getUser(1)">
        Выбрать
      </button>
    </b-alert>
    <b-alert show class="my-2" v-if="users[1]">
      ФИО: {{users[2].full_name}} <br>
      Должность: {{users[2].user_type}} <br>
      <button class="btn btn-primary" @click="getUser(2)">
        Выбрать
      </button>
    </b-alert>
    <b-alert show class="my-2" v-if="users[2]">
      ФИО: {{users[3].full_name}} <br>
      Должность: {{users[3].user_type}} <br>
      <button class="btn btn-primary" @click="getUser(3)">
        Выбрать
      </button>
    </b-alert>
    <b-alert show class="my-2" v-if="users[2]">
      ФИО: {{users[4].full_name}} <br>
      Должность: {{users[4].user_type}} <br>
      <button class="btn btn-primary" @click="getUser(4)">
        Выбрать
      </button>
    </b-alert>
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
    getUser(index){
      this.login.email = this.users[index].email 
      this.login.password = this.users[index].password
    },
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
        this.setAuth(this.authUser()[0]);
        this.$router.push("/");
      } else {
        console.log("Неверная авторизация!");
      }
    },
  },
};
</script>