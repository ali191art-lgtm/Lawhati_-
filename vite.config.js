import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Using a relative base ("./") so the build works out of the box on
// GitHub Pages (including project pages like username.github.io/repo)
// and on Netlify without any extra configuration.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
