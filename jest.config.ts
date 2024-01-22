import type { JestConfigWithTsJest } from "ts-jest"

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest/presets/js-with-ts-esm",
  extensionsToTreatAsEsm: [".ts", ".mts"],
  transformIgnorePatterns: [], // transform everything
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  testPathIgnorePatterns: [],
  // coverage
  collectCoverageFrom: ["src/**/*.{ts,mjs,cjs,mts}"],
  coveragePathIgnorePatterns: ["assets"],
  verbose: true,
}
export default jestConfig
