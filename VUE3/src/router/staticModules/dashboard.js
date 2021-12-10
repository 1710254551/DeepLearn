import Home from "../../views/Home.vue";
import Home23 from "../../views/Home23.vue";
import Layout from "../../views/content.vue";

const routeName = "dashboard";

const routes = [
  {
    path: "/dashboard",
    name: routeName,
    redirect: "/dashboard/welcome",
    component: Layout,
    meta: {
      title: "系统看板",
      icon: "icon-yibiaopan",
    },
    children: [
      {
        path: "welcome",
        name: `${routeName}-welcome`,
        meta: {
          title: "首页",
          icon: "icon-shouye",
        },
        component: Home,
      },
      {
        path: "welcome2",
        name: `${routeName}-welcome2`,
        meta: {
          title: "首页2",
          icon: "icon-shouye",
        },
        component: Home23,
      },
    ],
  },
];

export default routes;
