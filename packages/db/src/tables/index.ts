import { relations } from "drizzle-orm";
import {
	integer,
	jsonb,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

// ========================
// جداول پایه
// ========================

export const pageTypes = pgTable("page_types", {
	id: serial("id").primaryKey(),
	slug: varchar("slug", { length: 50 }).notNull().unique(),
	name: varchar("name", { length: 100 }).notNull(),
	createdAt: timestamp("created_at").defaultNow(),
});

export const industries = pgTable("industries", {
	id: serial("id").primaryKey(),
	slug: varchar("slug", { length: 100 }).notNull().unique(),
	name: varchar("name", { length: 150 }).notNull(),
	createdAt: timestamp("created_at").defaultNow(),
});

// ========================
// محتوای اصلی صفحه
// ========================

export const pageContents = pgTable("page_contents", {
	id: serial("id").primaryKey(),
	pageTypeSlug: varchar("page_type_slug", { length: 50 }).notNull(),
	industrySlug: varchar("industry_slug", { length: 100 }).notNull(),

	title: varchar("title", { length: 255 }).notNull(),
	metaDescription: text("meta_description"),
	heroHeadline: text("hero_headline").notNull(),
	heroSubheadline: text("hero_subheadline").notNull(),

	ctaText: varchar("cta_text", { length: 200 }),
	activeStores: varchar("active_stores", { length: 50 }),

	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});

export const pageSections = pgTable("page_sections", {
	id: serial("id").primaryKey(),
	pageContentId: integer("page_content_id")
		.references(() => pageContents.id, { onDelete: "cascade" })
		.notNull(),
	sectionType: varchar("section_type", { length: 50 }).notNull(), // 'benefits', 'features', 'how_it_works'
	title: varchar("title", { length: 150 }),
	items: jsonb("items").notNull(), // لیست آیتم‌ها
	order: integer("order").default(0),
	createdAt: timestamp("created_at").defaultNow(),
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
