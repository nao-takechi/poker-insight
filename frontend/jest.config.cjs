const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/app/$1",
  },

  setupFilesAfterEnv: ["<rootDir>/app/setupTests.ts"],

  testPathIgnorePatterns: ["<rootDir>/e2e/", "<rootDir>/node_modules/"],
};

module.exports = createJestConfig(customJestConfig);
