/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
	bail: true,
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: "__tests__/coverage",
	coverageProvider: "v8",
	collectCoverageFrom: [
		"src/**",
		"!src/server.ts"
	],
	coveragePathIgnorePatterns: [
		"./node_modules"
	],
	preset: "ts-jest"
};
