import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import Home from "../views/Home.vue";
import Links from "../views/Link.vue";
import Login from "../views/Login.vue"
import SignUp from "../views/SignUp.vue"
import Account from "../views/Account.vue"
import Graph from "../views/Graph.vue"
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/account",
    name: "Account",
    component: Account
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
    name: "Logging",
    component: () =>
      import("../views/Login.vue")
  },
  {
    path: "/graph",
    name: "Graph",
    component: Graph
  }
];

console.log(process.env.API_KEY)

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes
});

export default router;
