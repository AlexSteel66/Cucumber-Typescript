// hierarchicalReport.ts

// ===================== TYPES =====================

export type StepStatus = 'PASSED' | 'FAILED' | 'SOFT_FAILED' | 'SKIPPED';

export interface Step {
  step: string;
  status: StepStatus;
  startTime?: string;      // ISO string for report
  endTime?: string;        // ISO string for report
  duration?: string;       // formatted as m:ss
  screenshot?: string;

  // interné, na presné meranie
  rawStartTime?: number;   // timestamp in ms
  rawEndTime?: number;     // timestamp in ms
}

export interface Scenario {
  feature: string;
  scenario: string;
  steps: Step[];

  testStartTime?: string;
  testEndTime?: string;
  testDuration?: string; // m:ss
  testStatus?: StepStatus;
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
  currentScenario = null;
}

// ===================== STEP MANAGEMENT =====================

export function reportStep(
  stepName: string,
  status: StepStatus,
  opts?: {
    screenshot?: string;
    startTime?: string;
    endTime?: string;
    rawStartTime?: number;
    rawEndTime?: number;
  }
) {
  if (!currentScenario) return;

  const step: Step = {
    step: stepName,
    status,
    startTime: opts?.startTime,
    endTime: opts?.endTime,
    rawStartTime: opts?.rawStartTime,
    rawEndTime: opts?.rawEndTime,
    duration: undefined,
    screenshot: opts?.screenshot,
  };

  currentScenario.steps.push(step);
}

// ===================== TIME UTILITIES =====================

function formatDurationMs(ms: number): string {
  const totalSeconds = Math.max(1, Math.round(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function formatDuration(startTime: string, endTime: string): string {
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  return formatDurationMs(end - start);
}

// ===================== NORMALIZE STEPS TIMELINE =====================

export function normalizeStepsTimeline(scenario: Scenario) {
  if (!scenario.steps || scenario.steps.length === 0) return;

  // 1️⃣ doplnenie rawEndTime a rawStartTime, ak chýba
  for (let i = 0; i < scenario.steps.length; i++) {
    const step = scenario.steps[i];

    if (!step.rawStartTime) {
      step.rawStartTime = i === 0
        ? new Date(scenario.testStartTime!).getTime()
        : scenario.steps[i - 1].rawEndTime;
    }

    if (!step.rawEndTime) {
      step.rawEndTime = step.rawStartTime! + 1000; // aspoň 1s ak neexistuje
    }
  }

  // 2️⃣ zoradenie podľa rawStartTime
  scenario.steps.sort((a, b) => (a.rawStartTime! - b.rawStartTime!));

  // 3️⃣ vypočítanie duration a prevod na ISO string
  for (let i = 0; i < scenario.steps.length; i++) {
    const step = scenario.steps[i];
    const startMs = step.rawStartTime!;
    const endMs = step.rawEndTime!;

    // duration ako číslo
    const durationSec = Math.max(1, Math.round((endMs - startMs) / 1000));

    // uloženie čísla do objektu
    step.duration = durationSec as any;

    step.startTime = new Date(startMs).toISOString();
    step.endTime = new Date(endMs).toISOString();
  }
}

// ===================== EXPORT DO JSON =====================

// keď zapisuješ report do súboru, formátuj duration s " s"
export function scenarioToJSON(scenario: Scenario) {
  return {
    ...scenario,
    steps: scenario.steps.map(step => ({
      ...step,
      duration: step.duration !== undefined ? `${step.duration} s` : undefined
    })),
  };
}