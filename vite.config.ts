/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  test: {
    environment: "happy-dom",
    setupFiles: ["./src/tests/setup.ts"],
    include: ["./src/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@app": "/src/app",
      "@features": "/src/features",
      "@tests": "/src/tests",
      "@assets": "/src/assets",
      "@utils": "/src/utils",
      "@mocks": "/src/mocks",
    }
  }
});
