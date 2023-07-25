import NotFound from "../views/NotFound.vue";
import store from "@/vuex/store.js";
// /** @type {import('vue-router').RouterOptions['routes']} */

const requireAuth = () => (from, to, next) => {
  const token = localStorage.getItem("token");
  if (token) {
    store.state.isAuth = true;
    return next();
  } // isAuth === true면 페이지 이동
  next("/session/signin"); // isAuth === false면 다시 로그인 화면으로 이동
};

export const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../layout/index.vue"),
    redirect: "/session/signin",
    meta: {
      title: "Home",
    },

    children: [
      {
        path: "/dashboards",
        name: "Dashboards",
        component: () => import("../views/dashboards/index.vue"),
        beforeEnter: requireAuth(),
        meta: {
          title: "Dashboard",
        },
      },
      {
        path: "/pricing",
        name: "Pricing",
        meta: {
          title: "Pricing",
        },
        component: () => import("../views/Pricing.vue"),
      },
      {
        path: "/fnd/usercode",
        name: "User Code",
        component: () => import("../views/fnd/usercode.vue"),
        beforeEnter: requireAuth(),
      },
      {
        path: "/hr/dh_adt",
        name: "DH ADT",
        component: () => import("../views/hr/dh_adt.vue"),
        beforeEnter: requireAuth(),
      },
      {
        path: "/hr/dh_calcsalary",
        name: "DH CalcSalary",
        component: () => import("../views/hr/dh_calcsalary.vue"),
        // beforeEnter: requireAuth(),
      },
    ],
  },
  {
    path: "/session",
    name: "Session",
    component: () => import("../views/session/index.vue"),
    meta: {
      title: "Session",
    },
    children: [
      {
        path: "/session/signin",
        name: "Sign In",
        component: () => import("../views/session/SignIn.vue"),
      },
      {
        path: "/session/register",
        name: "Register",
        component: () => import("../views/session/Register.vue"),
      },
      {
        path: "/session/register-2",
        name: "Register Two",
        component: () => import("../views/session/RegisterTwo.vue"),
      },
      {
        path: "/session/forgot",
        name: "Forgot",
        component: () => import("../views/session/Forgot.vue"),
      },
      {
        path: "/session/forgot-2",
        name: "Forgot Two",
        component: () => import("../views/session/ForgotTwo.vue"),
      },
      {
        path: "/session/two-step-verification",
        name: "Two Step Verification",
        component: () => import("../views/session/TwoStepVerification.vue"),
      },
    ],
  },
  { path: "/:path(.*)", component: NotFound },
];
