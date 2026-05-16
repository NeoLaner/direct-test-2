import { cn } from "@workspace/ui/lib/utils";

// Nav.Brand - for logo/branding
export function NavBrand({ className }: { className?: string }) {
	return (
		<a
			href="/"
			className={cn(
				"font-bold text-2xl transition-opacity hover:opacity-80",
				className,
			)}
			aria-label="Direct - صفحه اصلی"
		>
			Direct
		</a>
	);
}
