import fs from 'fs';
import path from 'path';
import { formatDuration } from './TimeUtils';

export class ExecutionFinalizer {
  static executionStartTime?: string;
  static executionEndTime?: string;
  static executionDuration?: string;

  static finalizeExecution(reportPath: string = 'cypress/reports/hierarchicalReport.json') {
    if (!fs.existsSync(reportPath)) {
      console.warn(`Report file not found: ${reportPath}`);
      return;
    }

    const raw = fs.readFileSync(reportPath, 'utf-8');
    const report = JSON.parse(raw);

    if (!report.scenarios || !report.scenarios.length) return;

    // zoberieme všetky testStartTime a testEndTime zo všetkých scenárov
    const allStartTimes = report.scenarios
      .map((s: any) => s.testStartTime)
      .filter(Boolean)
      .sort();

    const allEndTimes = report.scenarios
      .map((s: any) => s.testEndTime)
      .filter(Boolean)
      .sort();

    if (!allStartTimes.length) return;

    // Start je stále prvý test
    this.executionStartTime = allStartTimes[0];

    // End je posledný test, alebo aktuálny čas ak exekúcia bola prerušena
    this.executionEndTime = allEndTimes.length
      ? allEndTimes[allEndTimes.length - 1]
      : new Date().toISOString();

    // Trvanie medzi start a end
    this.executionDuration = formatDuration(this.executionStartTime, this.executionEndTime);

    console.log('=== Global Execution Summary ===');
    console.log(`Start: ${this.executionStartTime}`);
    console.log(`End:   ${this.executionEndTime}`);
    console.log(`Duration: ${this.executionDuration}`);

    // zapíš späť do JSON reportu
    report.executionStartTime = this.executionStartTime;
    report.executionEndTime = this.executionEndTime;
    report.executionDuration = this.executionDuration;
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  }
}
