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
import { Before, After, BeforeStep, AfterStep } from '@badeball/cypress-cucumber-preprocessor';

// ======================================================
// STEP HOOKS
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

  throw error; // Cypress musí vedieť, že test padol
});

// ======================================================
// BEFORE EACH SCENARIO
// ======================================================

beforeEach(function () {
  const test = this.currentTest!;
  const featureName = test.parent?.title || 'Unknown feature';
  const scenarioName = test.title || 'Unknown scenario';

  startScenario(featureName, scenarioName);
});

// ======================================================
// AFTER EACH SCENARIO
// ======================================================

afterEach(function () {
  const test = this.currentTest!;
  const featureName = test.parent?.title || 'Unknown feature';
  const scenarioName = test.title || 'Unknown scenario';

  ensureScenario(featureName, scenarioName);

  const status: StepStatus =
    test.state === 'failed'
      ? 'FAILED'
      : test.pending
      ? 'SKIPPED'
      : 'PASSED';

  // ===================== TEST TIME =====================
  if (currentScenario) {
    if (!currentScenario.testStartTime) {
      currentScenario.testStartTime = new Date().toISOString();
    }

    currentScenario.testEndTime = new Date().toISOString();
    currentScenario.testDuration = formatDuration(
      currentScenario.testStartTime,
      currentScenario.testEndTime
    );
  }

  // ====================================================
  // FAILED SCENARIO → ONE SCREENSHOT ONLY
  // ====================================================

  if (status === 'FAILED' && currentScenario) {
    const screenshotFileName =
      `${scenarioName.replace(/[^a-zA-Z0-9]/g, '_')}-${Date.now()}`;

    cy.screenshot(`${featureName}/${screenshotFileName}`, {
      capture: 'runner',
    }).then(() => {
      const screenshotPath =
        `cypress/screenshots/${featureName}/${screenshotFileName}.png`;

      // 🔥 pripoj screenshot k POSLEDNÉMU FAILED STEPU
      const lastFailedStep = [...currentScenario.steps]
        .reverse()
        .find(step => step.status === 'FAILED');

      if (lastFailedStep) {
        lastFailedStep.screenshot = screenshotPath;
      }

      cy.task('appendScenarioToReport', currentScenario);
      finalizeScenario();
    });

    return;
  }

  // ====================================================
  // PASSED / SKIPPED SCENARIO
  // ====================================================

  reportStep(`Scenario "${scenarioName}" executed`, status);

  if (currentScenario) {
    cy.task('appendScenarioToReport', currentScenario);
  }

  finalizeScenario();
});

// ======================================================
// AFTER ALL TESTS
// ======================================================

after(() => {
  cy.task('finalizeReport');
});
