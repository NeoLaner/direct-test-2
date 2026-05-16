import { cn } from "@workspace/ui/lib/utils";
import type { ReactNode } from "react";
import { FooterCopyright } from "./footer-copyright";

function Footer({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<footer
			className={cn(
				"flex w-full justify-between bg-muted p-4 text-muted-foreground",
				className,
			)}
		>
			{children}
		</footer>
	);
}

Footer.Copyright = FooterCopyright;

export default Footer;
