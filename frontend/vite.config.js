import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            "/api": "https://fullstack-crud-app-2vyb.onrender.com",
        },
    },
    plugins: [react()],
});
