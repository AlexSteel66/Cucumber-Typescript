
import { fi } from "@faker-js/faker";
import 'cypress-iframe';
import 'cypress-wait-until';
import ProductPage from "../pages/ProductPage";
import {Given, When, Then, } from "@badeball/cypress-cucumber-preprocessor";
import { ElementAttributes } from "../ElementAttributes";
import { Helpers } from '../Helpers';

const helpers = new Helpers();
const page = new ProductPage();

Then('I click on the predefined webelement {string}', function iClickOnPredefinedWebelement(webelement: string) {
  cy.xpath(webelement).click({ force: true });
});

Then('I see the webelement {string}', function ISeeWebelement(webelementText: string) {
  page.getWebelementByText(webelementText)
    .scrollIntoView()
    .should('exist');
});

Then('I see the span webelement {string}', function iSeeSpanWebelement(webelementText: string) {
  page.getSpanWebelementFromText(webelementText)
    .scrollIntoView()
    .should('exist');
});

Then('I click onto webelement {string}', function (webelementText: string) {
  return iClickOntoWebelement(webelementText);
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


Then('I click onto {string} occurrence of webelement {string}', function (position: string, webelementText: string) {
  page.getWebelementFromTextInOrder(webelementText, position)
    .scrollIntoView()
    .should('exist')
    .then(($el) => {
      cy.wrap($el[0]).click({ force: true });
    });
});


Then('I click onto span webelement {string}', function (webelementText: string) {
  page.getSpanWebelementFromText(webelementText).click();
});


Then('I verify that the text next to the webelement {string} is {string}', function (webelement: string, expectedText: string) {
  cy.xpath(webelement).invoke('text').should('equal', expectedText);
});

Then('I see the field {string}', function (fieldName: string) {
  page.getField(fieldName)
    .scrollIntoView()
    .should('exist')
    .should('be.visible');
});

Then('I see the text area {string}', function (fieldName: string) {
  page.getTextArea(fieldName)
    .scrollIntoView()
    .should('exist')
    .should('be.visible');
});


Then('I type {string} into the text area {string}', function (value: string, textAreaName: string) {
  const textAreaInput = page.getTextArea(textAreaName);
  textAreaInput.clear({ force: true });
  if (value.trim() !== '') {
    textAreaInput.type(value, { force: true });
  }
  cy.get('body').click(0, 0, { force: true });
});


Then('I see the field {string} based on index {int}', function (fieldName: string, index: number) {
  page.getTheFieldInputBasedOnIndex(fieldName, index)
    .scrollIntoView()
    .should('exist')
    .should('be.visible');
});


Then('I see the following fields', function (dataTable: any) {
  const fieldNames = dataTable.raw().flat();
  fieldNames.forEach((fieldName) => {
    page.getField(fieldName)
      .scrollIntoView()
      .should('exist')
      .should('be.visible');
    cy.log(`I see the field: "${fieldName}"`);

  });
});


Then('I do not see the following fields', function (dataTable: any) {
  const fieldNames = dataTable.raw().flat();
  fieldNames.forEach((fieldName) => {
    page.getField(fieldName)
      .should('not.exist')
    cy.log(`I do not see the field: "${fieldName}"`);

  });
});

Then('I do not see the field {string} based on index {int}', function (fieldName: string, index: number) {
  page.getTheFieldInputBasedOnIndex(fieldName, index)
    .should('not.be.visible');
});


Then('I should not see the field {string}', function (fieldName: string) {
  page.getField(fieldName)
    .scrollIntoView()
    .should('exist')
    .should('not.be.visible');
});


Then('field {string} has value {string}', function (fieldName: string, value: string) {
  cy.getValueOfField(fieldName).should('eq', value);
});

Then('text area {string} has value {string}', function (textAreaName: string, value: string) {
  cy.getValueOfTextArea(textAreaName).should('eq', value);
});

Then('the field {string} with index {int} has value {string}', function (fieldName: string, index: number, value: string) {
  cy.getValueOfFieldDependingOnItsIndex(fieldName, index).should('eq', value);
});

Then('the value of the field {string} has text {string}', function (fieldName: string, value: string) {
  cy.getText(page.getSelectorOfFieldInput(fieldName)).should('eq', value);
});


Then('I click onto the field {string}', function (fieldName: string) {
  page.getWebelementOfFieldInput(fieldName).as('fieldInput')
    .click();
});


Then('I type {string} into the field {string}', function (value: string, fieldName: string) {
  page.getWebelementOfFieldInput(fieldName)
    .should('exist')
    .should('be.visible')
    .then(($input) => {
      cy.wrap($input).clear({ force: true });

      if (value.trim() !== '') {
        cy.wrap($input).type(value, { force: true });
      }

      cy.wrap($input)
        .focus()
        .blur()
    });
});

Then('I type {string} into the field {string} with index {int}', function (value: string, fieldName: string, index: number) {
  page.getTheFieldInputBasedOnIndex(fieldName, index).as('fieldInput')
    .clear({ force: true })
    .type(value);
});


Then('I type {string} into the predefined field {string}', function (text: string, element: string) {
  const field = cy.xpath(element)
    .should('exist')
    .should('be.visible');
  field.clear();
  field.type(text);
  cy.log(`Text: ${text} was typed into the given field.`);
});

Then('I see the PDF webelement {string}', function (webelementText: string) {
  helpers.iSeeText(webelementText)
    .should('have.attr', 'class', 'pdf')
    .should('have.attr', 'href');
});


Then('I do not see the PDF webelement {string}', function (webelementText: string) {
  this.iDontSeeText(webelementText);
});
Then('I see another PDF webelement {string}', function (webelementText: string) {
  helpers.iSeeText(webelementText)
    .should('have.attr', 'target', ElementAttributes.TARGET_ATTRIBUTEVALUE)
    .should('have.attr', 'href');
}); 

Then('I see the validation message {string} underneath the field {string}', function (validationMessage: string, fieldName: string) {
  cy.getText(this.getSelectorOfValidationMessageOfField(fieldName))
    .should('eq', validationMessage);
});


Then('I see validation message {string}', function (validationMessage: string) {
  helpers.iSeeText(validationMessage);
});

Then('I do not see validation message {string}', function (validationMessage: string) {
  helpers.iDontSeeText(validationMessage);
});
