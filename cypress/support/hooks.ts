import { TestReport, ReportScenario, ReportStep, StepStatus } from './reports/hierarchicalReport';
import fs from 'fs';
import path from 'path';

const testReport: TestReport = { scenarios: [] };
let currentScenario: ReportScenario;

// ------------------ BEFORE SUITE ------------------
before(() => {
  console.log('===== Test suite starting =====');
});

// ------------------ BEFORE EACH SCENARIO ------------------
beforeEach(function () {
  const test = this.currentTest!;
  currentScenario = {
    feature: test.titlePath?.[0] || 'Unknown feature',
    name: test.title || 'Unknown scenario',
    status: 'PASSED',
    steps: [],
    startTime: new Date().toISOString(),
  };

  // Príklad: beforeEach krok
  currentScenario.steps.push({
    text: 'beforeEach hook: initializing scenario',
    status: 'PASSED',
    timestamp: new Date().toISOString(),
  });
});

// ------------------ AFTER EACH SCENARIO ------------------
afterEach(function () {
  const test = this.currentTest!;
  const step: ReportStep = {
    text: 'afterEach hook: scenario finished',
    status: 'PASSED', // prednastavené, prepíšeme nižšie
    timestamp: new Date().toISOString(),
  };

  // ------------------ Spracovanie statusu ------------------
  if (test.state === 'failed') {
    step.status = 'FAILED';
  } else if (test.pending) {
    step.status = 'SKIPPED';
  } else if (currentScenario.steps.some(s => s.status === 'SOFT_FAILED')) {
    // Ak už predtým existoval soft fail krok, scenár bude soft failed
    step.status = 'SOFT_FAILED';
  } else {
    step.status = 'PASSED';
  }

  // ------------------ Screenshot pri zlyhaní ------------------
  if (step.status === 'FAILED') {
    const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
    const screenshotName = `${test.title}-${timestamp}`;
    const screenshotPath = `cypress/reports/screenshots/${screenshotName}.png`;
    step.screenshot = screenshotPath;

    // Cypress screenshot musí byť spustený cez cy.then() pre bezpečné ukladanie
    cy.screenshot(screenshotName, { capture: 'runner' }).then(() => {
      currentScenario.steps.push(step);

      // Po pridaní kroku vyhodnotíme status scenára
      finalizeScenarioStatus();
    });
  } else {
    // Ak nie je failed, rovno pridáme krok
    currentScenario.steps.push(step);
    finalizeScenarioStatus();
  }

  // ------------------ Funkcia na vyhodnotenie statusu scenára ------------------
  function finalizeScenarioStatus() {
    if (currentScenario.steps.some(s => s.status === 'FAILED')) {
      currentScenario.status = 'FAILED';
    } else if (currentScenario.steps.some(s => s.status === 'SOFT_FAILED')) {
      currentScenario.status = 'SOFT_FAILED';
    } else if (currentScenario.steps.every(s => s.status === 'SKIPPED')) {
      currentScenario.status = 'SKIPPED';
    } else {
      currentScenario.status = 'PASSED';
    }

    currentScenario.endTime = new Date().toISOString();
    currentScenario.duration =
      new Date(currentScenario.endTime).getTime() - new Date(currentScenario.startTime!).getTime();

    // Pridanie scenára do hlavného reportu
    if (!currentScenario.steps.some(s => s.status === 'FAILED' && !s.screenshot)) {
      testReport.scenarios.push(currentScenario);
    }
  }
});

// ------------------ AFTER SUITE ------------------
after(() => {
  console.log('===== Test suite finished =====');

  // Celkový čas test suite
  testReport.startTime = testReport.scenarios[0]?.startTime;
  testReport.endTime = new Date().toISOString();
  testReport.duration =
    new Date(testReport.endTime).getTime() - new Date(testReport.startTime!).getTime();

  // Environment info
  testReport.nodeVersion = process.version;
  testReport.os = navigator.platform;
  (testReport as any).cypressVersion = Cypress.version; // voliteľné pole

  // Zapis JSON reportu
  const reportPath = path.resolve('cypress/reports/hierarchicalReport.json');
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(testReport, null, 2));
  console.log(`Hierarchical report written to: ${reportPath}`);
});