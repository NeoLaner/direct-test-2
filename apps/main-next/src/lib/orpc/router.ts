import { createGreetingRouter, createPageRouter } from "@workspace/rpc-server";
import { db } from "../db";

export const router = {
	greeting: createGreetingRouter(),
	page: createPageRouter(db),
};
