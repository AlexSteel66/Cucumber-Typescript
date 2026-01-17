/// <reference types="cypress" />
/// <reference types="cypress-xpath" /> 

import 'cypress-iframe';
import {reportStep, currentScenario, StepStatus, startScenario } from './reports/hierarchicalReport';

import ProductPage from './pages/ProductPage';
const productPage = new ProductPage()

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

Cypress.Commands.add('waitForPageLoaded', () => {
  cy.window().then((win) => {
    return new Cypress.Promise<void>((resolve) => {
      if (win.document.readyState === 'complete') {
        resolve();
      } else {
        win.addEventListener('load', () => resolve()); 
      }
    });
  });
});

Cypress.Commands.add('convertTextToHref', (text: string) => {
  const hrefText = text
    .toLowerCase()              // Convert to lowercase
    .normalize("NFD")           // Normalize special characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/\s+/g, '-')       // Replace spaces with hyphen
    .replace(/[^\w\-]+/g, '');  // Remove non-alphanumeric characters
  return cy.wrap(hrefText);
});

Cypress.Commands.add('iClickAway', () => {
  cy.get('body').click({force: true}); 
});

Cypress.Commands.add('visitMainWebsite', (): void => {
  const baseUrl = Cypress.config('baseUrl');
  cy.visit(baseUrl);
});

Cypress.Commands.add('visitBusinessMax', (): void => {
  const baseUrl = Cypress.config('baseUrl');
  const businessMaxPath = Cypress.env('businessMaxPath');
  const fullUrl = `${baseUrl}${businessMaxPath}`;
  cy.visit(fullUrl);
});

Cypress.Commands.add('getText', (selector: string) => {
  return cy.xpath(selector).invoke('text').then((text) => text.trim());
});

Cypress.Commands.add("chooseHeader", (headerName: string) => {
  var article = '//article//header//a'
  cy.xpath(article).each(($el, index, $list) => {
    if ($el.text().includes(headerName)) {
      cy.xpath(article).eq(index).invoke('show').click()
    }

  })
})

Cypress.Commands.add('getValueOfField', (fieldName: string) => {
  return productPage.getWebelementOfFieldInput(fieldName)
    .invoke('val')
    .then((value) => value?.toString() || '');;
})

Cypress.Commands.add('getValueOfTextArea', (textAreaName: string) => {
  return productPage.getTextArea(textAreaName)
    .invoke('val')
    .then((value) => value?.toString() || '');;
})

Cypress.Commands.add('getValueOfFieldDependingOnItsIndex', (fieldName: string, index: number) => {
  return productPage.getTheFieldInputBasedOnIndex(fieldName, index)
    .invoke('val')
    .then((value) => value?.toString() || '');
})


Cypress.Commands.add("verifyVisibilityOfElementUponMouseOver", (elementName: string, classNameOfVisibleElement: string) => {
  productPage.getWebelementByText(elementName).eq(0).trigger('mouseover')
  cy.get(classNameOfVisibleElement).should('be.visible')
})