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
import firebase from "firebase"

export default {
  name: "App",
  components: { Navbar },
  methods: {
    signOut () {
      this.loggedIn = false;
    }
  },
  data() {
    return {
      loggedIn: false,
      icon:"mdi-account",
    };
  }
};
</script>
