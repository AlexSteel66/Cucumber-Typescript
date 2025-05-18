import { fi } from "@faker-js/faker";
import 'cypress-iframe';
import 'cypress-wait-until';
import ProductPage from "../pages/ProductPage";
import {Given, When, Then, } from "@badeball/cypress-cucumber-preprocessor";
import "cypress-soft-assertions";
import { ElementAttributes } from "../ElementAttributes";


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
      .xpath('./ancestor::label')
      .then(($label) => {
        cy.log(`Checkbox: ${checkbox}, Expected State: ${state}`);

        if (state === ElementAttributes.CHECKED) {
          cy.wrap($label)
            .should('have.attr', ElementAttributes.DATACHECKED)
            .and('eq', 'true'); 
        } else if (state === ElementAttributes.UNCHECKED) {
          cy.wrap($label)
            .should('not.have.attr', ElementAttributes.DATACHECKED); 
        } else {
          throw new Error(`Uknown state of the checkbox: ${state}`);
        }
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
