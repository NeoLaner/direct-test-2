import { Button } from "@workspace/ui/components/shadcn-ui/button";
import type { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-h-svh w-full flex-col gap-16">
			<nav className="flex w-full justify-between border-b-2 p-4">
				<Button>همین الان شروع کن</Button>
				<div className="font-bold text-2xl">Direct</div>
			</nav>
			<div className="flex-1">{children}</div>
			<footer className="flex w-full justify-between bg-muted p-4 text-muted-foreground">
				<div>© ۲۰۲۴ دایرکت. تمامی حقوق محفوظ است.</div>
			</footer>
		</div>
	);
}
