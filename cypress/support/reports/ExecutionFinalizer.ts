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

    // zobereme všetky testStartTime a testEndTime zo všetkých scenárov
    const allStartTimes = report.scenarios
      .map((s: any) => s.testStartTime)
      .filter(Boolean)
      .sort();
    const allEndTimes = report.scenarios
      .map((s: any) => s.testEndTime)
      .filter(Boolean)
      .sort();

    if (!allStartTimes.length || !allEndTimes.length) return;

    this.executionStartTime = allStartTimes[0];
    this.executionEndTime = allEndTimes[allEndTimes.length - 1];
    this.executionDuration = formatDuration(this.executionStartTime, this.executionEndTime);

    console.log('=== Global Execution Summary ===');
    console.log(`Start: ${this.executionStartTime}`);
    console.log(`End:   ${this.executionEndTime}`);
    console.log(`Duration: ${this.executionDuration}`);

    // voliteľne: zapíš späť do JSON reportu
    report.executionStartTime = this.executionStartTime;
    report.executionEndTime = this.executionEndTime;
    report.executionDuration = this.executionDuration;
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  }
}
