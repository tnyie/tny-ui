<template>
  <v-container
    dark
    class="white--text mb-12"
    style="width: 100%; text-align: center"
  >
    <h1 class="mt-16 mb-16">Enter password to redirect</h1>
    <p style="color: #f11" v-text="this.form.error"></p>
    <v-text-field
      label="Password"
      v-model="form.password"
      tabindex="0"
      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show2 ? 'text' : 'password'"
      @click:append="show2 = !show2"
      dark
      clearable
      class="my-2"
      :style="{
        width: $vuetify.breakpoint.mdAndDown ? '100%' : '60%',
        margin: 'auto',
      }"
    ></v-text-field>
    <v-btn color="primary" @click="submit"> Submit </v-btn>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { links } from "../api/api";

export default Vue.extend({
  name: "Redirect",
  data() {
    return {
      form: {
        password: "",
        error: "",
      },
      show2: false,
    };
  },
  methods: {
    async submit() {
      const path = window.location.href.split("/");
      const slug = path[path.length - 1];
      console.log(slug);
      const linkURL = await links.FetchAuthenticatedLinks(
        slug,
        this.form.password
      );
      console.log(linkURL);
      if (linkURL.data === undefined) {
        this.form.error = "Incorrect password";
      } else {
        window.location.href = linkURL.data;
      }
    },
  },
});
</script>
