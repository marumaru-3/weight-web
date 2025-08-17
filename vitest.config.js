import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    include: ["src/js/tests/**/*.{test,spec}.js"],
    globals: true,
    restoreMocks: true,
  },
});
