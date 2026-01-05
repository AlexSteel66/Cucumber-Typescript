import {
  startScenario,
  finalizeScenario,
  reportStep,
  testReport,
  StepStatus,
} from './reports/hierarchicalReport';

// ------------------ BEFORE SUITE ------------------
before(() => {
  console.log('===== Test suite starting =====');
  testReport.startTime = new Date().toISOString();
});

// ------------------ AFTER SUITE ------------------
after(() => {
  console.log('===== Test suite finished =====');

  testReport.endTime = new Date().toISOString();
  testReport.duration =
    new Date(testReport.endTime).getTime() - new Date(testReport.startTime!).getTime();

  // Zapis kompletného reportu cez Cypress task
  cy.task('saveReport', testReport).then(() => {
    console.log('✅ Final hierarchical report saved.');
    console.log(`📊 Total scenarios: ${testReport.scenarios.length}`);
  });
});

// ------------------ AFTER EACH TEST ------------------
afterEach(function () {
  const test = this.currentTest!;
  const runnable = test.parent!;

  const featureName = runnable.title || 'Unknown feature';
  const scenarioName = test.title || 'Unknown scenario';

  // Zaisti, že scenár existuje
  startScenario(featureName, scenarioName);

  // Určenie statusu
  const status: StepStatus = test.state === 'failed'
    ? 'FAILED'
    : test.pending
    ? 'SKIPPED'
    : 'PASSED';

  const stepMessages: string[] = [];
  if (test.err) {
    stepMessages.push(test.err.message, test.err.stack);
  }

  // Pridanie kroku pre samotný test/scenár
  reportStep(`Scenario "${scenarioName}" executed`, status, {
    messages: stepMessages,
    feature: featureName,
    scenario: scenarioName,
  });

  // Ak test zlyhal, len pridáme cestu screenshotu, **bez čítania súboru**
  if (status === 'FAILED' && Cypress.spec.name) {
    const screenshotName = `${scenarioName.replace(/\s+/g, '_')}-${Date.now()}.png`;
    const screenshotPath = `cypress/screenshots/${Cypress.spec.name}/${screenshotName}`;

    reportStep('Screenshot attached', 'FAILED', {
      screenshot: screenshotPath,
      feature: featureName,
      scenario: scenarioName,
    });

    console.log(`📸 Screenshot path recorded: ${screenshotPath}`);
  }

  // Dokončenie scenára vždy
  finalizeScenario();
});