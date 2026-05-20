import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
	pageContents,
	pageContentsRelations,
	pageSections,
	pageSectionsRelations,
} from "../tables";

const conn = postgres(process.env.DATABASE_URL as string);

const schema = {
	pageContents,
	pageSections,
	pageContentsRelations,
	pageSectionsRelations,
};

export const db = drizzle(conn, {
	schema,
	casing: "snake_case",
});

async function seed() {
	console.log("🌱 Starting database seeding...");

	// ========================
	// Benefits - Clothing Store
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
			heroImage: "/images/hero/clothing-store.webp",
			ctaText: "همین حالا مشاوره رایگان دریافت کنید",
			activeStores: "۱۱۰۰۰",
			keywords:
				"فروشگاه پوشاک, افزایش فروش, پیامک تبلیغاتی, باشگاه مشتریان, دایرکت",
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
					id: 1,
					title: "جمع‌آوری آسان شماره مشتریان",
					desc: "در ورودی فروشگاه و هنگام پرداخت",
				},
				{
					id: 2,
					title: "ارسال تخفیف‌های فصلی و حراج",
					desc: "مانتو، شلوار، لباس کودک و ...",
				},
				{
					id: 3,
					title: "وفادارسازی مشتریان",
					desc: "پیامک تولد و خرید مجدد با تخفیف ویژه",
				},
				{
					id: 4,
					title: "افزایش فروش",
					desc: "تا ۳۰٪ با کمپین‌های هوشمند",
				},
			],
			order: 1,
		});
	}

	// ========================
	// Benefits - Restaurant
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
			heroImage: "/images/hero/restaurant.webp",
			ctaText: "همین حالا مشاوره رایگان دریافت کنید",
			activeStores: "۵۶۰۰",
			keywords:
				"رستوران, افزایش فروش, پیامک تبلیغاتی, باشگاه مشتریان, دایرکت",
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
					id: 1,
					title: "جمع‌آوری شماره هنگام پرداخت",
					desc: "هر مشتری که صورت‌حساب پرداخت می‌کند",
				},
				{
					id: 2,
					title: "ارسال منوی روزانه و پیشنهاد ویژه",
					desc: "جذب مشتری بیشتر",
				},
				{
					id: 3,
					title: "کمپین‌های جشنواره و تخفیف",
					desc: "افزایش فروش در مناسبت‌ها",
				},
				{
					id: 4,
					title: "حفظ مشتریان ثابت",
					desc: "وفادارسازی بلندمدت",
				},
			],
			order: 1,
		});
	}

	// ========================
	// Features - Clothing Store
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
			heroImage: "/images/hero/clothing-store.webp",
			ctaText: "آماده‌اید فروشگاه خود را هوشمند کنید؟",
			activeStores: "۱۱۰۰۰",
			keywords:
				"فروشگاه پوشاک, افزایش فروش, پیامک تبلیغاتی, باشگاه مشتریان, دایرکت",
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
					id: 1,
					title: "جمع‌آوری خودکار شماره مشتریان",
					desc: "در ورودی فروشگاه و هنگام پرداخت",
				},
				{
					id: 2,
					title: "دسته‌بندی هوشمند مشتریان",
					desc: "بر اساس خریدهای قبلی، فصل و جنسیت",
				},
				{
					id: 3,
					title: "ارسال پیامک حراج و تخفیف فصلی",
					desc: "هدفمند و شخصی‌سازی شده",
				},
				{
					id: 4,
					title: "اطلاع‌رسانی موجودی سایز و رنگ",
					desc: "به مشتریان علاقه‌مند",
				},
			],
			order: 1,
		});
	}

	// ========================
	// Features - Restaurant
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
			heroImage: "/images/hero/restaurant.webp",
			ctaText: "آماده‌اید رستوران خود را هوشمند کنید؟",
			activeStores: "۵۶۰۰",
			keywords:
				"رستوران, افزایش فروش, پیامک تبلیغاتی, باشگاه مشتریان, دایرکت",
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
					id: 1,
					title: "جمع‌آوری شماره هنگام پرداخت",
					desc: "صورت‌حساب مشتریان",
				},
				{
					id: 2,
					title: "ارسال منوی روزانه و پیشنهاد ویژه",
					desc: "از طریق پیامک",
				},
				{ id: 3, title: "رزرو میز از طریق پیامک", desc: "ساده و سریع" },
				{
					id: 4,
					title: "کمپین کاهش ضایعات غذایی",
					desc: "اطلاع‌رسانی غذای باقی‌مانده",
				},
			],
			order: 1,
		});
	}

	console.log("✅ Database seeded successfully with 4 pages!");
}

seed()
	.catch((err) => {
		console.error("❌ Seeding failed:", err);
	})
	.finally(() => process.exit(0));
