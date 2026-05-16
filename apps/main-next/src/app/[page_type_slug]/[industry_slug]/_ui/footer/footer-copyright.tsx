import { cn } from "@workspace/ui/lib/utils";

export function FooterCopyright({ className }: { className?: string }) {
	return (
		<small className={cn("text-xs", className)}>
			© ۲۰۲۴ دایرکت. تمامی حقوق محفوظ است.
		</small>
	);
}
