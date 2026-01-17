import 'cypress-iframe';
import 'cypress-wait-until';
import ProductPage from "../pages/ProductPage";
import {Given, When, Then, } from "@badeball/cypress-cucumber-preprocessor";
import { ElementAttributes } from "../ElementAttributes";
import { Helpers } from '../Helpers';
import { reportStep } from '../reports/hierarchicalReport';


const helpers = new Helpers();
const page = new ProductPage();

Then('I see the rectangle radio button {string} for {int} times',
  function (webelementText: string, times: number) {
    return page
      .getListOfRectangleRadioButtonsForTimes(webelementText)
      .should('have.length', times)
      .then(() => {
        reportStep(
          `I see the rectangle radio button "${webelementText}" for ${times} times`,
          'PASSED'
        );
      });
  }
);


  Then('I see the simple radiobutton {string}', (buttonName: string) => {
    const radiobutton = page.getSimpleRadioButton(buttonName);
    radiobutton.should('exist');
    radiobutton.scrollIntoView();
    radiobutton.should('be.visible');
    reportStep(`I see the simple radiobutton ${buttonName}`, 'PASSED');

  });
  
  
Then('I select the simple radiobutton {string}', (radiobuttonName: string) => {
  const radiobutton = page.getSimpleRadioButton(radiobuttonName);
  radiobutton.click();

  reportStep(`I select the simple radiobutton "${radiobuttonName}"`, 'PASSED');
});


Then('I see the simple radio button {string} is selected', (radioButton: string, state: boolean) => {
  page.getSimpleRadioButton(radioButton).then(($radioButton) => {
    if (state) {
      cy.wrap($radioButton)
        .should('have.attr', 'class', ElementAttributes.RADIOBUTTON_CLASS_ATTRIBUTE_TRUE);
    } else {
      cy.wrap($radioButton)
        .should('have.attr', 'class', ElementAttributes.RADIOBUTTON_CLASS_ATTRIBUTE_FALSE);
    }
  });

  reportStep(`I see the simple radio button "${radioButton}" is selected = ${state}`, 'PASSED');
});


Then('I see the radio button {string}', (radioButtonName: string) => {
  page.getRadioButtonWebelement(radioButtonName)
    .should('exist')
    .should('be.visible');

  reportStep(`I see the radio button "${radioButtonName}"`, 'PASSED');
});


Then('I do not see the radio button {string}', (radioButtonName: string) => {
  page.getRadioButtonWebelement(radioButtonName)
    .should('not.exist');

  reportStep(`I do not see the radio button "${radioButtonName}"`, 'PASSED');
});


Then(
  'I see the rectangle radio button {string} in order {int} is selected',
  (radioButtonName: string, position: number, state: boolean) => {
    page.getRectangleRadioButtonInPosition(radioButtonName, position).then(($radioButton) => {
      if (state) {
        cy.wrap($radioButton)
          .should('have.attr', 'class', ElementAttributes.SELECTED);
      } else {
        cy.wrap($radioButton)
          .should('not.have.attr', 'class', ElementAttributes.SELECTED);
      }
    });

    reportStep(
      `I see the rectangle radio button "${radioButtonName}" in order ${position} is selected = ${state}`,
      'PASSED'
    );
  }
);


Then(
  'I do not see the rectangle radio button {string} in order {int}',
  (radioButtonName: string, position: number) => {
    page.getRectangleRadioButtonInPosition(radioButtonName, position)
      .should('not.be.visible');

    reportStep(
      `I do not see the rectangle radio button "${radioButtonName}" in order ${position}`,
      'PASSED'
    );
  }
);


Then(
  'I select the rectangle radio button {string} in order {int}',
  (radioButtonName: string, position: number) => {
    page.getRectangleRadioButtonInPosition(radioButtonName, position).click();

    reportStep(
      `I select the rectangle radio button "${radioButtonName}" in order ${position}`,
      'PASSED'
    );
  }
);


Then('I select the radiobutton {string}', (radioButtonName: string) => {
  page.getRadioButtonWebelement(radioButtonName).click();

  reportStep(`I select the radiobutton "${radioButtonName}"`, 'PASSED');
});


Then('I see the radiobutton {string} is checked', (radioButtonName: string) => {
  page.getRadioButtonWebelement(radioButtonName)
    .should('exist')
    .should('be.visible')
    .should('have.attr', ElementAttributes.CHECKED);

  reportStep(`I see the radiobutton "${radioButtonName}" is checked`, 'PASSED');
});


Then('I see the radiobutton {string} is unchecked', (radioButtonName: string) => {
  page.getRadioButtonWebelement(radioButtonName)
    .should('exist')
    .should('be.visible')
    .should('not.have.attr', ElementAttributes.CHECKED);

  reportStep(`I see the radiobutton "${radioButtonName}" is unchecked`, 'PASSED');
});


Then('I click onto the button {string}', function (buttonName: string) {
  if (['Odmietnuť všetky', 'Žiadosti'].includes(buttonName)) {
    cy.wait(1300);
  }

  cy.waitUntil(helpers.waitForButtonToExist(buttonName), {
    timeout: 5000,
    interval: 500
  }).then(() => {
    helpers.clickButtonIfVisibleAndEnabled(buttonName);
  });

  reportStep(`I click onto the button "${buttonName}"`, 'PASSED');
});


Then('I see the button {string}', (buttonName: string) => {
  const button = page.getButton(buttonName);
  button.should('exist');
  button.scrollIntoView();
  button.should('be.visible');

  reportStep(`I see the button "${buttonName}"`, 'PASSED');
});


Then('I click onto button in cookie dialog {string}', (buttonName: string) => {
  cy.wait(3000);
  cy.get('body').click();

  reportStep(`I click onto button in cookie dialog "${buttonName}"`, 'PASSED');
});