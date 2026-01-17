import { reportStep } from './reports/hierarchicalReport';

export interface SoftAssertion {
  step: string;
  message: string;
}

export const softAssertions: SoftAssertion[] = [];

export const addSoftAssertion = (step: string, message: string) => {
  softAssertions.push({ step, message });

  reportStep(step, 'SOFT_FAILED', {
    messages: [message],
  });
};