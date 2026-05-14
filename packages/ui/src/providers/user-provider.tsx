"use client";

// context/UserContext.tsx
import { createContext, type ReactNode } from "react";

interface User {
	name?: string | null;
	profilePhoto?: string | null;
	email?: string | null;
	id?: string | null;
}

export interface UserContextType {
	user: User | null | undefined;
}

export const UserContext = createContext<UserContextType | undefined>(
	undefined,
);

export const UserProvider = ({
	children,
	user,
}: {
	children: ReactNode;
	user: User | null | undefined;
}) => {
	return (
		<UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
	);
};
