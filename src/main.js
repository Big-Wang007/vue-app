import "./assets/style/normalize.css";
import "./assets/style/base.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import {
  renderWithQiankun,
  qiankunWindow,
} from "vite-plugin-qiankun/dist/helper";

import App from "./App.vue";

import { routes } from "./router";
import { createRouter, createWebHashHistory } from "vue-router";
import installAntd from "@/utils/ant-design-vue.js";

import "@/api/mock/list.js";

import { setupI18n } from "./lang/index.js";
import { initI18n } from "./utils/utils.js";

// 按需异步加载i18n
const I18n = setupI18n();
initI18n(I18n);

let app = null;
let router = null;
// 微应用独立运行
function render(props = {}) {
  const { container, basePath } = props;
  router = createRouter({
    history: createWebHashHistory("/"),
    routes,
  });
  console.log("router", router);
  
  app = createApp(App);
  app.use(router);
  app.use(createPinia());
  app.use(I18n);
  installAntd(app);
  // 确保路由初始化完成后再挂载应用
  app.mount(container ? container.querySelector("#app") : "#app");
}

// 独立运行时
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({ basePath: "/" });
}
renderWithQiankun({
  bootstrap() {
    console.log("[微应用] bootstrap");
    return Promise.resolve();
  },

  mount(props) {
    console.log("[微应用] mount");
    render(props);
    return Promise.resolve();
  },

  unmount() {
    console.log("[微应用] unmount");
    app.unmount();
    app = null;
    return Promise.resolve();
  },
});
