import { defineConfig } from "vitepress";
import { fileURLToPath, URL } from "node:url";
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "kzy-ui",
  description: "小ui库昂",
  base: "/kzy-ui/",
  srcDir: "components",
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("../../src", import.meta.url)),
      },
    },
  },
  markdown: {
    config(md) {
      md.use(containerPreview);
      md.use(componentPreview);
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "组件", link: "/button" },
    ],

    sidebar: [
      {
        text: "Basic",
        items: [
          { text: "Button", link: "/button" },
          // { text: "Icon", link: "/icon" },
          { text: "Collapse", link: "/collapse" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
