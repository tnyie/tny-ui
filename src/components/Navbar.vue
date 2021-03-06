<template>
  <nav>
    <v-app-bar app flat dark fixed>
      <v-container>
        <v-row>
          <v-col>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"  v-show="$vuetify.breakpoint.mdAndDown"></v-app-bar-nav-icon>
          </v-col>
          <v-col>
            <v-flex style="height: 100%" class="d-flex align-center justify-center">
              <router-link to="/" tag="span" style="cursor: pointer">
                <v-toolbar-title>
                  Tny<span class="primary--text">URL</span>
                </v-toolbar-title>
              </router-link>
              <v-item-group v-show="$vuetify.breakpoint.mdAndUp" class="ml-6">
                <v-item v-for="link in links" :key="link.text">
                  <v-btn :to="link.route" text v-text="link.text"></v-btn>
                </v-item>
              </v-item-group>
            </v-flex>
          </v-col>
          <v-col>
            <v-btn v-show="loggedIn && $vuetify.breakpoint.mdAndUp" @click="signOut">Sign Out</v-btn>
            <v-btn to="/login" class="ma-2" v-show="!loggedIn && $vuetify.breakpoint.mdAndUp">Login</v-btn>
            <v-btn to="/signup" class="ma-2" v-show="!loggedIn && $vuetify.breakpoint.mdAndUp">Sign Up</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      width="60%"
      absolute
      dark
      temporary
    >
      <v-list>
        <v-list-item
          v-show="!loggedIn"
          to="/login"
          link
        >
          <v-list-item-icon>
            <v-icon>
            mdi-login
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            Login
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          v-show="!loggedIn"
          link
        >
          <v-list-item-icon>
            <v-icon>
            mdi-account-plus
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            Sign Up
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          v-show="loggedIn"
          link
        >
          <v-list-item-icon>
            <v-icon>
            mdi-logout
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            Log Out
          </v-list-item-title>
        </v-list-item>

        <v-list-item 
          v-show="loggedIn"
          link
          to="/"
        >
          <v-list-item-icon>
            <v-icon>
              mdi-home
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            Home
          </v-list-item-title>
        </v-list-item>

        <v-list-item
          v-show="loggedIn"
          link
          to="/links"
        >
          <v-list-item-icon>
            <v-icon>
              mdi-link
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            Links
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Navbar",
  props: ["icon", "loggedIn"],
  methods: {
    signOut() {
      
      this.$emit("logout")
    },
    logConsole() {
      localStorage.clear();
      console.log(this.loggedIn);
    },
  },
  data() {
    return {
      drawer: false,
      links: [
        { text: "Home", icon: "mdi-home", route: "/" },
        { text: "Links", icon: "mdi-link", route: "/links" },
      ],
    };
  },
});
</script>
