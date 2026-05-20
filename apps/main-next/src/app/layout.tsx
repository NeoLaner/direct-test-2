import "~/styles/globals.css";

import type { Metadata } from "next";
import { Providers } from "~/providers/providers";
import { vazirmatn } from "./fonts";

export const metadata: Metadata = {
	title: "direct",
	description: "test",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			suppressHydrationWarning
			lang="fa"
			dir="rtl"
			className={`${vazirmatn.variable}`}
		>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
