import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
	const requestHeaders = new Headers(request.headers);

	const requestId =
		requestHeaders.get("x-request-id") ||
		`main-next-${crypto.randomUUID()}`;

	requestHeaders.set("x-request-id", requestId);

	const { pathname, search } = request.nextUrl;
	const _method = request.method;

	const _ipAddress =
		request.headers.get("x-forwarded-for")?.split(",")[0] ||
		request.headers.get("x-real-ip") ||
		"unknown";

	const response = NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});

	return response;
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
	],
};
