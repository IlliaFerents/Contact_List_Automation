const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    reportFilename: "[status]_[datetime]_report",
    timestamp: "dd-mmm",
    overwrite: false,
  },
  projectId: "g6at4p",
  e2e: {
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      require("@cypress/grep/src/plugin")(config);
      return config;
    },
  },
  env: { ...process.env, grepFilterSpecs: true, grepOmitFiltered: true },
});
