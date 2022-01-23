/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
	bail: true,
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: "__tests__/coverage",
	coverageProvider: "v8",
	collectCoverageFrom: [
		"src/**",
		"!src/server.ts",
		"!src/@types/*.ts",
		"!src/database/**"
	],
	coveragePathIgnorePatterns: [
		"./node_modules"
	],
	preset: "ts-jest",
	testMatch: [
		"**/__tests__/**/*.test.ts",
		//"!**/__tests__/unit/**.test.ts"
	],
	transform: {
		"^.+\\.ts?$": "ts-jest",
	},
};
