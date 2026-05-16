import { cn } from "@workspace/ui/lib/utils";
import { SectionsItemCard } from "./sections-item-card";

type SectionsItemProps = {
	title: string;
	items: Array<{
		id: number;
		title: string;
		desc: string;
	}>;
	className?: string;
};

export function SectionsItem({ title, items, className }: SectionsItemProps) {
	return (
		<div className={cn("mb-16 w-full", className)}>
			<h3 className="mb-8 text-center font-semibold text-3xl">{title}</h3>

			<div className="flex flex-col gap-4 md:flex-row">
				{items.map((item) => (
					<SectionsItemCard
						key={item.id}
						title={item.title}
						desc={item.desc}
					/>
				))}
			</div>
		</div>
	);
}
