"use client";

import { Button } from "@workspace/ui/components/shadcn-ui/button";
import { usePageCtx } from "~/hooks/use-page-ctx";

export function Cta({ ctaText }: { ctaText: string }) {
	const { ctaRef } = usePageCtx();

	return (
		<div
			ref={ctaRef}
			className="mt-16 flex flex-col items-center justify-between gap-8 rounded-2xl p-4 text-center md:flex-row md:bg-accent md:text-right md:text-accent-foreground"
		>
			<div>
				<h4 className="font-bold text-lg">{ctaText}</h4>
				<span className="text-xs">
					کارشناسان ما آماده کمک به رشد کسب و کار شما هستند
				</span>
			</div>

			<Button size={"lg"}>شروع کنید</Button>
		</div>
	);
}
