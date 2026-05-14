import z from "zod";

import { publicProcedure } from "../../procedures/public-procedure";

const tags = ["Greeting"] as const;
const path = (path: string) => `/greeting${path}` as const;

export const createGreetingRouter = () => ({
	wakeUp: publicProcedure
		.route({
			method: "GET",
			path: path("/wake-up"),
			tags,
			description: "Wake up the greeting service",
		})
		.output(z.string())
		.handler(async () => {
			return "Hello";
		}),

	sayMyName: publicProcedure
		.route({
			method: "POST",
			description: "Says the name provided in the input",
			path: path("/say-my-name"),
			tags,
		})
		.input(z.object({ name: z.string() }))
		.output(z.object({ name: z.string() }))
		.handler(async ({ input }) => {
			return { name: input.name };
		}),
});
