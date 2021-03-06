<template id="app">
  <v-app
    style="
    background-color: #121212;
    "
  >
    <Navbar v-on:logout="loggedIn = false" v-bind:loggedIn="loggedIn" v-bind:icon="icon">
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
  data() {
    return {
      loggedIn: this.checkLogin,
      icon: "mdi-account",
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
      if (this.token == "") {
        return false
      }
      fetch("https://tny.ie/api/token", {
        method: "GET",
        headers: {
          "Authorization": "Bearer "+ this.token
        }
      }).then(data => {
        return data.json()
      }).then(data => {
        if (data.user_id && typeof(data.user_id) == String) {
          return true
        }     
      })
    },
    signOut () {
      localStorage.removeItem("token");
    }
  },
};

</script>
