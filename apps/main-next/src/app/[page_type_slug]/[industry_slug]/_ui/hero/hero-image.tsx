import { cn } from "@workspace/ui/lib/utils";
import Image from "next/image";

type HeroImageProps = {
	src: string;
	alt: string;
	className?: string;
};

export function HeroImage({ src, alt, className }: HeroImageProps) {
	return (
		<figure
			className={cn(
				"relative flex aspect-16/13 h-40 w-fit items-center justify-center rounded-2xl bg-primary sm:h-64 md:h-96",
				className,
			)}
		>
			<Image
				src={src}
				alt={alt}
				className="rounded-2xl object-cover md:w-lg lg:w-3xl"
				priority
				fill
			/>
		</figure>
	);
}
