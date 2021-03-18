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
        to="/login"
      >Sign in</v-btn>
      <v-btn color="primary" class="mt-4" style="margin: auto;"
        @click="clickBtn"
      >Create your account</v-btn>
    </v-form>
    <p
      class="mt-12 warning--text"

      v-show="error"
    >{{error}}</p>


    
    <v-dialog
      v-model="dialog"
      width="500"
      dark
    >
      <v-card>
        <v-card-title class="headline warning lighten-2">
          Warning
        </v-card-title>

        <v-card-text class="my-3">
          Notice: This project is a work-in-progress, and as such I offer no
          guaruntees of reliability until this project has been stable for a while.
          Do <strong>NOT</strong> use a common password and use a placeholder email address like
          <pre class="ma-4"><code class="primary--text">test@test.com</code></pre>
        </v-card-text>
        
        <v-card-text>
          Continue at your own risk.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="submit"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

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
      dialog: false,
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
    clickBtn () {
      this.dialog = true
    },
    submit () {
      fetch("http://localhost:8888/api/users", {
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
