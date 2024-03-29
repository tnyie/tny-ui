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
    path: "/redirect/:slug",
    name: "Redirect", 
    component: () => import("../views/Redirect.vue")
  },
  {
    path: "/changepassword/:token",
    name: "ChangePassword",
    component: () => import("../views/ChangePassword.vue")
  },
  {
    path: "/graph/:id",
    name: "Graph",
    component: () => import("../views/Graph.vue")
  },
  {
    path: "/stats",
    name: "Stats",
    component: () => import("../views/Stats.vue")
  },
  {
    path: "/privacy",
    name: "Privacy",
    component: () => import("../views/Privacy.vue")
  },
  {
    path: "/tos",
    name: "Tos",
    component: () => import("../views/Tos.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes
});

export default router;
