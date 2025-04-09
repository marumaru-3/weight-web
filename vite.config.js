import { defineConfig } from "vite";

export default defineConfig({
  root: "./src",
  base: "/assets/",
  build: {
    outDir: "../public/assets",
    emptyOutDir: true,
    rollupOptions: {
      input: "./src/main.js",
      output: {
        entryFileNames: "main.js",
        chunkFileNames: "[name]-[hash].js",
        assetFileNames: "style.css",
      },
    },
  },
});
