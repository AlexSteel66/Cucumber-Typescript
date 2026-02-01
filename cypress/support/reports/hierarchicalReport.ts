import { formatDuration } from '../reports/TimeUtils';

// ===================== TYPES =====================

export type StepStatus = 'PASSED' | 'FAILED' | 'SOFT_FAILED' | 'SKIPPED';

export interface Step {
  step: string;
  status: StepStatus;
  screenshot?: string;
  messages?: string[];
}

export interface Scenario {
  feature: string;
  scenario: string;
  steps: Step[];

  testStartTime?: string;
  testEndTime?: string;
  testDuration?: string; // m:ss
}

export interface TestReport {
  nodeVersion: string;
  os: string;
  scenarios: Scenario[];

  scenarioStartTime?: string;
  scenarioEndTime?: string;
  scenarioDuration?: string; // mm:ss
}

// ===================== REPORT ROOT =====================

export const testReport: TestReport = {
  nodeVersion: typeof process !== 'undefined' ? process.version : 'unknown',
  os: typeof process !== 'undefined' ? process.platform : 'unknown',
  scenarios: [],
};

// ===================== CURRENT CONTEXT =====================

export let currentScenario: Scenario | null = null;
export let currentStepName = '';

// ===================== STEP CONTEXT =====================

export function setCurrentStep(stepName: string) {
  currentStepName = stepName;
}

export function clearCurrentStep() {
  currentStepName = '';
}

// ===================== SCENARIO MANAGEMENT =====================

export function startScenario(feature: string, scenario: string) {
  currentScenario = {
    feature,
    scenario,
    steps: [],
    testStartTime: new Date().toISOString(),
  };

  testReport.scenarios.push(currentScenario);
}

export function ensureScenario(feature: string, scenario: string) {
  if (!currentScenario) {
    startScenario(feature, scenario);
  }
}

export function finalizeScenario() {
  if (currentScenario?.testStartTime) {
    currentScenario.testEndTime = new Date().toISOString();
    currentScenario.testDuration = formatDuration(
      currentScenario.testStartTime,
      currentScenario.testEndTime
    );
  }

  currentScenario = null;
}

// ===================== STEP MANAGEMENT =====================

export function reportStep(
  step: string,
  status: StepStatus,
  opts?: {
    screenshot?: string;
    messages?: string[];
    feature?: string;
    scenario?: string;
  }
) {
  if (!currentScenario) {
    if (opts?.feature && opts?.scenario) {
      ensureScenario(opts.feature, opts.scenario);
    } else {
      console.warn(`⚠️ Tried to report step without a currentScenario: "${step}"`);
      return;
    }
  }

  currentScenario!.steps.push({
    step,
    status,
    screenshot: opts?.screenshot,
    messages: opts?.messages,
  });
}



