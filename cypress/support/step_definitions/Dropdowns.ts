import 'cypress-iframe';
import 'cypress-wait-until';
import ProductPage from "../pages/ProductPage";
import {Given, When, Then, } from "@badeball/cypress-cucumber-preprocessor";
import { reportStep } from '../reports/hierarchicalReport';


const page = new ProductPage();

Then('dropdown {string} has the options', function (dropdownName: string, expectedOptions: string[]) {
  const dropdownSelector = page.getSelectorOfDropdown(dropdownName);
  const actualOptions: string[] = [];

  this.dropdownSelector
    .find('option')
    .each(($el) => {
      cy.wrap($el).invoke('text').then((text) => {
        actualOptions.push(text.trim());
      });
    })
    .then(() => {
      expect(actualOptions).to.deep.equal(expectedOptions);
      reportStep(`Dropdown "${dropdownName}" has expected options`, 'PASSED');
    });
});

Then('dropdown {string} does not contain the options', function (dropdownName: string, unexpectedOptions: string[]) {
  const dropdownSelector = page.getSelectorOfDropdown(dropdownName);
  const actualOptions: string[] = [];

  this.dropdownSelector
    .find('option')
    .each(($el) => {
      cy.wrap($el).invoke('text').then((text) => {
        actualOptions.push(text.trim());
      });
    })
    .then(() => {
      const foundUnexpectedOptions = actualOptions.filter(option =>
        unexpectedOptions.includes(option)
      );
      expect(foundUnexpectedOptions).to.be.empty;
      reportStep(`Dropdown "${dropdownName}" does not contain unexpected options`, 'PASSED');
    });
});

Then('I select the option {string} from the dropdown {string}', function (option: string, dropdownName: string) {
  const dropdownSelector = page.getSelectorOfDropdown(dropdownName);

  this.dropdownSelector
    .should('be.visible')
    .select(option)
    .then(() => {
      reportStep(`I select option "${option}" from dropdown "${dropdownName}"`, 'PASSED');
    });
});

Then('the dropdown {string} has the value {string}', function (dropdownName: string, expectedValue: string) {
  const dropdownSelector = page.getSelectorOfDropdown(dropdownName);

  this.dropdownSelector
    .should('be.visible')
    .invoke('val')
    .should('equal', expectedValue)
    .then(() => {
      reportStep(`Dropdown "${dropdownName}" has value "${expectedValue}"`, 'PASSED');
    });
});

Then('I see the dropdown button {string}', function (buttonName: string) {
  const button = page.getWebelementOfDropdownButton(buttonName);

  button.should('exist');
  button.scrollIntoView();
  button.should('be.visible')
    .then(() => {
      reportStep(`I see the dropdown button "${buttonName}"`, 'PASSED');
    });
});

Then('I click into the dropdown button {string}', function (buttonName: string) {
  const button = page.getWebelementOfDropdownButton(buttonName);

  button.should('exist');
  button.scrollIntoView();
  button.click()
    .then(() => {
      reportStep(`I click into the dropdown button "${buttonName}"`, 'PASSED');
    });
});