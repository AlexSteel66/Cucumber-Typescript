import { defineConfig } from "cypress";
//import allureWriter from '@shelex/cypress-allure-plugin/writer';
module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  video: false,
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Cypress Inline Reporter',
    embeddedScreenshots: true,
    inlineAssets: true, //Adds the asserts inline
  },
  e2e: {
    baseUrl: "https://todo.qacart.com",
    video: true,
    setupNodeEvents(on, config) {
    require('cypress-mochawesome-reporter/plugin')(on);

    },
  },

  // export default defineConfig({
  //   projectId: 'bfttb5',
  //   e2e: {
  //     baseUrl: "https://todo.qacart.com",
  //     video: true,
  //     setupNodeEvents(on, config) {
  //       allureWriter(on, config);
  //       return config;
  //     },
  //     env: {
  //       allure: true,
  //       allureAttachRequests: true,
  //       allureAddVideoOnPass: true,
  //       allureResultsPath: "allure-results",
  //       allureReuseAfterSpec: true,
  //       allureClearSkippedTests: false,
  //     },
  //   },
  });
