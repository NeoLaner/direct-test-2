import { cn } from "@workspace/ui/lib/utils";

type SectionsItemCardProps = {
	title: string;
	desc: string;
	className?: string;
};

export function SectionsItemCard({
	title,
	desc,
	className,
}: SectionsItemCardProps) {
	return (
		<div
			className={cn(
				"flex-1 rounded-2xl border p-4 shadow-sm md:p-8",
				className,
			)}
		>
			<h4 className="mb-2 font-semibold">{title}</h4>
			<p className="text-muted-foreground text-sm">{desc}</p>
		</div>
	);
}
