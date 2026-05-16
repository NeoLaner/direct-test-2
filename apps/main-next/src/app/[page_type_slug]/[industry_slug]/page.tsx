import { safe } from "@orpc/client";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { api } from "~/lib/orpc/server";
import { Cta } from "./_ui/cta";
import Hero from "./_ui/hero";
import Sections from "./_ui/sections";

type Props = {
	params: Promise<{
		page_type_slug: string;
		industry_slug: string;
	}>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { page_type_slug, industry_slug } = await params;

	const { data: pageData, isDefined } = await safe(
		api.page.getPage({
			pageTypeSlug: page_type_slug,
			industrySlug: industry_slug,
		}),
	);

	if (isDefined || !pageData) {
		return {
			title: "دایرکت - صفحه ویژه کسب‌وکارها",
			description: "راهکار هوشمند مدیریت مشتریان و ارسال پیامک هدفمند",
		};
	}

	return {
		title: pageData.title,
		description: pageData.metaDescription,
		openGraph: {
			title: pageData.title,
			description: pageData.metaDescription,
			images: [
				{
					url: pageData.heroImage,
					width: 1200,
					height: 630,
					alt: pageData.title,
				},
			],
			type: "website",
			locale: "fa_IR",
		},
		twitter: {
			card: "summary_large_image",
			title: pageData.title,
			description: pageData.metaDescription,
			images: [pageData.heroImage],
		},
		robots: {
			index: true,
			follow: true,
		},
		alternates: {
			canonical: `https://direct.ir/${page_type_slug}/${industry_slug}`,
		},
		keywords: pageData.keywords,
	};
}

export default async function Page({ params }: Props) {
	const { page_type_slug, industry_slug } = await params;

	const { data: pageData, isDefined } = await safe(
		api.page.getPage({
			pageTypeSlug: page_type_slug,
			industrySlug: industry_slug,
		}),
	);

	if (isDefined || !pageData) return notFound();

	return (
		<div className="flex flex-col gap-20 px-4 md:px-12">
			{/* Hero Section */}
			<Hero>
				<Hero.Content
					headline={pageData.heroHeadline}
					subheadline={pageData.heroSubheadline}
					buttonText="دریافت مشاوره رایگان"
				/>
				<Hero.Image src={pageData.heroImage} alt={pageData.title} />
			</Hero>

			{/* Main Content */}
			<Sections>
				{pageData.sections.map((section) => (
					<Sections.Item
						key={section.id}
						title={section.title}
						items={section.items}
					/>
				))}

				{/* CTA */}
				<Cta ctaText={pageData.ctaText} />
			</Sections>
		</div>
	);
}
