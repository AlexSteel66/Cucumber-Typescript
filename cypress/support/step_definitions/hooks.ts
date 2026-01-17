import {
  startScenario,
  ensureScenario,
  finalizeScenario,
  reportStep,
  testReport,
  StepStatus,
  currentStepName,
  setCurrentStep,
  clearCurrentStep,
} from '../reports/hierarchicalReport';

import { BeforeStep, AfterStep } from '@badeball/cypress-cucumber-preprocessor';

// ===================== BEFORE / AFTER STEP =====================
BeforeStep(function ({ pickleStep }) {
  setCurrentStep(pickleStep.text); // presný názov kroku + parametre
});

AfterStep(() => {
  clearCurrentStep(); // po kroku vyčistí currentStepName
});

// ===================== GLOBAL FAIL HANDLER =====================
Cypress.on('fail', function (error) {
  reportStep(
    currentStepName || this.currentTest?.title || 'Unknown step',
    'FAILED',
    {
      messages: [error.message, error.stack || ''],
    }
  );
  throw error; // zachovať fail stavu testu
});

// ===================== BEFORE TEST SUITE =====================
before(() => {
  console.log('===== Test suite starting =====');
  testReport.startTime = new Date().toISOString();
});

// ===================== AFTER TEST SUITE =====================
after(() => {
  console.log('===== Test suite finished =====');

  testReport.endTime = new Date().toISOString();
  testReport.duration =
    new Date(testReport.endTime).getTime() -
    new Date(testReport.startTime!).getTime();

  cy.task('saveReport', testReport).then(() => {
    console.log('✅ Final hierarchical report saved.');
    console.log(`📊 Total scenarios: ${testReport.scenarios.length}`);
  });
});

// ===================== BEFORE EACH TEST =====================
beforeEach(function () {
  const test = this.currentTest!;
  const featureName = test.parent?.title || 'Unknown feature';
  const scenarioName = test.title || 'Unknown scenario';

  startScenario(featureName, scenarioName);
});

// ===================== AFTER EACH TEST =====================
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

  const stepMessages: string[] = [];

  if (test.err) {
    stepMessages.push(test.err.message);
    if (test.err.stack) stepMessages.push(test.err.stack);
  }

  // Summary krok scenára
  reportStep(`Scenario "${scenarioName}" executed`, status, {
    messages: stepMessages,
  });

  // Screenshot len pri FAILED
  if (status === 'FAILED' && Cypress.spec?.name) {
    const screenshotName = `${scenarioName.replace(/\s+/g, '_')}-${Date.now()}.png`;
    const screenshotPath = `cypress/screenshots/${Cypress.spec.name}/${screenshotName}`;

    reportStep('Screenshot attached', 'FAILED', {
      screenshot: screenshotPath,
    });

    console.log(`📸 Screenshot path recorded: ${screenshotPath}`);
  }

  finalizeScenario();
});