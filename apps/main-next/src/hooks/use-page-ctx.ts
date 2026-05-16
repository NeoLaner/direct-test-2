import { useContext } from "react";
import { PageCtxContext } from "~/providers/page-ctx-provider";

export const usePageCtx = () => {
	const context = useContext(PageCtxContext);
	if (context === undefined) {
		throw new Error("usePage must be used within a PageProvider");
	}
	return context;
};
