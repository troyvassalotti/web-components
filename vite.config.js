import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["lit"],
      input: {
        "overlay-caption": "src/components/overlay-caption/index",
        "light-box": "src/components/light-box/index",
        "calendar-heatmap": "src/components/calendar-heatmap/index",
        "cloudy-sky": "src/components/cloudy-sky/index",
        "lightbox-carousel": "src/components/lightbox-carousel/index",
        "kb-typewriter": "src/components/kb-typewriter/index",
      },
      output: {
        entryFileNames: "[name].js",
        dir: "dist",
      },
    },
  },
});
