"use client";

import { Button } from "@workspace/ui/components/shadcn-ui/button";
import { cn } from "@workspace/ui/lib/utils";
import type { ComponentProps } from "react";
import { usePageCtx } from "~/hooks/use-page-ctx";

// Nav.Action - for CTA button
export function NavAction({
	className,
	...props
}: ComponentProps<typeof Button>) {
	const { scrollToCTA } = usePageCtx();
	return (
		<Button onClick={scrollToCTA} className={cn("", className)} {...props}>
			همین الان شروع کن
		</Button>
	);
}
