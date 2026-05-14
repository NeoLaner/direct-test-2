/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
	typedRoutes: true, // Now stable!
	transpilePackages: [
		"@workspace/ui",
		"@workspace/next-ui",
		"@workspace/db",
		"@workspace/rpc-server",
		"@workspace/service",
	],
	reactStrictMode: false,
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},

	experimental: {
		authInterrupts: true,
		taint: true,
	},

	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "placehold.co",
			},
		],
	},

	allowedDevOrigins: ["ggdeal.org", "*.ggdeal.org", "192.168.1.100"],
};

export default config;
