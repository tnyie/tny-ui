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

export default {
  name: "App",
  components: { Navbar },
  created () {
    console.log(this.loggedIn)
    console.log("bruh")
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
    checkLogin () {
      if (localStorage.getItem("token") == null) {
        console.log("no token")
        this.loggedIn = false;
        return
      }

      let response;

      fetch("http://localhost:8888/api/tokens", {
        method: "GET",
        headers: {
          "Authorization": "Bearer "+ localStorage.getItem("token")
        }
      }).then(data => {
        return data.json()
      }).then(data => {
        this.loggedIn = true;
      }).catch(error => {
        this.loggedIn = false;
      })
      console.log(response)
      this.loggedIn = response
    },
    signOut () {
      localStorage.clear();
    }
  },
};
</script>
