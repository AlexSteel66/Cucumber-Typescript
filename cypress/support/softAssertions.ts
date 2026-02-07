import { reportStep, currentScenario } from './reports/hierarchicalReport';

export interface SoftAssertion {
  step: string;
  message: string;
  screenshot?: string;
}

export const softAssertions: SoftAssertion[] = [];

const toSafeName = (value: string) =>
  value.replace(/[^a-zA-Z0-9]/g, '_');

export const addSoftAssertion = (step: string, message: string) => {
  softAssertions.push({ step, message });

  const feature = currentScenario?.feature || 'Unknown feature';
  const scenario = currentScenario?.scenario || 'Unknown scenario';

  const safeFeature = toSafeName(feature);
  const safeScenario = toSafeName(scenario);
  const safeStep = toSafeName(step);
  const timestamp = Date.now();

  const screenshotRelativePath =
    `cypress/screenshots/${safeFeature}/${safeScenario}/soft-failed/${safeStep}-${timestamp}.png`;

  const screenshotCypressPath =
    `${safeFeature}/${safeScenario}/soft-failed/${safeStep}-${timestamp}`;

  cy.screenshot(screenshotCypressPath, { capture: 'runner' }).then(() => {
    reportStep(step, 'SOFT_FAILED', {
      screenshot: screenshotRelativePath,
    });
  });
};
