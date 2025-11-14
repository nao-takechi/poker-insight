import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/app/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/app/setupTests.ts"],

  testPathIgnorePatterns: ["<rootDir>/e2e/", "<rootDir>/node_modules/"],
};

export default createJestConfig(customJestConfig);
