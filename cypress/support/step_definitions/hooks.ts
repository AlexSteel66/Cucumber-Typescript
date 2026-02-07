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

// ======================================================
// UTILS
// ======================================================

const toSafeName = (value: string) =>
  value.replace(/[^a-zA-Z0-9]/g, '_');

// ======================================================
// STEP CONTEXT – START TIME
// ======================================================

BeforeStep(function ({ pickleStep }) {
  setCurrentStep(pickleStep.text);

  // pridanie casovania krokov
  (pickleStep as any).startTime = new Date().toISOString();
  (pickleStep as any).startPerf = performance.now();
});

// ======================================================
// STEP CONTEXT – END TIME
// ======================================================

AfterStep(function () {
  clearCurrentStep();
});

// ======================================================
// GLOBAL FAIL HANDLER (EXCEPT STEP FAILURE)
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

  const testStatus: StepStatus =
    test.state === 'failed'
      ? 'FAILED'
      : test.pending
      ? 'SKIPPED'
      : 'PASSED';

  if (currentScenario) {
    const steps = currentScenario.steps;

    for (let i = 0; i < steps.length; i++) {
      const currentStep = steps[i];
      const nextStep = steps[i + 1];

      const startMs = (currentStep as any).startPerf ?? performance.now();
      const endMs = nextStep
        ? (nextStep as any).startPerf ?? performance.now()
        : performance.now();

      currentStep.duration = formatDuration(startMs, endMs);

      currentStep.startTime =
        (currentStep as any).startTime ?? new Date().toISOString();
      currentStep.endTime = new Date().toISOString();
    }

    currentScenario.testEndTime = new Date().toISOString();
    currentScenario.testDuration = formatDuration(
      currentScenario.testStartTime!,
      currentScenario.testEndTime
    );

    // uloženie testStatus na koniec scenára
    currentScenario.testStatus = testStatus;
  }

  // SCREENSHOT NA POSLEDNÝ FAILNUTÝ KROK
  const finalize = () => {
    cy.task('appendScenarioToReport', currentScenario);
    finalizeScenario();
  };

  if (testStatus === 'FAILED' && currentScenario) {
    const failedStep = [...currentScenario.steps]
      .reverse()
      .find(step => step.status === 'FAILED');

    if (failedStep) {
      const safeFeature = toSafeName(feature);
      const safeScenario = toSafeName(scenario);
      const safeStep = toSafeName(failedStep.step);
      const timestamp = Date.now();

      const screenshotCypressPath =
        `${safeFeature}/${safeScenario}/failed/${safeStep}-${timestamp}`;

      return cy
        .screenshot(screenshotCypressPath, { capture: 'runner' })
        .then(() => {
          failedStep.screenshot = `cypress/screenshots/${screenshotCypressPath}.png`;
          finalize();
        });
    }
  }

  finalize(); // pre PASSED alebo SKIPPED, alebo ak failnutý krok screenshot sa nespustil
});

// ======================================================
// AFTER ALL TESTS
// ======================================================

after(() => {
  cy.task('finalizeReport');
});
