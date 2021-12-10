import { createRouter, createWebHistory } from "vue-router";
import Layout from "../components/Layout.vue";
import common from "./staticModules/index.js";
import Login from "../views/Login.vue";

const allowList = ["login", "icons", "error", "error-404"]; // no redirect whitelist

export const routes = [
  {
    path: "/",
    name: "Layout",
    redirect: "/dashboard",
    component: Layout,
    meta: {
      title: "首页",
    },
    children: [...common],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  let userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

  if (userInfo) {
    if (to.path === "/login") {
      next({ path: "/dashboard" });
    } else {
      console.log(to.path);
      next();
    }
  } else {
    if (allowList.includes(to.name)) {
      // 在免登录名单，直接进入
      next();
    } else {
      next({ path: "/login", replace: true });
    }
  }
});

export default router;
