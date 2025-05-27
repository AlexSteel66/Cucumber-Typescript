import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";
import cypressSplit from "cypress-split";

export default defineConfig({
  video: false,
  screenshotOnRunFailure: true,
  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",
  videoCompression: 32,
  e2e: {
    baseUrl: "https://kooperativa.sk/",
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 7000,
    requestTimeout: 20000,
    numTestsKeptInMemory: 0,
    chromeWebSecurity: false,
    experimentalRunAllSpecs: true,
    testIsolation: false,
    specPattern: "cypress/e2e/features/**/*.feature",
    retries: 0,
    viewportWidth: 1280,
    viewportHeight: 720,
    env: {
      businessMaxPath: "poistenie/firmy-zivnostnici/biznis-max",
      stepDefinitions: "cypress/support/step_definitions/**/*.{js,ts}",
      // TAGS: "@Latka",
      cucumberJson: {
        generate: false,
        outputFolder: "cypress/reports/cucumber-json/",
        filePrefix: "",
        fileSuffix: ".cucumber",
        cucumber: {
          filterSpecs: true,
        },
      },
    },
    async setupNodeEvents(on, config) {
      cypressSplit(on, config);
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
  },
});