import { defineConfig } from 'cypress';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild';
import cypressSplit from 'cypress-split';
import fs from 'fs';
import path from 'path';
import { ExecutionFinalizer } from './cypress/support/reports/ExecutionFinalizer';
import { Scenario, TestReport } from './cypress/support/reports/hierarchicalReport';

export default defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  videoCompression: 32,
  e2e: {
    baseUrl: 'https://kooperativa.sk/',
    pageLoadTimeout: 120_000,
    defaultCommandTimeout: 7_000,
    requestTimeout: 20_000,
    numTestsKeptInMemory: 0,
    chromeWebSecurity: false,
    experimentalRunAllSpecs: true,
    testIsolation: false,
    specPattern: 'cypress/e2e/features/**/*.feature',
    retries: 0,
    viewportWidth: 1280,
    viewportHeight: 720,
    env: {
      businessMaxPath: 'poistenie/firmy-zivnostnici/biznis-max',
      stepDefinitions: 'cypress/support/step_definitions/**/*.{js,ts}',
    },

    async setupNodeEvents(on, config) {
      // Cucumber + Split pluginy
      cypressSplit(on, config);
      await addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // ===================== TASKY =====================
      on('task', {
        getNodeInfo() {
          return {
            nodeVersion: process.version,
            os: process.platform,
          };
        },

        appendScenarioToReport(scenario: Scenario) {
          try {
            const reportPath = path.resolve('cypress/reports/hierarchicalReport.json');
            fs.mkdirSync(path.dirname(reportPath), { recursive: true });

            let report: TestReport = { nodeVersion: process.version, os: process.platform, scenarios: [] };
            if (fs.existsSync(reportPath)) {
              try {
                const raw = fs.readFileSync(reportPath, 'utf-8');
                report = JSON.parse(raw);
              } catch {
                console.warn('⚠️ Existing report could not be parsed, starting fresh.');
              }
            }

            if (!report.scenarios) report.scenarios = [];
            report.scenarios.push(scenario);

            fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
            console.log(`✅ Scenario "${scenario.scenario}" appended to report.`);
          } catch (err) {
            console.error('❌ Error appending scenario to report:', err);
          }
          return null;
        },

        finalizeReport() {
          try {
            const reportPath = path.resolve('cypress/reports/hierarchicalReport.json');
            ExecutionFinalizer.finalizeExecution(reportPath);
          } catch (err) {
            console.error('❌ Error finalizing report:', err);
          }
          return null;
        },
      });

      return config;
    },
  },
});
