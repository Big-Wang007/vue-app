import { createRouter, createWebHistory } from "vue-router";

// 动态设置 base
let base = "/vue-app/";
if (window.__POWERED_BY_QIANKUN__) {
  // 从主应用传递的 basePath 或从 activeRule 获取
  base = "/vue-app/";
  console.log(base);
}

export const routes = [
  {
    path: "/",
    redirect: "list",
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

const router = createRouter({
  // 这里的import.meta.env.BASE_URL取值于vite.config.js中的base属性。
  // 只有在生产环境才需要加/vue-app/前缀访问。
  history: createWebHistory(base),
  routes,
});

export default router;
