<template>
  <v-dialog
    style="background-color: #303030; left: 0; right: 0;"
    v-model="dialog"
    width="800px"
    :fullscreen="$vuetify.breakpoint.xs"
    dark
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        style="height: 50px; font-size: 20px; margin: auto;"
        class="primary"
        v-bind="attrs"
        v-on="on"
      >
        New Link
      </v-btn>
    </template>
    <v-card style="width: 100%">
      <v-card-title>
        <h2>New Short URL</h2>
      </v-card-title>
      <v-card-text style="width: 100%" class="d-flex align-center justify-center">
        <v-form
          @submit="submitForm"
          v-model="valid"
          style="width: 100%; margin: auto;"
        >
          <v-text-field
            spellcheck="off"
            class="mb-6"
            tabindex="0"
            label="Your Long URL"
            v-model="url"
            ref="url"
            clearable
            :rules="urlRule"
          ></v-text-field>
          <v-text-field
            spellcheck="off"
            class="mt-6"
            style="width: 60%; display: inline"
            ref="slug"
            tabindex="1"
            label="Your Short URL"
            v-model="slug"
            prefix="tny.ie/"
            counter="true"
            :rules="slugRule"
            append-icon="mdi-dice-multiple"
            @click:append="genSlug"
          ></v-text-field>
          <v-btn h class="primary mt-6" @click="submitForm">
            Create Short URL
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";

interface Props {
  url: string;
  slug: string;
}

const postReq = async (data: Props) => {
  await fetch("https://api.tny.ie/api/link", {
    method: "POST",
    mode: "no-cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "text/plain"
    },
    body: JSON.stringify({
      url: data.url,
      slug: data.slug
    })
  }).then(data => {
    return data.json();
  });
};

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
  name: "PopupMenu",
  data() {
    return {
      url: "",
      slug: "",
      valid: false,
      dialog: false,
    };
  },
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
        }
      ];
    },
    urlRule() {
      return [
        (v: string) => !!v || "URL required",
        (v: string) => {
          return !XSSValiator.test(v) || "Naughty Boi";
        },
        (v: string) => {
          return URLValidator.test(v) || "Invalid Host";
        }
      ];
    }
  },

  methods: {
    genSlug() {
      const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-";
      this.slug = ""
      for (let i=0;i < 6;i++) {
        this.slug = this.slug + chars[Math.floor(Math.random() * 62)];
      }
    },

    async submitForm() {
      this.dialog = !this.dialog;
      await postReq({ url: this.url, slug: this.slug });
    }
  }
});
</script>
