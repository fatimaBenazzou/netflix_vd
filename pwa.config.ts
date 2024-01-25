import { VitePWAOptions } from "vite-plugin-pwa";
const manifest: VitePWAOptions["manifest"] = {
	name: "Netflix data visualization project",
	id: "edu.netflix.data.visualization.project",
	short_name: "Netflix-DV",
	description: "A data visualization project using an open source Netflix dataset",
	icons: [
		{
			src: "logo.svg",
			sizes: "16x16 32x32 64x64 96x96 128x128 192x192 256x256 512x512",
			type: "image/svg+xml",
			purpose: "any maskable",
		},
	],
	start_url: "/",
	scope: "/",
	orientation: "landscape-secondary",
	display: "standalone",
	display_override: ["window-controls-overlay", "minimal-ui"],
	prefer_related_applications: true,
	theme_color: "#ffffff",
	background_color: "#000000",
};
const PWA_CONFIG: Partial<VitePWAOptions> = {
	registerType: "autoUpdate",
	strategies: "generateSW",
	includeAssets: ["logo.svg"],
	manifest,
	manifestFilename: "manifest.webmanifest",
	devOptions: {
		type: "module",
		enabled: true,
	},
};
export default PWA_CONFIG;
