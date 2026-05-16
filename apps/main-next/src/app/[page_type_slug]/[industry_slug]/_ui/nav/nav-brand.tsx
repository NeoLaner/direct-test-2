import { cn } from "@workspace/ui/lib/utils";

// Nav.Brand - for logo/branding
export function NavBrand({ className }: { className?: string }) {
	return <div className={cn("font-bold text-2xl", className)}>Direct</div>;
}
