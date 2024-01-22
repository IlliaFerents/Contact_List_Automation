const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  projectId: "g6at4p",
  e2e: {
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      require("@cypress/grep/src/plugin")(config);
      return config;
    },
  },
  env: { ...process.env, grepFilterSpecs: true, grepOmitFiltered: true },
});
