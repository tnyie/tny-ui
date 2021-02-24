import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi"
  },
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: "#009688",
        secondary: "#03a9f4",
        accent: "#8bc34a",
        error: "#f44336",
        warning: "#e91e63",
        info: "#2196f3",
        success: " #4caf50"
      },
      dark: {
        primary: '#03a9f4',
        secondary: '#03a9f4',
        accent: '#cddc39',
        error: '#f44336,',
        warning: '#ff9800',
        info: '#009688',
        success: '#4caf50'
        }
    }
  }
});
