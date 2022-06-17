import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      port: 4000,
      proxy: {
        // string shorthand
        "/gotenberg": {
          target: env.GOTENBERG_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/gotenberg/, ""),
        },
      },
    },
  };
});
