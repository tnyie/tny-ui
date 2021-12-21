<template class="mt-16 white--text" style="margin: auto;">
  <v-container dark class="white--text" style="text-align: center">
    <h1 class="mt-16">Sign in to Tny.ie</h1>

    <v-form
      class="mt-12"
      :style="{
        width: $vuetify.breakpoint.smAndDown ? '100%' : '80%',
        margin: 'auto'
      }"
    >
      <p style="color: #f33;" v-text="this.form.error"></p>
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

      <v-dialog v-model="dialog" width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mt-4 mr-4"
            style="margin: auto"
            v-bind="attrs"
            v-on="on"
          >
            Forgot Password
          </v-btn>
        </template>

        <v-card dark class="pa-4">
          <v-card-title>Password Reset</v-card-title>

          <v-card-text>
            To reset password, we need to send a link to your email address to
            verify that it's you.
          </v-card-text>
          <v-text-field
            autofocus
            label="Email"
            v-model="passwordreset.email"
            :rules="required.concat(emailRule)"
            dark
            clearable
            class="my-2"
            :style="{
              width: $vuetify.breakpoint.smAndDown ? '100%' : '60%',
              margin: 'auto'
            }"
          ></v-text-field>

          <v-btn
            color="primary"
            class="my-4"
            width="100%"
            @click="requestPasswordReset"
            style="margin: auto; width: 50%; left: 0; display: block;"
          >
            Send password reset request
          </v-btn>
        </v-card>
      </v-dialog>
      <v-switch v-model="rememberme" class="mt-4" style="margin: auto; width: 50%" dark label="Remember me">
      </v-switch>
      <v-btn color="primary" class="mt-4" style="margin: auto" @click="submit"
        >Login</v-btn
      >
    </v-form>
    <p class="mt-12 warning--text" v-show="error">{{ error }}</p>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { tokens, users } from "@/api/api";

const emailValidator = new RegExp(
  "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
);

export default Vue.extend({
  name: "Home",
  props: ["loggedIn"],
  data() {
    return {
      rememberme: false,
      form: {
        email: "",
        password: "",
        error: "",
      },
      passwordreset: {
        email: ""
      },
      error: null,
      show2: false,
      dialog: false
    };
  },
  computed: {
    required() {
      return [(v: string) => !!v || "field required"];
    },
    emailRule() {
      return [
        (v: string) => {
          return emailValidator.test(v) || "Invalid Email";
        }
      ];
    }
  },
  methods: {
    async submit() {
      let token
      if (this.rememberme) {
        token = "Key "
        token += await tokens.GetAPIKey(this.form)
      } else {
        token = "Bearer "
        const output = await tokens.Login(this.form)
        // if output is of type string
        if (typeof output === "string") {
          token += output
        } else {
          this.form.error = "Invalid email address or password"
          return
        }
      }
      if (token != "") {
        localStorage.setItem("token", token);
        window.location.href = "/";
      }
    },
    async requestPasswordReset() {
      const sent = await users.PasswordResetRequest(this.passwordreset.email)

      if (sent) {
        window.location.href="/"
      }
    }
  }
});
</script>
