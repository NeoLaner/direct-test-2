import type { ReactNode } from "react";
import { PageCtxProvider } from "~/providers/page-ctx-provider";
import Footer from "./_ui/footer";
import Nav from "./_ui/nav";

export default function layout({ children }: { children: ReactNode }) {
	return (
		<PageCtxProvider>
			<div className="flex min-h-svh w-full flex-col gap-16">
				<Nav>
					<Nav.Action />
					<Nav.Brand />
				</Nav>
				<div className="flex-1">{children}</div>
				<Footer>
					<Footer.Copyright />
				</Footer>
			</div>
		</PageCtxProvider>
	);
}
