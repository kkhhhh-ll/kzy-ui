import { fileURLToPath, URL } from "node:url";
import dts from 'vite-plugin-dts'
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "node:path";

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist/es',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'KzzzyUi',
      fileName: 'kzzzy-ui',
      formats: ['es']
    },
    rollupOptions: {
      external: [
        'vue',
        '@popperjs/core',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/vue-fontawesome'
      ],
      output: {
        entryFileNames: 'index.js', // JavaScript 文件前缀
        chunkFileNames: 'index.js', // 代码分割块前缀
        assetFileNames: 'index.[ext]', // 静态资源前缀，包括 CSS 文件
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";',
      },
    },
  },
  plugins: [vue(), vueDevTools(), vueJsx(), dts({
      tsconfigPath: './tsconfig.build.json'
    })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
