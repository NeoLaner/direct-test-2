import { type Column, sql } from "drizzle-orm";
import { timestamp } from "drizzle-orm/pg-core";

export const timestamps = {
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
	deletedAt: timestamp("deleted_at", { mode: "date", withTimezone: true }),
};

export function gen_random_uuid() {
	return crypto.randomUUID();
}

/**
 *  case-insensitive comparisons
 */
export function ciEquals(column: Column, value: string) {
	return sql`lower(${column}) = lower(${value})`;
}
