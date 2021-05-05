import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import QrPage from "../views/Qrpage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/qrpage",
    name: "QrPage",
    component: QrPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
