export default {
  root: ".",
  build: {
    outDir: "public/assets",
    emptyOutDir: true,
    rollupOptions: {
      input: "src/main.js",
      output: {
        entryFileNames: "main.js",
        assetFileNames: "style.css",
      },
    },
  },
};
