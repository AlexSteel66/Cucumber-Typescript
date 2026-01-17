import 'cypress-iframe';
import 'cypress-wait-until';
import ProductPage from "../pages/ProductPage";
import {Given, When, Then, } from "@badeball/cypress-cucumber-preprocessor";
import { ElementAttributes } from "../ElementAttributes";
import { reportStep } from '../reports/hierarchicalReport';



const page = new ProductPage();

Then('I see checkbox {string}', (checkbox: string) => {
  page.getWebelementOfCheckbox(checkbox)
    .should('exist')
    .should('be.visible')
    .then(() => {
      reportStep(`I see checkbox "${checkbox}"`, 'PASSED');
    });
});


Then('I select checkbox {string}', (checkbox: string) => {
  page.getWebelementOfCheckbox(checkbox)
    .click()
    .then(() => {
      reportStep(`I select checkbox "${checkbox}"`, 'PASSED');
    });
});


Then('I see the checkbox {string}', (checkbox: string) => {
  page.getWebelementOfTheCheckbox(checkbox)
    .should('exist')
    .should('be.visible')
    .then(() => {
      reportStep(`I see the checkbox "${checkbox}"`, 'PASSED');
    });
});


Then('I don´t see the checkbox {string}', (checkbox: string) => {
  page.getWebelementOfTheCheckbox(checkbox)
    .should('not.exist')
    .then(() => {
      reportStep(`I don´t see the checkbox "${checkbox}"`, 'PASSED');
    });
});


Then('I see following checkboxes in states', (dataTable: any) => {
  const rows = dataTable.hashes();

  rows.forEach(({ checkbox, state }) => {
    cy.log(`Checkbox: ${checkbox}, Expected State: ${state}`);

    page.getWebelementOfTheCheckbox(checkbox)
      .should('exist')
      .should('be.visible')
      .xpath('./ancestor::label')
      .then(($label) => {
        const wrappedLabel = cy.wrap($label);

        switch (state) {
          case ElementAttributes.CHECKED:
            wrappedLabel
              .should('have.attr', ElementAttributes.DATACHECKED)
              .and('eq', 'true');
            break;

          case ElementAttributes.UNCHECKED:
            wrappedLabel
              .should('not.have.attr', ElementAttributes.DATACHECKED);
            break;

          default:
            throw new Error(`Unknown state of the checkbox: ${state}`);
        }
      });
  });

  cy.then(() => {
    reportStep(
      'I see following checkboxes in expected states',
      'PASSED'
    );
  });
});


Then('I select the checkbox {string}', (checkbox: string) => {
  page.getWebelementOfTheCheckbox(checkbox)
    .click()
    .then(() => {
      reportStep(`I select the checkbox "${checkbox}"`, 'PASSED');
    });
});


Then('I deselect the checkbox {string}', (checkbox: string) => {
  page.getWebelementOfTheCheckbox(checkbox)
    .click().then(() => {
      reportStep(`I select the checkbox "${checkbox}"`, 'PASSED');
    });
});
