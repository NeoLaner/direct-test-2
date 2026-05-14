import { onError } from "@orpc/server";
import { o } from "../orpc-server";

export const errorMiddleware = o.middleware(
	onError((error) => {
		console.error("ORPC Error Middleware:", error);

		throw error;
	}),
);
