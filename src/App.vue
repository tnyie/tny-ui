<template id="app">
  <v-app
    style="
    background-color: #121212;
    "
  >
    <Navbar v-on:logout="loggedIn = false" v-bind:loggedIn="loggedIn">
    </Navbar>
    <v-main>
        <router-view v-on:login="loggedIn = true" 
          :style="{width: $vuetify.breakpoint.mdAndDown ? '100%':'80%', margin: 'auto'}"
          v-bind:loggedIn="loggedIn">
        </router-view>
    </v-main>
    </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import {tokens} from "@/api/api"
import './global.css'

export default {
  name: "App",
  components: { Navbar },
  created () {
    this.checkLogin()
  },
  data() {
    return {
      loggedIn: false,
      token: ""
    }
  },
  mounted() {
    if (localStorage.token) {
      this.token = localStorage.token;
    }
  },
  watch: {
    token(newToken) {
      localStorage.token = newToken;
    }
  },
  methods: {
    async checkLogin () {
      if (localStorage.getItem("token") == null) {
        this.loggedIn = false;
        return
      }

      this.loggedIn = await tokens.CheckToken()
      if (!this.loggedIn) {
        // remove outdated token
        localStorage.removeItem("token")
      }
    },
    signOut () {
      localStorage.clear();
    }
  },
};
</script>
