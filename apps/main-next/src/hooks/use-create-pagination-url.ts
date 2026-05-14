import { usePathname, useSearchParams } from "next/navigation";

export function useCreatePaginationPageUrl() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const createPaginationUrl = (pageNumber: number | string) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", pageNumber.toString());
		return `${pathname}/?${params.toString()}` as "/";
	};

	return { createPaginationUrl };
}
