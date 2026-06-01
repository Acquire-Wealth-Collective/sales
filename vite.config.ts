import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  base: "/sales/",  // <--- IMPORTANTE para GitHub Pages
  tanstackStart: {
    server: { entry: "server" },
  },
});