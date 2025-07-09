import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import VueDevTools from "vite-plugin-vue-devtools";
import qiankun from "vite-plugin-qiankun";
// import { qiankunWindow } from "vite-plugin-qiankun/dist/helper";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const INVALID_CHAR_REGEX = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g;
  const DRIVE_LETTER_REGEX = /^[a-z]:/i;
  return {
    base: "/",
    plugins: [vue(), VueDevTools(), qiankun("vue-app", { useDevMode: true })],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      outDir: "dist",
      minify: false, // 不压缩代码
      sourcemap: true, // 生成sourcemap
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        // input: {
        //   index: index.html,
        // },
        output: {
          format: "umd", // 打包为umd格式
          // 注意：name必须唯一，建议用子应用名
          name: "vueApp",
          chunkFileNames: "assets/[name]-[hash].js",
          entryFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash].[ext]",
          // TODO: 处理GitHub Pages 部署 _plugin-vue_export-helper.js 404
          // https://github.com/rollup/rollup/blob/master/src/utils/sanitizeFileName.ts
          sanitizeFileName(name) {
            const match = DRIVE_LETTER_REGEX.exec(name);
            const driveLetter = match ? match[0] : "";
            // A `:` is only allowed as part of a windows drive letter (ex: C:\foo)
            // Otherwise, avoid them because they can refer to NTFS alternate data streams.
            return (
              driveLetter +
              name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "")
            );
          },
          // manualChunks(id) {
          //   if (id.includes("node_modules")) {
          //     return (
          //       id
          //         .toString()
          //         .match(/\/node_modules\/(?!.pnpm)(?<moduleName>[^\/]*)\//)
          //         ?.groups.moduleName ?? "vender"
          //     );
          //   }
          // },
        },
      },
    },
    server: {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      // host: "//big-wang007.github.io",
      port: 8081,
      cors: true,
      open: true,
      // origin: "//big-wang007.github.io:8081",
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
