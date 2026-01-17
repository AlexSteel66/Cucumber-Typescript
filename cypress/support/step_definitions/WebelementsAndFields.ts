
import { fi } from "@faker-js/faker";
import 'cypress-iframe';
import 'cypress-wait-until';
import ProductPage from "../pages/ProductPage";
import {Given, When, Then, } from "@badeball/cypress-cucumber-preprocessor";
import { ElementAttributes } from "../ElementAttributes";
import { Helpers } from '../Helpers';
import { reportStep } from '../reports/hierarchicalReport';

const helpers = new Helpers();
const page = new ProductPage();

Then('I click on the predefined webelement {string}', (webelement: string) => {
  cy.xpath(webelement)
    .click({ force: true })
    .then(() => reportStep(`I click on the predefined webelement ${webelement}`, 'PASSED'));
});

Then('I see the webelement {string}', (webelementText: string) => {
  page.getWebelementByText(webelementText)
    .scrollIntoView()
    .should('exist')
    .then(() => reportStep(`I see the webelement ${webelementText}`, 'PASSED'));
});

Then('I see the span webelement {string}', (webelementText: string) => {
  page.getSpanWebelementFromText(webelementText)
    .scrollIntoView()
    .should('exist')
    .then(() => reportStep(`I see the span webelement ${webelementText}`, 'PASSED'));
});

Then('I click onto webelement {string}', (webelementText: string) => {
  return iClickOntoWebelement(webelementText)
    .then(() => reportStep(`I click onto webelement ${webelementText}`, 'PASSED'));
});


Then('I click onto {string} occurrence of webelement {string}', (position: string, webelementText: string) => {
  page.getWebelementFromTextInOrder(webelementText, position)
    .scrollIntoView()
    .should('exist')
    .then(($el) => {
      cy.wrap($el[0]).click({ force: true });
    })
    .then(() =>
      reportStep(`I click onto ${position} occurrence of webelement ${webelementText}`, 'PASSED')
    );
});

Then('I click onto span webelement {string}', (webelementText: string) => {
  page.getSpanWebelementFromText(webelementText)
    .click()
    .then(() => reportStep(`I click onto span webelement ${webelementText}`, 'PASSED'));
});

Then(
  'I verify that the text next to the webelement {string} is {string}',
  (webelement: string, expectedText: string) => {
    cy.xpath(webelement)
      .invoke('text')
      .should('equal', expectedText)
      .then(() =>
        reportStep(
          `I verify that the text next to the webelement ${webelement} is ${expectedText}`,
          'PASSED'
        )
      );
  }
);

Then('I see the field {string}', (fieldName: string) => {
  page.getField(fieldName)
    .scrollIntoView()
    .should('exist')
    .should('be.visible')
    .then(() => reportStep(`I see the field ${fieldName}`, 'PASSED'));
});

Then('I see the text area {string}', (fieldName: string) => {
  page.getTextArea(fieldName)
    .scrollIntoView()
    .should('exist')
    .should('be.visible')
    .then(() => reportStep(`I see the text area ${fieldName}`, 'PASSED'));
});

Then('I type {string} into the text area {string}', (value: string, textAreaName: string) => {
  const textAreaInput = page.getTextArea(textAreaName);
  textAreaInput.clear({ force: true });
  if (value.trim() !== '') {
    textAreaInput.type(value, { force: true });
  }
  cy.get('body')
    .click(0, 0, { force: true })
    .then(() =>
      reportStep(`I type "${value}" into the text area ${textAreaName}`, 'PASSED')
    );
});

Then('I see the field {string} based on index {int}', (fieldName: string, index: number) => {
  page.getTheFieldInputBasedOnIndex(fieldName, index)
    .scrollIntoView()
    .should('exist')
    .should('be.visible')
    .then(() =>
      reportStep(`I see the field ${fieldName} based on index ${index}`, 'PASSED')
    );
});

Then('I see the following fields', (dataTable: any) => {
  const fieldNames = dataTable.raw().flat();
  fieldNames.forEach((fieldName) => {
    page.getField(fieldName)
      .scrollIntoView()
      .should('exist')
      .should('be.visible');
  });
  reportStep('I see the following fields', 'PASSED');
});

Then('I do not see the following fields', (dataTable: any) => {
  const fieldNames = dataTable.raw().flat();
  fieldNames.forEach((fieldName) => {
    page.getField(fieldName).should('not.exist');
  });
  reportStep('I do not see the following fields', 'PASSED');
});

Then('I do not see the field {string} based on index {int}', (fieldName: string, index: number) => {
  page.getTheFieldInputBasedOnIndex(fieldName, index)
    .should('not.be.visible')
    .then(() =>
      reportStep(`I do not see the field ${fieldName} based on index ${index}`, 'PASSED')
    );
});

Then('I should not see the field {string}', (fieldName: string) => {
  page.getField(fieldName)
    .scrollIntoView()
    .should('exist')
    .should('not.be.visible')
    .then(() => reportStep(`I should not see the field ${fieldName}`, 'PASSED'));
});

Then('field {string} has value {string}', (fieldName: string, value: string) => {
  cy.getValueOfField(fieldName)
    .should('eq', value)
    .then(() => reportStep(`field ${fieldName} has value ${value}`, 'PASSED'));
});

Then('text area {string} has value {string}', (textAreaName: string, value: string) => {
  cy.getValueOfTextArea(textAreaName)
    .should('eq', value)
    .then(() => reportStep(`text area ${textAreaName} has value ${value}`, 'PASSED'));
});

Then(
  'the field {string} with index {int} has value {string}',
  (fieldName: string, index: number, value: string) => {
    cy.getValueOfFieldDependingOnItsIndex(fieldName, index)
      .should('eq', value)
      .then(() =>
        reportStep(
          `the field ${fieldName} with index ${index} has value ${value}`,
          'PASSED'
        )
      );
  }
);

Then('the value of the field {string} has text {string}', (fieldName: string, value: string) => {
  cy.getText(page.getSelectorOfFieldInput(fieldName))
    .should('eq', value)
    .then(() =>
      reportStep(`the value of the field ${fieldName} has text ${value}`, 'PASSED')
    );
});

Then('I click onto the field {string}', (fieldName: string) => {
  page.getWebelementOfFieldInput(fieldName)
    .click()
    .then(() => reportStep(`I click onto the field ${fieldName}`, 'PASSED'));
});

Then(
  'I type {string} into the field {string}',
  (value: string, fieldName: string) => {
    page.getWebelementOfFieldInput(fieldName)
      .should('exist')
      .should('be.visible')
      .then(($input) => {
        cy.wrap($input).clear({ force: true });
        if (value.trim() !== '') {
          cy.wrap($input).type(value, { force: true });
        }
        cy.wrap($input).focus().blur();
      })
      .then(() =>
        reportStep(`I type "${value}" into the field ${fieldName}`, 'PASSED')
      );
  }
);

Then(
  'I type {string} into the field {string} with index {int}',
  (value: string, fieldName: string, index: number) => {
    page.getTheFieldInputBasedOnIndex(fieldName, index)
      .clear({ force: true })
      .type(value)
      .then(() =>
        reportStep(
          `I type "${value}" into the field ${fieldName} with index ${index}`,
          'PASSED'
        )
      );
  }
);

Then(
  'I type {string} into the predefined field {string}',
  (text: string, element: string) => {
    cy.xpath(element)
      .should('exist')
      .should('be.visible')
      .clear()
      .type(text)
      .then(() =>
        reportStep(`I type "${text}" into the predefined field ${element}`, 'PASSED')
      );
  }
);

Then('I see the PDF webelement {string}', (webelementText: string) => {
  helpers.iSeeText(webelementText, `I see the PDF webelement ${webelementText}`)
    .should('have.attr', 'class', 'pdf')
    .should('have.attr', 'href')
    .then(() => reportStep(`I see the PDF webelement ${webelementText}`, 'PASSED'));
});

Then('I do not see the PDF webelement {string}', (webelementText: string) => {
  helpers.iDontSeeText(webelementText)
    .then(() => reportStep(`I do not see the PDF webelement ${webelementText}`, 'PASSED'));
});

Then('I see another PDF webelement {string}', (webelementText: string) => {
  helpers.iSeeText(webelementText, `I see another PDF webelement ${webelementText}`)
    .should('have.attr', 'target', ElementAttributes.TARGET_ATTRIBUTEVALUE)
    .should('have.attr', 'href')
    .then(() =>
      reportStep(`I see another PDF webelement ${webelementText}`, 'PASSED')
    );
});

Then(
  'I see the validation message {string} underneath the field {string}',
  function (validationMessage: string, fieldName: string) {
    cy.getText(this.getSelectorOfValidationMessageOfField(fieldName))
      .should('eq', validationMessage)
      .then(() =>
        reportStep(
          `I see the validation message ${validationMessage} underneath the field ${fieldName}`,
          'PASSED'
        )
      );
  }
);


Then('I see validation message {string}', (validationMessage: string) => {
  cy.get('body').click(0, 0); 
  cy.wait(200);
  helpers.iSeeText(validationMessage, `I see validation message ${validationMessage}`)
});


Then('I do not see validation message {string}', (validationMessage: string) => {
  helpers.iDontSeeText(validationMessage)
    .then(() =>
      reportStep(`I do not see validation message ${validationMessage}`, 'PASSED')
    );
});




function iClickOntoWebelement(webelementText: string) {
  cy.waitForPageLoaded();
  return page.getWebelementByText(webelementText)
    .scrollIntoView()
    .should('exist')
    .then(($el: JQuery<HTMLElement>) => {
      if ($el.length > 0) {
        cy.wrap($el).click();
      } else {
        throw new Error(`Element with the text "${webelementText}" was not found.`);
      }
    });
}
