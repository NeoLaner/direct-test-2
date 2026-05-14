import { createGreetingRouter } from "@workspace/rpc-server";

export const router = {
	user: createGreetingRouter(),
};
