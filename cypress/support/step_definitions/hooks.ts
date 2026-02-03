import {
  startScenario,
  ensureScenario,
  finalizeScenario,
  reportStep,
  StepStatus,
  currentStepName,
  currentScenario,
  setCurrentStep,
  clearCurrentStep,
} from '../reports/hierarchicalReport';

import { formatDuration } from '../reports/TimeUtils';
import { BeforeStep, AfterStep } from '@badeball/cypress-cucumber-preprocessor';

const toSafeName = (value: string) =>
  value.replace(/[^a-zA-Z0-9]/g, '_');

// ======================================================
// STEP CONTEXT
// ======================================================

BeforeStep(function ({ pickleStep }) {
  setCurrentStep(pickleStep.text);
});

AfterStep(function () {
  clearCurrentStep();
});

// ======================================================
// GLOBAL FAIL HANDLER (NO SCREENSHOT HERE)
// ======================================================

Cypress.on('fail', function (error) {
  const stepName = currentStepName || 'Unknown step';

  reportStep(stepName, 'FAILED', {
    messages: [error.message, error.stack || ''],
  });

  throw error;
});

// ======================================================
// BEFORE EACH SCENARIO
// ======================================================

beforeEach(function () {
  const test = this.currentTest!;
  startScenario(
    test.parent?.title || 'Unknown feature',
    test.title || 'Unknown scenario'
  );
});

// ======================================================
// AFTER EACH SCENARIO
// ======================================================

afterEach(function () {
  const test = this.currentTest!;
  const feature = test.parent?.title || 'Unknown feature';
  const scenario = test.title || 'Unknown scenario';

  ensureScenario(feature, scenario);

  const status: StepStatus =
    test.state === 'failed'
      ? 'FAILED'
      : test.pending
      ? 'SKIPPED'
      : 'PASSED';

  // ===== TEST TIME =====
  if (currentScenario) {
    currentScenario.testEndTime = new Date().toISOString();
    currentScenario.testDuration = formatDuration(
      currentScenario.testStartTime!,
      currentScenario.testEndTime
    );
  }

  // ====================================================
  // FAILED → screenshot na KROK
  // ====================================================

  if (status === 'FAILED' && currentScenario) {
    const failedStep = [...currentScenario.steps]
      .reverse()
      .find(s => s.status === 'FAILED');

    if (failedStep) {
      const safeFeature = toSafeName(feature);
      const safeScenario = toSafeName(scenario);
      const safeStep = toSafeName(failedStep.step);
      const timestamp = Date.now();

      const screenshotRelativePath =
        `cypress/screenshots/${safeFeature}/${safeScenario}/failed/${safeStep}-${timestamp}.png`;

      const screenshotCypressPath =
        `${safeFeature}/${safeScenario}/failed/${safeStep}-${timestamp}`;

      cy.screenshot(screenshotCypressPath, { capture: 'runner' }).then(() => {
        failedStep.screenshot = screenshotRelativePath;
        cy.task('appendScenarioToReport', currentScenario);
        finalizeScenario();
      });

      return;
    }
  }

  // ====================================================
  // PASSED / SKIPPED
  // ====================================================

  reportStep(`Scenario "${scenario}" executed`, status);
  cy.task('appendScenarioToReport', currentScenario);
  finalizeScenario();
});

// ======================================================
// AFTER ALL TESTS
// ======================================================

after(() => {
  cy.task('finalizeReport');
});
