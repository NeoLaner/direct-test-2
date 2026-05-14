import { o } from "../orpc-server";

export const timingMiddleware = o.middleware(async ({ next, path }) => {
	const start = Date.now();

	try {
		return await next();
	} finally {
		console.log(`[oRPC] ${path} took ${Date.now() - start}ms to execute`);
	}
});
