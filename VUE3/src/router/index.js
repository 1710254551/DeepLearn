import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Layout from "../components/Layout.vue";
import Login from "../views/Login.vue";

const routes = [
  {
    path: "/login",
    hidden: true,
    component: Login,
  },
  {
    path: "/home",
    hidden: true,
    component: Layout,
  },
  {
    path: "/view",
    name: "view",
    icon: true,
    component: Layout,
    children: [
      {
        name: "My",
        path: "/view/my",
        component: Home,
        children: [
          {
            name: "VIP",
            path: "/view/my/vip",
            component: Home,
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!userInfo.name && to.path === "/login") next();
  if (userInfo.name || to.path !== "/login") next();

  if (userInfo.name) {
    next({ path: "/home" });
  } else {
    next({ path: "/login" });
  }
});

export default router;
export { routes };
