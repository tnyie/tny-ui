import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import firebase from "firebase"

import  * as data from '@/firebase.json'

import "@/global.css";

const firebaseConfig = {
  apiKey: data.apiKey,
  authDomain: data.authDomain,
  projectId: data.projectId,
  storageBucket: data.storageBucket,
  messagingSenderId: data.messagingSenderId,
  appId: data.appId,
  measurementId: data.measurementId
};

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router: router,
  render: h => h(App)
}).$mount("#app");
