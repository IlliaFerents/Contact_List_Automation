const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "g6at4p",
  e2e: {
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      require("@bahmutov/cy-grep/src/plugin")(config);
      return config;
    },
  },
  env: { grepFilterSpecs: true, grepOmitFiltered: true },
});
