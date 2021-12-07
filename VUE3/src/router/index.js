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
    path: "/",
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
  let userId = localStorage.getItem("userId");
  if (to.path === "/login") next();
  if (userId) {
    next();
  } else {
    next({ path: "/login" });
  }
});

export default router;
export { routes };
