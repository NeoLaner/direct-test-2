"use client";

import { QueryClientProvider as TanstackQueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { createQueryClient } from "~/lib/orpc/query-client";

export function QueryClientProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [queryClient] = useState(() => createQueryClient());

	return (
		<TanstackQueryClientProvider client={queryClient}>
			{children}
		</TanstackQueryClientProvider>
	);
}
