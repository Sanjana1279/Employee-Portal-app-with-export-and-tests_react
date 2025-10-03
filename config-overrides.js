module.exports = {
  // Override Jest config
  jest: (config) => {
    // Add your separate test folder to roots
    config.roots = ['<rootDir>/src', '<rootDir>/tests'];
    // Optionally adjust testMatch pattern if needed
    config.testMatch = [
      "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
      "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}",
      "<rootDir>/tests/**/*.{spec,test}.{js,jsx,ts,tsx}"
    ];
    return config;
  },
};
