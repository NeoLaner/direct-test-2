import { onError } from "@orpc/client";
import { RPCHandler } from "@workspace/rpc-server";
import { router } from "~/lib/orpc/router";

const handler = new RPCHandler(router, {
	interceptors: [
		onError((error) => {
			console.error(error);
		}),
	],
});

async function handleRequest(request: Request) {
	const { matched, response } = await handler.handle(request, {
		prefix: "/api/rpc",
	});

	if (matched) {
		return response;
	}

	return new Response("Not Found", { status: 404 });
}

export const HEAD = handleRequest;
export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
