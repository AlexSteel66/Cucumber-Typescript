import { defineConfig } from 'cypress';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild';
import cypressSplit from 'cypress-split';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  video: false,
  screenshotOnRunFailure: true,
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
      cucumberJson: {
        generate: false,
        outputFolder: 'cypress/reports/cucumber-json/',
        filePrefix: '',
        fileSuffix: '.cucumber',
        cucumber: { filterSpecs: true },
      },
    },

    async setupNodeEvents(on, config) {
      // Split plugin
      cypressSplit(on, config);

      // Cucumber preprocessor
      await addCucumberPreprocessorPlugin(on, config);

      // File preprocessor
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // ------------------- TASKY -------------------
      on('task', {
        // Uloženie hierarchického reportu JSON
        saveReport(report) {
          try {
            const reportPath = path.resolve('cypress/reports/hierarchicalReport.json');
            fs.mkdirSync(path.dirname(reportPath), { recursive: true });

            // Kontrola existujúceho reportu
            let existingReport = null;
            if (fs.existsSync(reportPath)) {
              try {
                const raw = fs.readFileSync(reportPath, 'utf-8');
                existingReport = JSON.parse(raw);
              } catch (e) {
                console.warn('⚠️ Could not parse existing report, overwriting.');
              }
            }

            // Ak existuje, doplni nové scenáre
            if (existingReport && Array.isArray(existingReport.scenarios)) {
              report.scenarios = [...existingReport.scenarios, ...report.scenarios];
            }

            fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
            console.log(`✅ Hierarchical report written to: ${reportPath}`);
          } catch (err) {
            console.error('❌ Error saving hierarchical report:', err);
          }
          return null;
        },

        // Uloženie screenshotu pri FAIL kroku (Base64)
        saveScreenshot({ src, path: screenshotPath }: { src: string; path: string }) {
          try {
            if (!src) {
              console.warn(`⚠️ saveScreenshot called without src: ${screenshotPath}`);
              return null;
            }

            fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
            fs.writeFileSync(screenshotPath, Buffer.from(src, 'base64'));
            console.log(`📸 Screenshot saved: ${screenshotPath}`);
          } catch (err) {
            console.error('❌ Error saving screenshot:', err);
          }
          return null;
        },
      });

      return config;
    },
  },
});