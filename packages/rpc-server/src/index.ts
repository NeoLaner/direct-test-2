export {
	createRouterClient,
	onError,
	os,
	type RouterClient,
} from "@orpc/server";
export { RPCHandler } from "@orpc/server/fetch";
export { CORSPlugin } from "@orpc/server/plugins";

export * from "./routers";
// Schemas are exported via "./schemas" export path to avoid pulling server dependencies into client code
