"use client";

import { Button } from "@workspace/ui/components/shadcn-ui/button";
import { cn } from "@workspace/ui/lib/utils";
import { usePageCtx } from "~/hooks/use-page-ctx";

type HeroContentProps = {
	headline: string;
	subheadline: string;
	buttonText?: string;
	onButtonClick?: () => void;
	className?: string;
};

export function HeroContent({
	headline,
	subheadline,
	buttonText = "دریافت مشاوره رایگان",
	className,
}: HeroContentProps) {
	const { scrollToCTA } = usePageCtx();

	return (
		<div
			className={cn(
				"flex flex-col items-center gap-10 px-4 py-6 md:items-stretch",
				className,
			)}
		>
			<div className="flex-1">
				<h1 className="mb-6 font-bold text-4xl">{headline}</h1>
				<p className="text-muted-foreground text-sm">{subheadline}</p>
			</div>

			<Button size={"lg"} className="w-fit" onClick={scrollToCTA}>
				<span className="">{buttonText}</span>
				<span>&larr;</span>
			</Button>
		</div>
	);
}
