import { ThemeProvider } from "@workspace/ui/providers/theme-provider";
import { QueryClientProvider } from "./query-client-provider";

export async function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="dark"
			enableSystem
			disableTransitionOnChange
		>
			<QueryClientProvider>{children}</QueryClientProvider>
		</ThemeProvider>
	);
}
