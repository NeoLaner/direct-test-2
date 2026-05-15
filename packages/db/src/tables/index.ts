import { relations } from "drizzle-orm";
import {
	integer,
	jsonb,
	pgTable,
	serial,
	text,
	timestamp,
	uniqueIndex,
	varchar,
} from "drizzle-orm/pg-core";

// ========================
// محتوای اصلی صفحه
// ========================

export const pageContents = pgTable(
	"page_contents",
	{
		id: serial("id").primaryKey(),

		// ترکیب این دو فیلد باید منحصر به فرد باشد
		pageTypeSlug: varchar("page_type_slug", { length: 50 }).notNull(),
		industrySlug: varchar("industry_slug", { length: 100 }).notNull(),

		//
		title: varchar("title", { length: 255 }).notNull(),
		metaDescription: text("meta_description").notNull(),

		heroHeadline: text("hero_headline").notNull(),
		heroSubheadline: text("hero_subheadline").notNull(),
		heroImage: varchar("hero_image", { length: 300 }).notNull(),

		ctaText: varchar("cta_text", { length: 200 }).notNull(),
		activeStores: varchar("active_stores", { length: 50 })
			.notNull()
			.default("0"),

		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	// === Composite Unique Key ===
	(table) => ({
		pageTypeIndustryUnique: uniqueIndex("page_type_industry_unique").on(
			table.pageTypeSlug,
			table.industrySlug,
		),
	}),
);

// ========================
// بخش‌های صفحه
// ========================

export const pageSections = pgTable("page_sections", {
	id: serial("id").primaryKey(),

	pageContentId: integer("page_content_id")
		.references(() => pageContents.id, { onDelete: "cascade" })
		.notNull(),

	sectionType: varchar("section_type", { length: 50 }).notNull(),
	title: varchar("title", { length: 150 }).notNull(),
	items: jsonb("items")
		.$type<Array<{ title: string; desc: string }>>()
		.notNull(),
	order: integer("order").notNull().default(0),

	createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ========================
// Relations
// ========================

export const pageContentsRelations = relations(pageContents, ({ many }) => ({
	sections: many(pageSections),
}));

export const pageSectionsRelations = relations(pageSections, ({ one }) => ({
	pageContent: one(pageContents, {
		fields: [pageSections.pageContentId],
		references: [pageContents.id],
	}),
}));
