import { cn } from "@workspace/ui/lib/utils";

export function FooterCopyright({ className }: { className?: string }) {
	return (
		<div className={cn("", className)}>
			© ۲۰۲۴ دایرکت. تمامی حقوق محفوظ است.
		</div>
	);
}
