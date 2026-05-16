import localFont from "next/font/local";

export const vazirmatn = localFont({
	src: [
		{
			path: "../../public/fonts/Vazirmatn[wght].woff2",
			weight: "100 900",
			style: "normal",
		},
	],
	variable: "--font-vazirmatn",
	display: "swap",
	preload: true,
	adjustFontFallback: false,
});
