import type { Config } from "drizzle-kit";

export default {
	schema: "./src/schema",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL as string,
	},
	casing: "snake_case",
} satisfies Config;
