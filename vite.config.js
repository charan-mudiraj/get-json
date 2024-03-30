import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    BACKEND_URL: JSON.stringify(
      process.env.BACKEND_URL || "http://localhost:8000"
    ),
  },
});
