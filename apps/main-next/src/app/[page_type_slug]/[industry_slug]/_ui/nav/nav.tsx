import { cn } from "@workspace/ui/lib/utils";
import type { ReactNode } from "react";
import { NavAction } from "./nav-action";
import { NavBrand } from "./nav-brand";

// Main Nav container
function Nav({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"flex w-full justify-between border-b-2 p-4",
				className,
			)}
		>
			{children}
		</div>
	);
}

Nav.Action = NavAction;
Nav.Brand = NavBrand;

export default Nav;
