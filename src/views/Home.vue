<template class="mt-16 white--text" style="margin: auto;">
  <v-container dark class="white--text" style="text-align: center">
    <h1 class="mt-16">Shorten your URL</h1>

    <v-form
      class="mt-12"
      :style="{
        width: $vuetify.breakpoint.smAndDown ? '100%' : '80%',
        margin: 'auto',
      }"
    >
      <v-text-field
        label="Long URL"
        :rules="urlRule"
        hint="Your long URL"
        v-model="form.url"
        tabindex="1"
        type="url"
        dark
        clearable
        class="my-2"
      ></v-text-field>
      <v-text-field
        label="Short URL Slug"
        :rules="slugRule"
        hint="This will be the bit after the slash in tny.ie"
        v-model="form.slug"
        tabindex="2"
        :disabled="!this.loggedIn"
        append-icon="mdi-dice-multiple"
        @click:append="genSlug"
        dark
        clearable
        prefix="tny.ie/"
        counter
        class="my-2"
        :style="{
          width: $vuetify.breakpoint.smAndDown ? '100%' : '60%',
          margin: 'auto',
        }"
      ></v-text-field>

      <div class="d-flex justify-space-between">
        <v-text-field
          label="Unlock date"
          :disabled="!loggedIn"
          v-model="unlock_time.date"
          type="date"
          style="max-width: 40%;"
          class="mx-4"
          dark
        ></v-text-field>
        <v-text-field
          label="Unlock time"
          v-model="unlock_time.time"
          type="time"
          :disabled="!loggedIn && unlock_time.date == ''"
          style="max-width: 40%;"
          class="mx-4"
          dark
        ></v-text-field>
      </div>

      <v-text-field
        label="Optional Password"
        v-model="form.password"
        :disabled="!loggedIn"
        tabindex="2"
        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show2 ? 'text' : 'password'"
        @click:append="show2 = !show2"
        dark
        clearable
        class="my-2"
        counter
        :style="{
          width: $vuetify.breakpoint.mdAndDown ? '100%' : '60%',
          margin: 'auto',
        }"
      ></v-text-field>
      <v-btn
        @click="clickBtn"
        color="primary"
        class="mt-4"
        style="margin: auto"
      >
        Create Short URL
      </v-btn>
    </v-form>
    <h1 v-show="!loggedIn" dark class="mt-12">
      Log in to get extra features, such as protected links, and unlock times.
    </h1>

    <v-dialog v-model="dialog" width="500" dark>
      <v-card>
        <v-card-title class="headline warning lighten-2">
          Warning
        </v-card-title>

        <v-card-text class="my-3">
          Notice: This project is a work-in-progress, and as such I offer no
          guaruntees of reliability until this project has been stable for a
          while.
        </v-card-text>

        <v-card-text> Continue at your own risk </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false"> Cancel </v-btn>
          <v-btn color="primary" text @click="submitUrl"> Continue </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      timout="200"
    >{{ snackbarStatus }}</v-snackbar>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

import { links } from "../api/api";

const URLValidator = new RegExp(
  "^" +
    // protocol identifier (optional)
    // short syntax // still required
    "(?:(?:(?:https?|ftp):)?\\/\\/)" +
    // user:pass BasicAuth (optional)
    "(?:\\S+(?::\\S*)?@)?" +
    "(?:" +
    // IP address exclusion
    // private & local networks
    "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
    "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
    "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
    // IP address dotted notation octets
    // excludes loopback network 0.0.0.0
    // excludes reserved space >= 224.0.0.0
    // excludes network & broadcast addresses
    // (first & last IP address of each class)
    "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
    "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
    "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
    "|" +
    // host & domain names, may end with dot
    // can be replaced by a shortest alternative
    // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
    "(?:" +
    "(?:" +
    "[a-z0-9\\u00a1-\\uffff]" +
    "[a-z0-9\\u00a1-\\uffff_-]{0,62}" +
    ")?" +
    "[a-z0-9\\u00a1-\\uffff]\\." +
    ")+" +
    // TLD identifier name, may end with dot
    "(?:[a-z\\u00a1-\\uffff]{2,}\\.?)" +
    ")" +
    // port number (optional)
    "(?::\\d{2,5})?" +
    // resource path (optional)
    "(?:[/?#]\\S*)?" +
    "$",
  "i"
);

const SlugValidator = new RegExp("^[a-zA-Z0-9-]*$");
const XSSValiator = new RegExp("^javascript:.*$");
export default Vue.extend({
  name: "Home",
  props: ["loggedIn"],
  computed: {
    slugRule() {
      return [
        (v: string) => {
          return SlugValidator.test(v) || "Invalid Slug";
        },
        (v: string) => {
          return (
            v.length > 5 ||
            v.length === 0 ||
            "Custom slugs must be at least 6 characters"
          );
        },
      ];
    },
    urlRule() {
      return [
        (v: string) => !!v || "URL required",
        (v: string) => {
          return !XSSValiator.test(v) || "Naughty Boi";
        },
        (v: string) => {
          return URLValidator.test(v) || "Invalid URL";
        },
      ];
    },
  },
  methods: {
    resetTime() {
      this.unlock_time.date = "";
      this.unlock_time.time = "";
      this.timedialog = false;
    },
    clickBtn() {
      console.log(this.unlock_time.date);
      console.log(this.unlock_time.time);

      this.form.unlock_time =
        Date.parse(this.unlock_time.date + " " + this.unlock_time.time) / 1000;
      this.dialog = true;
      console.log(this.form.unlock_time);
    },
    async submitUrl() {
      this.loadingResponse = true;
      const response = await links.CreateLink(this.form);
      if (response[1] == false) {
        this.snackbarStatus = "Created new link with slug \""+ (await response[0]).slug + "\""
      } else {
        this.snackbarStatus = "Failed to create link."
      }
      this.dialog = false;
      this.snackbar = true;
    },
    genSlug() {
      const chars =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-";
      this.slug = "";
      for (let i = 0; i < 6; i++) {
        this.slug = this.slug + chars[Math.floor(Math.random() * 62)];
      }
    },
  },
  data() {
    return {
      dialog: false,
      show2: false,
      snackbar: false,
      snackbarStatus: "",
      form: {
        url: "",
        slug: "",
        date: "",
        unlock_time: 0,
      },
      unlock_time: {
        date: "",
        time: "",
      },
      passdialog: false,
      timedialog: false,
      url: "",
      slug: "",
      response: true,
      loadingResponse: false,
      responseURL: "",
      responseSlug: "",
    };
  },
});
</script>
