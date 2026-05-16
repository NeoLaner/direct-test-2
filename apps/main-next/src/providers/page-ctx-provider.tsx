"use client";

import { createContext, type ReactNode, type RefObject, useRef } from "react";

interface PageContextType {
	ctaRef: RefObject<HTMLDivElement | null>;
	scrollToCTA: () => void;
}

export const PageCtxContext = createContext<PageContextType | undefined>(
	undefined,
);

export const PageCtxProvider = ({ children }: { children: ReactNode }) => {
	const ctaRef = useRef<HTMLDivElement>(null);

	const scrollToCTA = () => {
		ctaRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "center", //
		});
	};

	return (
		<PageCtxContext.Provider value={{ ctaRef, scrollToCTA }}>
			{children}
		</PageCtxContext.Provider>
	);
};
