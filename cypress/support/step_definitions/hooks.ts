import {
  startScenario,
  ensureScenario,
  finalizeScenario,
  reportStep,
  normalizeStepsTimeline,
  StepStatus,
  currentScenario,
  currentStepName,
} from '../reports/hierarchicalReport';

import { formatDuration } from '../reports/TimeUtils';
import { BeforeStep, AfterStep } from '@badeball/cypress-cucumber-preprocessor';

// ======================================================
// UTILS
// ======================================================

const toSafeName = (value: string) =>
  value.replace(/[^a-zA-Z0-9]/g, '_');

// ======================================================
// STEP START
// ======================================================

BeforeStep(function ({ pickleStep }) {
  // jednotný zdroj pravdy – timestamp v ms
  (pickleStep as any).__startTime = Date.now();
});

// ======================================================
// STEP END
// ======================================================

AfterStep(function ({ pickleStep }) {
  const rawStartTime = (pickleStep as any).__startTime ?? Date.now();
  const rawEndTime = Date.now();

  // reportStep stále používa interné raw časy, aby normalizeStepsTimeline fungovalo presne
  reportStep(pickleStep.text, 'PASSED', {
    rawStartTime,
    rawEndTime,
  });
});

// ======================================================
// GLOBAL FAIL
// ======================================================

Cypress.on('fail', function (error) {
  if (currentScenario && currentScenario.steps.length > 0) {
    // najbližší neuzavretý krok (bez rawEndTime)
    const lastOpenStep = [...currentScenario.steps]
      .reverse()
      .find(step => step.rawEndTime === undefined);

    if (lastOpenStep) {
      lastOpenStep.status = 'FAILED';
      lastOpenStep.rawEndTime = Date.now();
    } else {
      // ak žiadny neexistuje, pridáme krok ako fallback
      reportStep('Unknown step', 'FAILED', {
        rawEndTime: Date.now(),
      });
    }
  }

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
    currentScenario.testEndTime = new Date().toISOString();
    currentScenario.testDuration = formatDuration(
      currentScenario.testStartTime!,
      currentScenario.testEndTime
    );
    currentScenario.testStatus = testStatus;

    // 🔥 POST-PROCESSING ČASOVEJ OSI KROKOV
    normalizeStepsTimeline(currentScenario);

    // odstránime interné polia pred zápisom do JSON
    currentScenario.steps.forEach(step => {
      delete (step as any).rawStartTime;
      delete (step as any).rawEndTime;
      delete (step as any).__startTime;
      delete (step as any).__endTime;
    });
  }

  const finalize = () => {
    cy.task('appendScenarioToReport', currentScenario);
    finalizeScenario();
  };

  if (testStatus === 'FAILED' && currentScenario) {
    const failedStep = [...currentScenario.steps]
      .reverse()
      .find(s => s.status === 'FAILED');

    if (failedStep) {
      const screenshotPath =
        `${toSafeName(feature)}/${toSafeName(scenario)}/failed/${toSafeName(failedStep.step)}-${Date.now()}`;

      return cy.screenshot(screenshotPath).then(() => {
        failedStep.screenshot = `cypress/screenshots/${screenshotPath}.png`;
        finalize();
      });
    }
  }

  finalize();
});

// ======================================================
// AFTER ALL
// ======================================================

after(() => {
  cy.task('finalizeReport');
});
