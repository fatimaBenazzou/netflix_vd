import tailwindcssAnimated from "tailwindcss-animated";
import daisyui from "daisyui";
import typography from "@tailwindcss/typography";
import themes from "daisyui/src/theming/themes";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	plugins: [typography, daisyui, tailwindcssAnimated],
	darkMode: ["class", '[data-theme="dark"]'],
	theme: {
		extend: {
			// add colors
			colors: {
				primary: {
					// variants of #E50914 as default
					100: "#FFE5E7",
					200: "#FFBFC3",
					300: "#FF9A9F",
					400: "#FF6F76",
					500: "#E50914",
					600: "#C40812",
					700: "#A30710",
					800: "#82060E",
					900: "#6C050C",
					main: "#E50914",
				},
				secondary: {
					// variants of #4F46E5 as default
					100: "#EAE8FF",
					200: "#CBC6FF",
					300: "#ABA4FF",
					400: "#6C63FF",
					500: "#4F46E5",
					600: "#3E39C2",
					700: "#2F2C9F",
					800: "#201F7C",
					900: "#161765",
					default: "#4F46E5",
				},
				note: {
					// variants of #FEF3C7 (light yellow) as default
					100: "#FEF3C7",
					200: "#FDE68A",
					300: "#FCD34D",
					400: "#FBBF24",
					500: "#F59E0B",
					600: "#D97706",
					700: "#B45309",
					800: "#92400E",
					900: "#78350F",
					default: "#FEF3C7",
				},
				success: {
					// variants of #10B981 (light green) as default
					100: "#D1FAE5",
					200: "#A7F3D0",
					300: "#6EE7B7",
					400: "#34D399",
					500: "#10B981",
					600: "#059669",
					700: "#047857",
					800: "#065F46",
					900: "#064E3B",
					default: "#10B981",
				},
				mainGradient: {
					// define gradient colors
				},
			},
		},
	},
	daisyui: {
		daisyui: {
			themes: [
				{
					Netflix: {
						...themes["dark"],
						primary: "#E50914",
					},
				},
				"dark",
			],
		},
	},
};
