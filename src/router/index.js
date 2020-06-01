import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: {
      name: "PokeGuia"
    }
  },
  {
    path: "/",
    name: "PokeGuia",
    component: () =>
      import(/* webpackChunkName: "logeo" */ "../views/PokeGuia.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
