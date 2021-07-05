<template class="mt-16 white--text" style="margin: auto;">
  <v-container dark class="white--text" style="text-align: center">
    <h1 class="mt-16 mb-16">Change Password</h1>
    <v-text-field
        label="Password"
        v-model="password1"
        :rules="required"
        tabindex="2"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
        dark
        clearable
        class="my-2"
        :style="{
          width: $vuetify.breakpoint.mdAndDown ? '100%' : '60%',
          margin: 'auto'
        }"
      ></v-text-field>
          <v-text-field
        label="Confirm Password"
        v-model="password2"
        :rules="required"
        tabindex="2"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
        dark
        clearable
        class="my-2"
        :style="{
          width: $vuetify.breakpoint.mdAndDown ? '100%' : '60%',
          margin: 'auto'
        }"
      ></v-text-field>
      <p v-show="this.error" style="color: #e52c22">Passwords do not match</p>
    <v-btn
      color="primary"
      @click="changePassword"
    >Change Password</v-btn>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

import { users } from "../api/api"

export default Vue.extend({
  name: "ChangePassword",
  data() {
    return {
      show: false,
      password1: "",
      password2: "",
      error: false,
    }
  },
  methods: {
    changePassword () {
      if (this.password1 != this.password2) {
        this.error = true
        return
      } else {
        this.error = false
        users.PasswordReset(this.$route.params.token, this.password1)
      }
    }
  },
  computed: {
    required() {
      return [(v: string) => !!v || "field required"];
    },
  }
});
</script>
