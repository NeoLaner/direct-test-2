import { cn } from "@workspace/ui/lib/utils";
import type { ReactNode } from "react";
import { HeroContent } from "./hero-content";
import { HeroImage } from "./hero-image";

function Hero({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<section className={cn("text-center md:text-right", className)}>
			<div className="flex flex-col items-center justify-between gap-10 md:flex-row md:items-stretch">
				{children}
			</div>
		</section>
	);
}

Hero.Content = HeroContent;
Hero.Image = HeroImage;

export default Hero;
