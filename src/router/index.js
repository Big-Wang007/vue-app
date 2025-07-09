export const routes = [
  {
    path: "/",
    redirect: "/dashboard"
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/dashboard/index.vue"),
  },
  {
    path: "/details",
    name: "details",
    component: () => import("../views/dashboard/details.vue"),
  },
  {
    path: "/list",
    name: "list",
    component: () => import("../views/dashboard/list.vue"),
  },
];
