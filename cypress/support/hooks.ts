let browserName: string;
let browserVersion: string;
let osName: string;
let osVersion: string;
let cypressVersion: string;
let startedTestsAt: string;
let endedTestsAt: string;

const browserNameKey: string = "browserName";
const browserVersionKey: string = "browserVersion";
const osNameKey: string = "osName";
const osVersionKey: string = "osVersion";
const cypressVersionKey: string = "cypressVersion";
const startedTestsAtKey: string = "startedTestsAt";
const endedTestsAtKey: string = "endedTestsAt";

let runtimeResultsKeys: string[] = [];
let runtimeResultsValues: string[] = [];
const runtimeResultsMap = new Map<string, string>();


before(function () {
    browserName = Cypress.browser.name;
    browserVersion = Cypress.browser.version;
    osName = navigator.platform;
    osVersion = navigator.appVersion;
    cypressVersion = Cypress.version;
    startedTestsAt = new Date().toISOString();

    cy.log(`Browser: ${browserName} v${browserVersion}`);
    cy.log(`OS: ${osName} ${osVersion}`);
    cy.log(`Cypress Version: ${cypressVersion}`);
    cy.log(`Started Tests At: ${startedTestsAt}`);
});


afterEach(function () {
    const test = this.currentTest as Mocha.Test;
    if (test.state === 'failed') {
        const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
        const screenshotName = `${test.title}-${timestamp}`;
        const screenshotPath = `cypress/reports/screenshots/${screenshotName}.png`;

        cy.screenshot(screenshotName)
            .then(() => {
                const errorMessage = test.err?.message || 'No error message';
                const stackTrace = test.err?.stack || 'No stack trace available';
                Cypress.env('lastScreenshot', screenshotPath);
                cy.writeFile('cypress/reports/lastScreenshot.json', { screenshotPath })
            });
    }
});



after(function () {
    endedTestsAt = new Date().toISOString()
    console.log('AfterAll hook is running');
    osVersion = formatOsVersion(osVersion);

    runtimeResultsValues.push(browserName, browserVersion, osName, osVersion, cypressVersion, startedTestsAt, endedTestsAt)
    runtimeResultsKeys.push(browserNameKey, browserVersionKey, osNameKey, osVersionKey, cypressVersionKey, startedTestsAtKey, endedTestsAtKey)

    runtimeResultsKeys.forEach((key, index) => {
        const value = runtimeResultsValues[index];
        runtimeResultsMap.set(key, value);
    });

    cy.log("Runtime Results Map:");
    runtimeResultsMap.forEach((value, key) => {
        cy.log(`${key}: ${value}`);
    });

    const reportPath = './cypress/results/results.json';
    writeMapToJsonFile(reportPath, runtimeResultsMap);
}

);

function writeMapToJsonFile(reportPath: string, runtimeResultsMap: Map<string, string>): void {
    const runtimeResultsObject: Record<string, string> = Object.fromEntries(runtimeResultsMap);
    cy.writeFile(reportPath, JSON.stringify(runtimeResultsObject, null, 2));
    cy.log(`Runtime results successfully written to: ${reportPath}`);
}

function formatOsVersion(osVersion: string): string {
    const pattern = /\(Windows NT 10\.0; Win64; x64\)/;
    if (pattern.test(osVersion)) {
        return "Windows NT 10.0; Win64; x64";
    }
    return osVersion;
}