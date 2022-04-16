import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "src/index",
      formats: ["es"],
    },
    rollupOptions: {
      input: {
        "overlay-caption": "src/overlay-caption/index",
        "light-box": "src/light-box/index",
        "calendar-heatmap": "src/calendar-heatmap/index",
      },
      output: {
        entryFileNames: "[name].js",
        dir: "dist",
      },
    },
  },
});