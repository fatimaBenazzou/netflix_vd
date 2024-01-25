import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import PWA_CONFIG from "./pwa.config";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), VitePWA(PWA_CONFIG)],
	resolve: {
		alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
	},
	server: {
		port: 3100,
	},
	preview: {
		port: 3100,
	},
});
