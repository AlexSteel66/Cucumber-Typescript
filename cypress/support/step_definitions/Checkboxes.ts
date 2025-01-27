import { fi } from "@faker-js/faker";
import 'cypress-iframe';
import 'cypress-wait-until';
import ProductPage from "../pages/ProductPage";
import {Given, When, Then, } from "@badeball/cypress-cucumber-preprocessor";

const page = new ProductPage();

Then('I see checkbox {string}', (checkbox: string) => {
  page.getWebelementOfCheckbox(checkbox)
    .should('exist')
    .should('be.visible');
});


Then('I select checkbox {string}', (checkbox: string) => {
  page.getWebelementOfCheckbox(checkbox)
    .click();
});



//Ordinary checkboxes
Then('I see the checkbox {string}', (checkbox: string) => {
  page.getWebelementOfTheCheckbox(checkbox)
    .should('exist')
    .should('be.visible');
});


Then('I don´t see the checkbox {string}', (checkbox: string) => {
  page.getWebelementOfTheCheckbox(checkbox)
    .should('not.exist');
});

Then('I see following checkboxes in states', (dataTable: any) => {
  const rows = dataTable.hashes();
  rows.forEach(({ checkbox, state }) => {
    page.getWebelementOfTheCheckbox(checkbox)
      .should('exist')
      .should('be.visible')
      .then(($checkbox) => {
        cy.wrap($checkbox)
          .xpath('./ancestor::label')
          .then(($label) => {
            cy.log(`Checkbox: ${checkbox}, Expected State: ${state}`);

            if (state === 'checked') {
              cy.wrap($label).should('have.attr', 'data-checked', 'true');
            } else if (state === 'unchecked') {
              cy.wrap($label).should('not.have.attr', 'data-checked');
            } else {
              throw new Error(`Neznámy stav checkboxu: ${state}`);
            }
          });
      });
  });
});


Then('I select the checkbox {string}', (checkbox: string) => {
  page.getWebelementOfTheCheckbox(checkbox)
    .click();
});


Then('I deselect the checkbox {string}', (checkbox: string) => {
  page.getWebelementOfTheCheckbox(checkbox)
    .click();
});
