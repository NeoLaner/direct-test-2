import { notFound } from "next/navigation";
import { api } from "~/lib/orpc/server";

type Props = {
	params: Promise<{
		page_type_slug: string;
		industry_slug: string;
	}>;
};

export default async function Page({ params }: Props) {
	const { page_type_slug, industry_slug } = await params;

	// دریافت داده از API
	const pageData = await api.page.getPage({
		pageTypeSlug: page_type_slug,
		industrySlug: industry_slug,
	});

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 text-white">
				<div className="mx-auto max-w-7xl px-6 text-center">
					<img
						src={pageData.heroImage}
						alt={pageData.title}
						className="mx-auto mb-8 h-40 object-contain"
					/>
					<h1 className="mb-6 font-bold text-5xl">
						{pageData.heroHeadline}
					</h1>
					<p className="mx-auto max-w-3xl text-xl">
						{pageData.heroSubheadline}
					</p>
				</div>
			</section>

			{/* Main Content */}
			<main className="mx-auto max-w-7xl px-6 py-12">
				<h2 className="mb-12 text-center font-bold text-3xl">
					{pageData.title}
				</h2>

				{pageData.sections.map((section) => (
					<div key={section.id} className="mb-16">
						<h3 className="mb-8 text-center font-semibold text-2xl">
							{section.title}
						</h3>

						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							{section.items.map((item: any, index: number) => (
								<div
									key={index}
									className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
								>
									<h4 className="mb-2 font-semibold text-lg">
										{item.title}
									</h4>
									<p className="text-gray-600">{item.desc}</p>
								</div>
							))}
						</div>
					</div>
				))}

				{/* CTA */}
				<div className="mt-16 text-center">
					<button className="rounded-xl bg-indigo-600 px-10 py-4 font-medium text-lg text-white transition hover:bg-indigo-700">
						{pageData.ctaText}
					</button>
				</div>
			</main>
		</div>
	);
}
