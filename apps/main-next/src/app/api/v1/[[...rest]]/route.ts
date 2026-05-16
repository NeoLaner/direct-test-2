import { onError } from "@orpc/client";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { CORSPlugin } from "@workspace/rpc-server";

import { router } from "~/lib/orpc/router";

const handler = new OpenAPIHandler(router, {
	plugins: [
		new CORSPlugin(),
		new OpenAPIReferencePlugin({
			docsProvider: "scalar", // default: 'scalar'
			schemaConverters: [new ZodToJsonSchemaConverter()],
			specGenerateOptions: {
				info: {
					title: "Direct OpenAPI",
					version: "1.0.0",
				},
			},
		}),
	],
	interceptors: [
		onError((error) => {
			console.error(error);
		}),
	],
});

async function handleRequest(request: Request) {
	const { matched, response } = await handler.handle(request, {
		prefix: "/api/v1",
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
