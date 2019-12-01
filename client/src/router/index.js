import Vue from "vue";
import VueRouter from "vue-router";
import Splash from "@/views/Splash.vue";
import Login from "../views/Login.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "splash",
    component: Splash
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import(/* webpackChunkName: 'signup' */ "@/views/Signup.vue")
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: 'dashboard' */ "@/views/Dashboard.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/create",
    name: "create",
    component: () =>
      import(/* webpackChunkName: 'dashboard' */ "@/views/Create.vue"),
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.user) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
