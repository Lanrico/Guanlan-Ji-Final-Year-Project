const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: false,
  e2e: {
    "baseUrl": "http://127.0.0.1:8081",
    "viewportWidth": 1980,
    "viewportHeight": 1080,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
