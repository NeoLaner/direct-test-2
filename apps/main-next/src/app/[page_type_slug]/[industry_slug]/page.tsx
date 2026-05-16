import { safe } from "@orpc/client";
import { Button } from "@workspace/ui/components/shadcn-ui/button";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { api } from "~/lib/orpc/server";

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
		<div className="flex min-h-svh flex-col gap-20 px-4 md:px-8">
			{/* Hero Section */}
			<section className="text-center md:text-right">
				<div className="flex flex-col items-center justify-center gap-10 md:flex-row md:items-stretch">
					<div className="flex flex-col items-center gap-10 px-4 py-6 md:items-stretch">
						<div className="flex-1">
							<h1 className="mb-6 font-bold text-4xl">
								{pageData.heroHeadline}
							</h1>
							<p className="text-muted-foreground text-sm">
								{pageData.heroSubheadline}
							</p>
						</div>

						<Button size={"lg"} className="w-fit">
							<span className="">دریافت مشاوره رایگان</span>
							<span>&larr;</span>{" "}
						</Button>
					</div>

					<div className="relative flex aspect-16/13 w-2/3 items-center justify-center rounded-2xl bg-primary md:w-lg lg:w-3xl">
						<Image
							src={pageData.heroImage}
							alt={pageData.title}
							className="rounded-2xl"
							priority
							fill
						/>
					</div>
				</div>
			</section>

			{/* Main Content */}
			<main className="mx-auto">
				{pageData.sections.map((section) => (
					<div key={section.id} className="mb-16 w-full">
						<h3 className="mb-8 text-center font-semibold text-3xl">
							{section.title}
						</h3>

						<div className="flex flex-col gap-4 md:flex-row">
							{section.items.map((item) => (
								<div
									key={item.id}
									className="flex-1 rounded-2xl border p-4 shadow-sm md:p-8"
								>
									<h4 className="mb-2 font-semibold">
										{item.title}
									</h4>
									<p className="text-muted-foreground text-sm">
										{item.desc}
									</p>
								</div>
							))}
						</div>
					</div>
				))}

				{/* CTA */}
				<div className="mt-16 flex flex-col items-center justify-between gap-8 rounded-2xl p-4 text-center md:flex-row md:bg-accent md:text-right md:text-accent-foreground">
					<div>
						<h4 className="font-bold text-lg">
							{pageData.ctaText}
						</h4>
						<span className="text-xs">
							کارشناسان ما آماده کمک به رشد کسب و کار شما هستند
						</span>
					</div>

					<Button size={"lg"}>شروع کنید</Button>
				</div>
			</main>
		</div>
	);
}
