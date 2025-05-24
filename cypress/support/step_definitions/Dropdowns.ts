import 'cypress-iframe';
import 'cypress-wait-until';
import ProductPage from "../pages/ProductPage";
import {Given, When, Then, } from "@badeball/cypress-cucumber-preprocessor";

const page = new ProductPage();

Then('dropdown {string} has the options', function (dropdownName: string, expectedOptions: string[]) {
  const dropdownSelector = page.getSelectorOfDropdown(dropdownName);
  const actualOptions: string[] = [];
  this.dropdownSelector
    .find('option')
    .each(function ($el) {
      cy.wrap($el).invoke('text').then(function (text) {
        actualOptions.push(text.trim());
      });
    })
    .then(function () {
      expect(actualOptions).to.deep.equal(expectedOptions);
    });
});


Then('dropdown {string} does not contain the options', function (dropdownName: string, unexpectedOptions: string[]) {
  const dropdownSelector = page.getSelectorOfDropdown(dropdownName);
  const actualOptions: string[] = [];

  this.dropdownSelector
    .find('option')
    .each(function ($el) {
      cy.wrap($el).invoke('text').then(function (text) {
        actualOptions.push(text.trim());
      });
    })
    .then(function () {
      const foundUnexpectedOptions = actualOptions.filter(function (option) {
        return unexpectedOptions.includes(option);
      });
      expect(foundUnexpectedOptions).to.be.empty;
    });
});


Then('I select the option {string} from the dropdown {string}', function (option: string, dropdownName: string) {
  const dropdownSelector = page.getSelectorOfDropdown(dropdownName);
  this.dropdownSelector
    .should('be.visible')
    .select(option);
});


Then('the dropdown {string} has the value {string}', function (dropdownName: string, expectedValue: string) {
  const dropdownSelector = page.getSelectorOfDropdown(dropdownName);
  this.dropdownSelector
    .should('be.visible')
    .invoke('val')
    .should('equal', expectedValue);
});

Then('I see the dropdown button {string}', (buttonName: string) => {
  const button = page.getWebelementOfDropdownButton(buttonName);
  button.should('exist');
  button.scrollIntoView();
  button.should('be.visible');
});


Then('I click into the dropdown button {string}', (buttonName: string) => {
  const button = page.getWebelementOfDropdownButton(buttonName);
  button.should('exist');
  button.scrollIntoView();
  button.click();
});