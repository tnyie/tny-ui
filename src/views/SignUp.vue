<template class="mt-16 white--text" style="margin: auto;">
  <v-container dark class="white--text" style="text-align: center;">
    <h1 class="mt-16">Sign up for Tny.ie</h1>

    <v-form
      class="mt-12"
      :style="{
        width: $vuetify.breakpoint.smAndDown ? '100%' : '80%',
        margin: 'auto'
      }"
    >
      <v-text-field
        label="Username"
        v-model="form.username"
        autofocus
        aria-autocomplete="off"
        :rules="required"
        tabindex="1"
        dark
        clearable
        class="my-2"
        :style="{
            width: $vuetify.breakpoint.mdAndDown ? '100%' : '60%',
            margin: 'auto'  
        }"
      ></v-text-field>
      <v-text-field
        label="Email"
        :rules="required.concat(emailRule)"
        v-model="form.email"
        tabindex="1"
        dark
        clearable
        class="my-2"
        :style="{
            width: $vuetify.breakpoint.mdAndDown ? '100%' : '60%',
            margin: 'auto'  
        }"
      ></v-text-field>
      <v-text-field
        label="Password"
        :rules="required"
        v-model="form.password"
        tabindex="2"
        :disabled="this.loggedIn"
        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show2 ? 'text' : 'password'"
        @click:append="show2 = !show2"
        dark
        clearable
        class="my-2"
        :style="{
          width: $vuetify.breakpoint.mdAndDown ? '100%' : '60%',
          margin: 'auto'
        }"
      ></v-text-field>
      <v-btn class="mt-4 mr-4" style="margin: auto;"
      >Sign in</v-btn>
      <v-btn color="primary" class="mt-4" style="margin: auto;"
        @click="submit"
      >Create your account</v-btn>
    </v-form>
    <p
      class="mt-12 warning--text"

      v-show="error"
    >{{error}}</p>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from 'firebase'

const emailValidator = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")

export default Vue.extend({
  name: "Home",
  props: ["loggedIn"],
  computed: {
    required () {
      return [
        (v: string) => !!v || "field required"
      ]
    },
    emailRule () {
      return [
        (v: string) => {
          return emailValidator.test(v) || "Invalid Email";
        }
      ];
    },
  },
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: ""
      },
      error: null,
      show2: false
    };
  },
  methods: {
    submit () {
      fetch("https://tny.ie/api/users", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.form.username,
          email: this.form.email,
          password: this.form.password
        })
      })
    }
  },
});
</script>
