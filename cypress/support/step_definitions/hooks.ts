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

import { formatDuration } from '../reports/TimeUtils';
import {
  Before,
  After,
  BeforeStep,
  AfterStep,
} from '@badeball/cypress-cucumber-preprocessor';

// ===================== STEP HOOKS =====================

BeforeStep(function ({ pickleStep }) {
  setCurrentStep(pickleStep.text);
});

AfterStep(() => {
  clearCurrentStep();
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

  throw error;
});

// ===================== BEFORE TEST SUITE =====================

before(() => {
  cy.task<{ nodeVersion: string; os: string }>('getNodeInfo').then(info => {
    testReport.nodeVersion = info.nodeVersion;
    testReport.os = info.os;
  });

  testReport.scenarioStartTime = new Date().toISOString();
});

// ===================== AFTER TEST SUITE =====================

after(() => {
  testReport.scenarioEndTime = new Date().toISOString();
  testReport.scenarioDuration = formatDuration(
    testReport.scenarioStartTime!,
    testReport.scenarioEndTime
  );

  cy.task('saveReport', testReport);
});

// ===================== BEFORE EACH SCENARIO =====================

beforeEach(function () {
  const test = this.currentTest!;
  const featureName = test.parent?.title || 'Unknown feature';
  const scenarioName = test.title || 'Unknown scenario';

  startScenario(featureName, scenarioName);
});

// ===================== AFTER EACH SCENARIO =====================

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

  const messages: string[] = [];

  if (test.err) {
    messages.push(test.err.message);
    if (test.err.stack) messages.push(test.err.stack);
  }

  reportStep(`Scenario "${scenarioName}" executed`, status, {
    messages,
  });

  finalizeScenario();
});





