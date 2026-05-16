import { cn } from "@workspace/ui/lib/utils";
import type { ReactNode } from "react";
import { SectionsItem } from "./sections-item";
import { SectionsItemCard } from "./sections-item-card";

function Sections({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return <main className={cn("mx-auto", className)}>{children}</main>;
}

Sections.Item = SectionsItem;
Sections.ItemCard = SectionsItemCard;

export default Sections;
