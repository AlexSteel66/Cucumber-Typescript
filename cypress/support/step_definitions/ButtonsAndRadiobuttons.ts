import { fi } from "@faker-js/faker";
import 'cypress-iframe';
import 'cypress-wait-until';
import ProductPage from "../pages/ProductPage";
import {Given, When, Then, } from "@badeball/cypress-cucumber-preprocessor";
import { ElementAttributes } from "../ElementAttributes";

const page = new ProductPage();

Then('I see the rectangle radio button {string} for {int} times', function (webelementText: string, times: number) {
    return page.getListOfRectangleRadioButtonsForTimes(webelementText)
      .should('have.length', times);
  });


  Then('I see the simple radiobutton {string}', (buttonName: string) => {
    const radiobutton = page.getSimpleRadioButton(buttonName);
    radiobutton.should('exist');
    radiobutton.scrollIntoView();
    radiobutton.should('be.visible');
  });
  
  
  Then('I select the simple radiobutton {string}', (radiobuttonName: string) => {
    const radiobutton = page.getSimpleRadioButton(radiobuttonName);
    radiobutton.click();
  });
  
  
  Then('I see the simple radio button {string} is selected', (radioButton: string, state: boolean) => {
    page.getSimpleRadioButton(radioButton).then(($radioButton) => {
      if (state) {
        cy.wrap($radioButton).should('have.attr', 'class', 'icon icon--radio-true');
      } else {
        cy.wrap($radioButton).should('have.attr', 'class', 'icon icon--radio-false');
      }
    });
  });
  
  
  Then('I see the radio button {string}', (radioButtonName: string) => {
    page.getRadioButtonWebelement(radioButtonName)
      .should('exist')
      .should('be.visible')
  });
  
  
  Then('I do not see the radio button {string}', (radioButtonName: string) => {
    page.getRadioButtonWebelement(radioButtonName)
      .should('not.exist')
  });
  
  
  Then('I see the rectangle radio button {string} in order {int} is selected', (radioButtonName: string, position: number, state: boolean) => {
    page.getRectangleRadioButtonInPosition(radioButtonName, position).then(($radioButton) => {
      if (state) {
        cy.wrap($radioButton).should('have.attr', 'class', ElementAttributes.SELECTED);
      } else {
        cy.wrap($radioButton).should('not.have.attr', 'class', ElementAttributes.SELECTED);
      }
    });
  });


  Then('I do not see the rectangle radio button {string} in order {int}', (radioButtonName: string, position: number) => {
    page.getRectangleRadioButtonInPosition(radioButtonName, position)
      .should('not.be.visible');
  });
  
  
  Then('I select the rectangle radio button {string} in order {int}', (radioButtonName: string, position: number) => {
    page.getRectangleRadioButtonInPosition(radioButtonName, position).click();
  });
  
  
  Then('I select the radiobutton {string}', (radioButtonName: string) => {
    page.getRadioButtonWebelement(radioButtonName).click()
  });
  
  
  Then('I see the radiobutton {string} is checked', (radioButtonName: string) => {
    page.getRadioButtonWebelement(radioButtonName)
      .should('exist')
      .should('be.visible')
      .better('have.attr', ElementAttributes.CHECKED);
  });
  
  
  Then('I see the radiobutton {string} is unchecked', (radioButtonName: string) => {
    page.getRadioButtonWebelement(radioButtonName)
      .should('exist')
      .should('be.visible')
      .should('not.have.attr', ElementAttributes.CHECKED);
  });
  

Then('I click onto the button {string}', function (buttonName: string) {
  if (buttonName === 'Odmietnuť všetky' || buttonName === 'Žiadosti') {
    cy.wait(1000);
  }

  cy.waitUntil(() =>
    page.getButton(buttonName)
      .should('exist')
  , {
    timeout: 5000,
    interval: 500
  }).then(() => {
    page.getButton(buttonName)
      .scrollIntoView()
      .then(($el) => {
        if ($el.length > 0 && Cypress.dom.isVisible($el)) {
          if (!$el.is(':disabled')) {
            cy.wrap($el).click({ force: true });
          } else {
            cy.log(`Button "${buttonName}" is visible but disabled. No action taken.`);
          }
        } else {
          cy.log(`Button "${buttonName}" not visible or not found. Skipping click.`);
        }
      });
  });
});



// Then('I click onto the button {string}', function (buttonName: string) {
//   if (buttonName === 'Odmietnuť všetky') {
//     cy.wait(2000);
//   }

//   page.getButton(buttonName).then(($el) => {
    
//     if ($el.length > 0 && Cypress.dom.isVisible($el)) {
//       if (!$el.is(':disabled')) {
//         cy.wrap($el).scrollIntoView().click({ force: true });
//       } else {
//         cy.log(`Button "${buttonName}" is visible but disabled. No action taken.`);
//       }
//     } else {
//       cy.log(`Button "${buttonName}" not visible or not found. Skipping click.`);
//     }
//   });
// });


  // Then('I click onto the button {string}', function (buttonName: string) {
  //   if (buttonName === 'Odmietnuť všetky') {
  //         cy.wait(2000);
  //   }
  //   cy.waitUntil(() =>
  //     page.getButton(buttonName)
  //       .should('exist')  
  //       .scrollIntoView()  
  //       .should(($el) => {
  //         expect($el.length).to.be.greaterThan(0);  
  //         expect(Cypress.dom.isVisible($el)).to.be.true; 
  //       })
  //   , {
  //     timeout: 7000,  
  //     interval: 500,  
  //     errorMsg: `Button "${buttonName}" was not found or not visible.`  
  //   })
  //   .then(function ($el) {
  //     if ($el.is(':enabled')) {
  //       cy.wrap($el).click({ force: true }); 
  //     } else {
  //       throw new Error(`Button "${buttonName}" is disabled and cannot be clicked.`);
  //     }
  //   });
  // });
  
  
  Then('I see the button {string}', (buttonName: string) => {
    const button = page.getButton(buttonName);
    button.should('exist');
    button.scrollIntoView();
    button.should('be.visible');
  });
  
  Then('I click onto button in cookie dialog {string}', (buttonName: string) => {
    cy.wait(3000);
    cy.get('body').click();
  });