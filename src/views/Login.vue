<template class="mt-16 white--text" style="margin: auto;">
  <v-container dark class="white--text" style="text-align: center;">
    <h1 class="mt-16">Sign in to Tny.ie</h1>

    <v-form
      class="mt-12"
      :style="{
        width: $vuetify.breakpoint.smAndDown ? '100%' : '80%',
        margin: 'auto'
      }"
    >
      <v-text-field
        autofocus
        label="Email"
        v-model="form.email"
        :rules="required.concat(emailRule)"
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
      <v-btn  class="mt-4 mr-4
      " style="margin: auto;">
        Sign Up
      </v-btn>
      <v-btn color="primary" class="mt-4" style="margin: auto;"
        @click="submit"
      >Login</v-btn
      >
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
        email: "",
        password: ""
      },
      error: null,
      show2: false
    };
  },
  methods: {
    submit () {
      fetch("https://tny.ie/api/tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.form)
      }).then(data => {
        console.log(data)
        return data.json()
      })
      .then(response => {
        localStorage.setItem("token", response.token)
        console.log(response.token)
      })
  },
}})
</script>
