require("dotenv").config();

module.exports = {
    preset: "ts-jest/presets/js-with-ts",
    testEnvironment: "node",
    setupFiles: ["dotenv/config"],
    testPathIgnorePatterns: ["/node_modules/", "build", "\\.test\\.js$"],
};
