/*
 * File: main.js
 * Project: Octavia-Admin-Pro
 * File Created: Tuesday, 28th June 2022 6:07:46 pm
 * Author: Naime Hossain & ui-lib -> https://ui-lib.com/ (support@ui-lib.com)
 * -----
 * Last Modified: Monday, 3rd October 2022 2:18:04 pm
 * Modified By: Naime Hossain & ui-lib -> https://ui-lib.com/ (support@ui-lib.com>)
 * -----
 * Copyright 2019 - 2022 ui-lib  , ui-lib  ( https://ui-lib.com/ )
 */

// Styles
import { createApp } from "vue";
// import axios from "axios";
import axios from "./utils/axios";
import VueAxios from "vue-axios"; //vue-axios를 import 해옴
import { initializeApp } from "firebase/app";
import vuetify from "./plugins/vuetify";
import { createRouter, createWebHistory } from "vue-router";
import VueApexCharts from "vue3-apexcharts";
// perfectscrollbar plugins
import PerfectScrollbar from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";
import App from "./App.vue";
import BaseCard from "./components/base/BaseCard.vue";
import "./plugins/script.js";
import "@/assets/styles/_main.scss";
import "@/assets/fonts/theiconof.css";
import { loadFonts } from "./plugins/webfontloader";
import { routes } from "./router/index";
// import store from "./store";
import store from "./vuex/store";
const firebaseConfig = {
  apiKey: "AIzaSyBkCO8RKIRCdT-PYVORAKhnVueLjKf_l-Q",
  authDomain: "vue3-auth-7b340.firebaseapp.com",
  projectId: "vue3-auth-7b340",
  storageBucket: "vue3-auth-7b340.appspot.com",
  messagingSenderId: "407565258165",
  appId: "1:407565258165:web:6317caced79c8486009dfc",
};
initializeApp(firebaseConfig);
loadFonts();

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // if (getAuth().currentUser) {
    //   next();
    // } else {
    //   alert("you dont have access");
    //   next("/");
    // }
    next();
  } else {
    next();
  }
});
const app = createApp(App);
app
  .use(router)
  .use(store)
  .use(vuetify)
  .use(VueAxios, axios) //app에 axios를 사용하겠다고 선언
  .component("BaseCard", BaseCard)
  .use(PerfectScrollbar)
  .use(VueApexCharts);

app.config.globalProperties.$axios = axios; //axios를 전역화 ( 다른 컴포넌트에서 사용 가능하도록 )
app.mount("#app");
