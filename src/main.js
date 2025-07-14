import "./assets/style/normalize.css";
import "./assets/style/base.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import {
  renderWithQiankun,
  qiankunWindow,
} from "vite-plugin-qiankun/dist/helper";

import App from "./App.vue";
import router from "./router";
import { routes } from "./router";
import { createRouter, createWebHistory } from "vue-router";
import installAntd from "@/utils/ant-design-vue.js";

import "@/api/mock/list.js";

import { setupI18n } from "./lang/index.js";
import { initI18n } from "./utils/utils.js";

import { registerSW } from "virtual:pwa-register";

// 按需异步加载i18n
const I18n = setupI18n();
initI18n(I18n);

let app = null;
// 微应用独立运行
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  console.log("微应用独立运行");
  app = createApp(App);
  app.use(router);
  app.use(createPinia());
  app.use(I18n);
  installAntd(app);
  app.mount("#app");
} else {
  console.log("qiankun模式");
  renderWithQiankun({
    mount(props) {
      console.log("[微应用] mount", props);
      app = createApp(App);
      const { container, basePath } = props;
      const subAppRouter = createRouter({
        history: createWebHistory(basePath),
        routes: [...routes],
      });

      app.use(subAppRouter);
      app.use(createPinia());
      app.use(I18n);
      installAntd(app);
      props.onGlobalStateChange((state) => {
        console.log("收到全局状态变更:", state);
        if (state.locale) {
          // 通常我们会将语言设置到微应用的状态管理（如Vuex/Pinia）中
          app.config.globalProperties.$i18n.locale = state.locale;
        }
      }, true); // 第二个参数为true表示立即执行一次
      app.mount(container ? container.querySelector("#app") : "#app");
      // 同步初始路由状态
      //   window.parent.postMessage(
      //     {
      //       type: "micro-route-change",
      //       path: window.location.pathname,
      //     },
      //     "*"
      //   );
    },
    bootstrap() {
      console.log("[微应用] bootstrap");
    },
    unmount() {
      console.log("[微应用] unmount");
      app.unmount();
      app = null;
    },
  });
}

const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    // 当有新内容时，可以提示用户刷新
    if (confirm("发现新版本，是否立即更新？")) {
      updateSW();
    }
  },
  onOfflineReady() {
    // 离线准备好时的回调
  },
});
