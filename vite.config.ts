import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Security-Policy": "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https: http: ws: wss:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http: blob:; connect-src * ws: wss:; style-src 'self' 'unsafe-inline' https: http:;",
    },
    hmr: {
      overlay: false,
    },
    allowedHosts: ["dozier-tawana-chapfallen.ngrok-free.dev"]
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
