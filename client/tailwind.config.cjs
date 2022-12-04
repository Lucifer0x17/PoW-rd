/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Avenir", "Manrope", "Helvetica", "Arial", "sans-serif"],
				headline: ['"Recoleta"', '"Roboto"', "Helvetica", "sans-serif"],
				mono: [
					"DM Mono",
					"ui-monospace",
					"SFMono-Regular",
					"Menlo",
					"Monaco",
					"Consolas",
					'"Liberation Mono"',
					'"Courier New"',
					"monospace",
				],
			},
		},
	},
	plugins: [],
};
