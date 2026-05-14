"use client";

import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import type { RouterClient } from "@workspace/rpc-server";
import type { router } from "./router";

// Create RPC link for client-side calls
const link = new RPCLink({
	url: () => {
		if (typeof window === "undefined") {
			throw new Error("RPCLink is not allowed on the server side.");
		}
		return `${window.location.origin}/api/rpc`;
	},
});

// Create oRPC client (it will use the link to call the HTTP handler)
const client: RouterClient<typeof router> = createORPCClient(link);

// Create TanStack Query utils
export const api = createTanstackQueryUtils(client);
