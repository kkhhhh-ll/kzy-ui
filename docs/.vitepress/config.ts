import { defineConfig } from "vitepress";
import { fileURLToPath, URL } from "node:url";
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "前端技术分享",
  description: "你的代码在我之上？",
  base: "/kzy-ui/",
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
      { text: "组件", link: "/components/button" },
      { text: "技术分享", link: "/blogs/load" },
    ],
    sidebar: {
      "/components/": [
        {
          text: "组件",
          items: [
            { text: "Button", link: "/components/button" },
            { text: "Collapse", link: "/components/collapse" },
            { text: "Tooltip", link: "/components/tooltip" },
            { text: "Alert", link: "/components/alert" },
            { text: "Dropdown", link: "/components/dropdown" },
          ],
        },
      ],
      "/blogs/": [
        {
          text: "性能优化",
          items: [{ text: "Intersection Observer", link: "/blogs/load" }],
        },
        {
          text: "Typescript",
          items: [
            { text: "介绍", link: "/blogs/typescript/typescript" },
            {
              text: "基本数据类型",
              link: "/blogs/typescript/typescript-basic",
            },
            { text: "数组", link: "/blogs/typescript/typescript-array" },
            { text: "元组", link: "/blogs/typescript/typescript-tuple" },
            { text: "对象", link: "/blogs/typescript/typescript-object" },
            { text: "枚举", link: "/blogs/typescript/typescript-enum" },
            { text: "类型", link: "/blogs/typescript/typescript-type" },
            { text: "接口", link: "/blogs/typescript/typescript-interface" },
            { text: "函数", link: "/blogs/typescript/typescript-func" },
            { text: "泛型", link: "/blogs/typescript/typescript-gen" },
            { text: "关键字", link: "/blogs/typescript/typescript-words" },
          ],
        },
        {
          text: "正则表达式",
          items: [{ text: "介绍", link: "/blogs/reg/reg" }],
        },
        {
          text: "javaScript",
          items: [
            {
              text: "symbol",
              link: "/blogs/javaScript/symbol",
            },
            {
              text: "遍历器(Iterator)",
              link: "/blogs/javaScript/iterator",
            },
            {
              text: "数组",
              link: "/blogs/javaScript/array",
            },
            {
              text: "this指向",
              link: "/blogs/javaScript/this",
            },
            {
              text: "原型和原型链",
              link: "/blogs/javaScript/proto",
            },
            {
              text: "LRU算法",
              link: "/blogs/javaScript/lru",
            },
            {
              text: "import.meta",
              link: "/blogs/javaScript/import-meta",
            },
            {
              text: "Module",
              link: "/blogs/javaScript/module",
            },
          ],
        },
        {
          text: "浏览器原理",
          items: [
            {
              text: "进程和线程",
              link: "/blogs/chrome/line",
            },
            {
              text: "浏览器渲染原理",
              link: "/blogs/chrome/render",
            },
          ],
        },
        {
          text: "vue3",
          items: [
            {
              text: "vue3设计思想和理念",
              link: "/blogs/vue3/design",
            },
            {
              text: "vue3整体架构",
              link: "/blogs/vue3/architecture",
            },
            {
              text: "monorepo开发环境搭建/esbuild打包",
              link: "/blogs/vue3/monorepo",
            },
            {
              text: "vue3主流程解析",
              link: "/blogs/vue3/flow",
            },
            {
              text: "vue3实例",
              link: "/blogs/vue3/instance",
            },
            {
              text: "Vue3响应式",
              link: "/blogs/vue3/reactive",
            },
          ],
        },
        {
          text: "单元测试",
          items: [
            {
              text: "vitest",
              link: "/blogs/vitest/vitest",
            },
          ],
        },
        {
          text: "Node",
          items: [
            {
              text: "node内置模块-全局",
              link: "/blogs/node/global",
            },
            {
              text: "node内置模块-进程",
              link: "/blogs/node/process",
            },
            {
              text: "node内置模块-path",
              link: "/blogs/node/path",
            },
            {
              text: "node内置模块-fs",
              link: "/blogs/node/fs",
            },
            {
              text: "npm包管理原理",
              link: "/blogs/node/code",
            },
          ],
        },
        {
          text: "git",
          items: [
            {
              text: "git",
              link: "/blogs/git/git",
            },
          ],
        },
        {
          text: "Canvas",
          items: [
            {
              text: "Canvas",
              link: "/blogs/canvas/pic",
            },
          ],
        },
        {
          text: "工程化",
          items: [
            {
              text: "pnpm",
              link: "/blogs/constructor/pnpm",
            },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/kkhhhh-ll/kzy-ui" },
    ],
  },
});
