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
				"relative flex aspect-16/13 w-2/3 items-center justify-center rounded-2xl bg-primary md:w-lg lg:w-3xl",
				className,
			)}
		>
			<Image src={src} alt={alt} className="rounded-2xl" priority fill />
		</figure>
	);
}
