import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
// import VueDevTools from "vite-plugin-vue-devtools";
import qiankun from "vite-plugin-qiankun";
import { qiankunWindow } from "vite-plugin-qiankun/dist/helper";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: qiankunWindow.__POWERED_BY_QIANKUN__ ? "/vue-app/" : "/",
    plugins: [
      vue(),
      /*  VueDevTools(), */ qiankun("vue-app", { useDevMode: true }),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["vite.svg"],
        manifest: {
          icons: [
            {
              src: "vite.svg",
              sizes: "any",
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      port: 8081,
      cors: true,
      open: true,
      origin: "//localhost:8081",
      // proxy: {
      //   [env.VITE_APP_BASE_API]: {
      //     target: env.VITE_APP_SERVICE_URL,
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/dev-api/, ""),
      //   },
      // },
    },
  };
});
