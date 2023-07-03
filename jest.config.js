module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  modulePaths: ["<rootDir>"],
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@controllers/(.*)$": "<rootDir>/src/controllers/$1",
    "^@models/(.*)$": "<rootDir>/src/models/$1",
    "^@routes/(.*)$": "<rootDir>/src/routes/$1",
    "^@config/(.*)$": "<rootDir>/src/config/$1",
    "^@middlewares/(.*)$": "<rootDir>/src/middlewares/$1",
    "^@auth/(.*)$": "<rootDir>/src/auth/$1",
  },
  testMatch: ["**/*.test.ts"], // Specify the test file pattern
  collectCoverageFrom: ["src/**/*.ts"], // Specify the source files to collect coverage from
};
