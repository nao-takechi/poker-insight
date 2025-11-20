const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/app/$1",
    "^next/navigation$": "<rootDir>/__mocks__/next/navigation.ts",
  },

  setupFilesAfterEnv: ["<rootDir>/app/setupTests.ts"],

  testPathIgnorePatterns: ["<rootDir>/e2e/", "<rootDir>/node_modules/"],

  transformIgnorePatterns: ["node_modules/(?!(until-async)/)"],

  collectCoverage: false,

  extensionsToTreatAsEsm: [".ts", ".tsx"],

  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};

module.exports = createJestConfig(customJestConfig);
