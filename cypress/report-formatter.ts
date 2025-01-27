import { Formatter } from 'cucumber-json-report-formatter';

async function generateCucumberReport(): Promise<void> {
  const formatter: Formatter = new Formatter();
  const sourceFile: string = './cypress/reports/messages/cucumber-messages.ndjson';
  const outputFile: string = './cypress/reports/cucumber-report.json';

  try {
    await formatter.parseCucumberJson(sourceFile, outputFile);
    console.log('Cucumber report generated successfully.');
  } catch (error) {
    console.error('Error generating cucumber report:', error);
  }
}

generateCucumberReport();



