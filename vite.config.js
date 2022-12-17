import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index",
      name: "WebComponents",
    },
    rollupOptions: {
      external: ["lit", "d3"],
      output: {
        globals: {
          lit: "lit",
          d3: "d3",
        },
      },
    },
  },
});
