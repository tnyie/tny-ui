import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import Home from "../views/Home.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/links",
    name: "Links",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Links.vue")
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () =>
      import("../views/SignUp.vue")
  },
  {
    path: "/login",
    name: "Loging",
    component: () =>
      import("../views/Login.vue")
  }
];

console.log(process.env.API_KEY)

const router = new VueRouter({
  mode: "history",
  base: "/ui",
  routes
});

export default router;
