import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { industries, pageContents, pageSections, pageTypes } from "../tables";

const conn = postgres(process.env.DATABASE_URL!);

export const db = drizzle(conn, {
	casing: "snake_case",
});

async function seed() {
	console.log("🌱 Starting database seeding...");

	// ========================
	// 1. Page Types
	// ========================
	await db
		.insert(pageTypes)
		.values([
			{ slug: "benefits", name: "Benefits" },
			{ slug: "features", name: "Features" },
		])
		.onConflictDoNothing();

	// ========================
	// 2. Industries
	// ========================
	await db
		.insert(industries)
		.values([
			{ slug: "clothing-store", name: "فروشگاه پوشاک" },
			{ slug: "restaurant", name: "رستوران و کافی‌شاپ" },
		])
		.onConflictDoNothing();

	// ========================
	// 3. Benefits - Clothing Store
	// ========================
	const [benefitsClothing] = await db
		.insert(pageContents)
		.values({
			pageTypeSlug: "benefits",
			industrySlug: "clothing-store",
			title: "افزایش فروش فروشگاه پوشاک با دایرکت",
			metaDescription:
				"جمع‌آوری شماره مشتریان و ارسال پیامک هدفمند برای فروشگاه‌های پوشاک",
			heroHeadline:
				"فروشگاه پوشاک خود را به کسب‌وکاری وفادارمحور تبدیل کنید",
			heroSubheadline:
				"جمع‌آوری شماره مشتریان و ارسال پیامک‌های هدفمند برای افزایش فروش فصلی",
			ctaText: "همین حالا مشاوره رایگان دریافت کنید",
			activeStores: "۱۱۰۰۰",
		})
		.onConflictDoNothing()
		.returning({ id: pageContents.id });

	if (benefitsClothing?.id) {
		await db.insert(pageSections).values({
			pageContentId: benefitsClothing.id,
			sectionType: "benefits",
			title: "مزایای دایرکت برای فروشگاه پوشاک",
			items: [
				{
					title: "جمع‌آوری آسان شماره مشتریان",
					desc: "در ورودی فروشگاه و هنگام پرداخت",
				},
				{
					title: "ارسال تخفیف‌های فصلی و حراج",
					desc: "مانتو، شلوار، لباس کودک و ...",
				},
				{
					title: "وفادارسازی مشتریان",
					desc: "پیامک تولد و خرید مجدد با تخفیف ویژه",
				},
				{ title: "افزایش فروش", desc: "تا ۳۰٪ با کمپین‌های هوشمند" },
			],
			order: 1,
		});
	}

	// ========================
	// 4. Benefits - Restaurant
	// ========================
	const [benefitsRestaurant] = await db
		.insert(pageContents)
		.values({
			pageTypeSlug: "benefits",
			industrySlug: "restaurant",
			title: "افزایش فروش رستوران و کافی‌شاپ با دایرکت",
			metaDescription:
				"مدیریت مشتریان رستوران با پیامک هوشمند و باشگاه مشتریان",
			heroHeadline: "رستوران خود را همیشه پر از مشتری نگه دارید",
			heroSubheadline:
				"با باشگاه مشتریان و پیامک‌های هوشمند فروش را افزایش دهید",
			ctaText: "همین حالا مشاوره رایگان دریافت کنید",
			activeStores: "۵۶۰۰",
		})
		.onConflictDoNothing()
		.returning({ id: pageContents.id });

	if (benefitsRestaurant?.id) {
		await db.insert(pageSections).values({
			pageContentId: benefitsRestaurant.id,
			sectionType: "benefits",
			title: "مزایای دایرکت برای رستوران",
			items: [
				{
					title: "جمع‌آوری شماره هنگام پرداخت",
					desc: "هر مشتری که صورت‌حساب پرداخت می‌کند",
				},
				{
					title: "ارسال منوی روزانه و پیشنهاد ویژه",
					desc: "جذب مشتری بیشتر",
				},
				{
					title: "کمپین‌های جشنواره و تخفیف",
					desc: "افزایش فروش در مناسبت‌ها",
				},
				{ title: "حفظ مشتریان ثابت", desc: "وفادارسازی بلندمدت" },
			],
			order: 1,
		});
	}

	// ========================
	// 5. Features - Clothing Store
	// ========================
	const [featuresClothing] = await db
		.insert(pageContents)
		.values({
			pageTypeSlug: "features",
			industrySlug: "clothing-store",
			title: "ویژگی‌های دایرکت برای فروشگاه پوشاک",
			metaDescription: "ویژگی‌های هوشمند دایرکت مخصوص فروشگاه‌های پوشاک",
			heroHeadline: "ویژگی‌های هوشمند دایرکت مخصوص فروشگاه پوشاک",
			heroSubheadline:
				"ابزارهایی که فروشگاه شما را به سطح بالاتری از مدیریت مشتری می‌رساند",
			ctaText: "آماده‌اید فروشگاه خود را هوشمند کنید؟",
			activeStores: "۱۱۰۰۰",
		})
		.onConflictDoNothing()
		.returning({ id: pageContents.id });

	if (featuresClothing?.id) {
		await db.insert(pageSections).values({
			pageContentId: featuresClothing.id,
			sectionType: "features",
			title: "ویژگی‌های کلیدی",
			items: [
				{
					title: "جمع‌آوری خودکار شماره مشتریان",
					desc: "در ورودی فروشگاه و هنگام پرداخت",
				},
				{
					title: "دسته‌بندی هوشمند مشتریان",
					desc: "بر اساس خریدهای قبلی، فصل و جنسیت",
				},
				{
					title: "ارسال پیامک حراج و تخفیف فصلی",
					desc: "هدفمند و شخصی‌سازی شده",
				},
				{
					title: "اطلاع‌رسانی موجودی سایز و رنگ",
					desc: "به مشتریان علاقه‌مند",
				},
				{ title: "گزارش عملکرد کمپین‌ها", desc: "تحلیل دقیق نتایج" },
			],
			order: 1,
		});
	}

	// ========================
	// 6. Features - Restaurant
	// ========================
	const [featuresRestaurant] = await db
		.insert(pageContents)
		.values({
			pageTypeSlug: "features",
			industrySlug: "restaurant",
			title: "ویژگی‌های دایرکت برای رستوران و کافی‌شاپ",
			metaDescription: "ویژگی‌های هوشمند دایرکت مخصوص رستوران‌ها",
			heroHeadline: "ویژگی‌های هوشمند دایرکت مخصوص رستوران",
			heroSubheadline:
				"ابزارهایی که رستوران شما را همیشه پر از مشتری نگه می‌دارد",
			ctaText: "آماده‌اید رستوران خود را هوشمند کنید؟",
			activeStores: "۵۶۰۰",
		})
		.onConflictDoNothing()
		.returning({ id: pageContents.id });

	if (featuresRestaurant?.id) {
		await db.insert(pageSections).values({
			pageContentId: featuresRestaurant.id,
			sectionType: "features",
			title: "ویژگی‌های کلیدی",
			items: [
				{
					title: "جمع‌آوری شماره هنگام پرداخت",
					desc: "صورت‌حساب مشتریان",
				},
				{
					title: "ارسال منوی روزانه و پیشنهاد ویژه",
					desc: "از طریق پیامک",
				},
				{ title: "رزرو میز از طریق پیامک", desc: "ساده و سریع" },
				{
					title: "کمپین کاهش ضایعات غذایی",
					desc: "اطلاع‌رسانی غذای باقی‌مانده",
				},
				{ title: "نظرسنجی سریع پس از غذا", desc: "بهبود کیفیت خدمات" },
			],
			order: 1,
		});
	}

	console.log("✅ Database seeded successfully with 4 pages!");
}

// Run the seed
seed()
	.catch((err) => {
		console.error("❌ Seeding failed:", err);
	})
	.finally(() => process.exit(0));
