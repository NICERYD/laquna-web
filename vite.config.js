import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/],
    }),

    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
  ],
  //build 시에 모든 console.log를 제거
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  define: { "process.env": {} },
  // local-target: target: "http://localhost:3000"
  server: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:3000/api",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  // server-target: http://seedit.iptime.org/:3000
  // server: {
  //   port: 8080,
  //   proxy: {
  //     "/api": {
  //       target: "http://seedit.iptime.org/:3000",
  //       changeOrigin: true,
  //       secure: false,
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //     },
  //   },
  // },

  resolve: {
    alias: [
      {
        find: "@",
        replacement: `${path.resolve(__dirname, "./src")}/`,
      },
    ],
  },
  css: {
    preprocessorOptions: {
      // scss: { additionalData: `@import "src/assets/styles/main";` },
    },
  },
  /* remove the need to specify .vue files https://vitejs.dev/config/#resolve-extensions
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ]
  },
  */
});
