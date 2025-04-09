import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    root: ".",
    base: env.VITE_BASE_PATH || "/public/assets/",
    build: {
      outDir: "public/assets",
      emptyOutDir: true,
      rollupOptions: {
        input: "src/main.js",
        output: {
          entryFileNames: "main.js",
          chunkFileNames: "[name]-[hash].js",
          assetFileNames: "style.css",
        },
      },
    },
  };
});
