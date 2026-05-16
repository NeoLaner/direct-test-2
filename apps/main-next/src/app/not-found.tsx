export default function NotFound() {
	return (
		<main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
			<section className="px-6 text-center">
				<div className="mb-8">
					<h1 className="mb-4 font-bold text-8xl text-gray-800 dark:text-gray-200">
						404
					</h1>
					<hr className="mx-auto h-1 w-24 rounded-full border-0 bg-primary" />
				</div>

				<h2 className="mb-6 font-semibold text-3xl text-gray-700 dark:text-gray-300">
					این صفحه رو تموم کردیم
				</h2>

				<p className="mx-auto mb-10 max-w-md text-gray-500 text-lg dark:text-gray-400">
					صفحه‌ای که دنبالش بودید وجود ندارد یا حذف شده است.
				</p>
			</section>
		</main>
	);
}
