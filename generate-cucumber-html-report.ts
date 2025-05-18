import dayjs from 'dayjs';
import * as report from 'multiple-cucumber-html-reporter';
import * as fs from 'fs';
import * as path from 'path';

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

const screenshotsDirectory = path.resolve('cypress/screenshots');

report.generate({
  jsonDir: 'cypress/reports/json/',
  reportPath: 'cypress/reports/html/',
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
  screenshotsDirectory, // Nastavenie screenshotov s absolútnymi cestami
  screenshotPath: screenshotsDirectory, // Cesta k screenshotom v HTML
  screenshotPattern: '**/*.png', // Pattern pre všetky screenshoty (môžeš prispôsobiť podľa potreby)
});