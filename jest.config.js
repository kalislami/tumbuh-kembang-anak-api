// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,

    // The directory where Jest should output its coverage files
    coverageDirectory: "coverage",

    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: 'v8',

    coveragePathIgnorePatterns: [
        'node_modules',
        '__test__',
    ],

    // Indicates whether each individual test should be reported during the run
    verbose: true,
    
    coverageThreshold: {
        global: {
            statements: 100,
            branches: 100,
            functions: 100,
            lines: 100
        }
    },

    // Setting test report for sonarcube
    reporters: ['default', 'jest-sonar'],

    // Automatically reset mock state before every test
    resetMocks: true,

    // Automatically restore mock state and implementation before every test
    restoreMocks: true,
};
