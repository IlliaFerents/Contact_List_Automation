const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "g6at4p",
  e2e: {
    watchForFileChanges: false,
  },
});
