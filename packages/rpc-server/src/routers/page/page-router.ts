import { ORPCError } from "@orpc/contract";
import {
	pageContents,
	pageContentsRelations,
	pageSections,
	pageSectionsRelations,
} from "@workspace/db";
import { and, eq } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import z from "zod";
import { publicProcedure } from "../../procedures/public-procedure";

const tags = ["Pages"] as const;
const path = (path: string) => `/pages${path}` as const;

const schema = {
	pageContents,
	pageSections,
	pageContentsRelations,
	pageSectionsRelations,
};

export const createPageRouter = (db: PostgresJsDatabase<typeof schema>) => ({
	// ========================
	// Get Page Content by Type and Industry
	// ========================
	getPage: publicProcedure
		.route({
			method: "GET",
			path: path("/get"),
			tags,
			description:
				"Get dynamic page content based on page type and industry",
		})
		.input(
			z.object({
				pageTypeSlug: z.string().min(1),
				industrySlug: z.string().min(1),
			}),
		)
		.output(
			z.object({
				id: z.number(),
				pageTypeSlug: z.string(),
				industrySlug: z.string(),
				title: z.string(),
				metaDescription: z.string(),
				heroHeadline: z.string(),
				heroSubheadline: z.string(),
				heroImage: z.string(),
				ctaText: z.string(),
				activeStores: z.string(),
				keywords: z.string(),
				sections: z.array(
					z.object({
						id: z.number(),
						sectionType: z.string(),
						title: z.string(),
						items: z.array(
							z.object({
								id: z.number(),
								title: z.string(),
								desc: z.string(),
							}),
						), // JSONB items
						order: z.number(),
					}),
				),
			}),
		)
		.handler(async ({ input }) => {
			const page = await db.query.pageContents.findFirst({
				where: and(
					eq(pageContents.pageTypeSlug, input.pageTypeSlug),
					eq(pageContents.industrySlug, input.industrySlug),
				),
				with: {
					sections: {
						orderBy: (sections, { asc }) => [asc(sections.order)],
					},
				},
			});

			if (!page) {
				throw new ORPCError("NOT_FOUND");
			}

			return {
				id: page.id,
				pageTypeSlug: page.pageTypeSlug,
				industrySlug: page.industrySlug,
				title: page.title,
				metaDescription: page.metaDescription,
				heroHeadline: page.heroHeadline,
				heroSubheadline: page.heroSubheadline,
				heroImage: page.heroImage,
				ctaText: page.ctaText,
				activeStores: page.activeStores,
				sections: page.sections,
				keywords: page.keywords,
			};
		}),
});
