import dayjs from 'dayjs'; 
import * as report from 'multiple-cucumber-html-reporter';
import * as fs from 'fs';

interface RunInfo {
  osName: string;
  browserName: string;
  browserVersion: string;
  osVersion: string;
  cypressVersion: string;
  startedTestsAt: string;
  endedTestsAt: string;
  // nodeVersion: string;

}

const data = fs.readFileSync('cypress/results/results.json', {
  encoding: 'utf8',
  flag: 'r',
});
const runInfo: RunInfo = JSON.parse(data);

const osName = (): string | undefined => {
  switch (runInfo.osName) {
    case 'Darwin': return 'osx';
    case 'Win32': return 'windows';
    case 'Ubuntu': return 'ubuntu';
    default: console.log('Undefined platform'); return undefined;
  }
};

report.generate({
  jsonDir: 'cypress/reports/json/',
  reportPath: 'cypress/reports/html/', // Adjusted path to match the desired output directory
  metadata: {
    browser: { name: runInfo.browserName, version: runInfo.browserVersion },
    device: 'Local Test Machine',
    platform: { name: osName(), version: runInfo.osVersion },
  },
  customData: {
    title: 'Run Info',
    data: [
      { label: 'Project', value: 'Project Name' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Cypress Version', value: runInfo.cypressVersion },
      // { label: 'Node Version', value: runInfo.nodeVersion },
      { label: 'Execution Start Time', value: dayjs(runInfo.startedTestsAt).format('YYYY-MM-DD HH:mm:ss.SSS') },
      { label: 'Execution End Time', value: dayjs(runInfo.endedTestsAt).format('YYYY-MM-DD HH:mm:ss.SSS') },
    ],
  },
  disableLog: false,
  showErrorStack: true,
  pageTitle: 'Automation Execution Report',
  openReportInBrowser: true,
  displayDuration: true,
  screenshotsDirectory: 'cypress/reports/screenshots',
});