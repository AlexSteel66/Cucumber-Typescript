import { fi } from "@faker-js/faker";
import 'cypress-iframe';
import 'cypress-wait-until';
import ProductPage from "../pages/ProductPage";
import {Given, When, Then, } from "@badeball/cypress-cucumber-preprocessor";

const page = new ProductPage();

Given("I visit the main website", function () {
  cy.visitMainWebsite();
  cy.waitForPageLoaded();
});


Given("I visit business-max product", function () {
  cy.visitBusinessMax();
  cy.waitForPageLoaded();
});

Then('I wait for {int} milliseconds', function (milliseconds: number) {
  cy.wait(milliseconds);
});


Then('I see message {string}', function (message: string) {
  iSeeText(message);
});

Then('I see message {string}', function (message: string) {
  cy.waitUntil(() => 
    cy.get('body').contains(message).should('be.visible')
  );
  cy.log(`The message '${message}' is visible on the page.`);
});

Then('I don´t see message {string}', function (message: string) {
  iDontSeeText(message);
});


Then('I see the text {string}', function (webelementText: string) {
  return iSeeText(webelementText);
});


Then('I see these texts', function (dataTable: any) {
  const texts: string[] = dataTable.rawTable.map((row: string[]) => row[0]);
  texts.forEach((text) => {
    cy.waitUntil(() =>
      cy.contains(text).should('exist'),
      { timeout: 3000, interval: 500 }
    ).then(() => {
      cy.log(`Text "${text}" is visible on the page.`);
    });
  });
});


Then('I click away', function () {
  cy.iClickAway();
});


Then('I see the text {string} based on index {string}', function (webelementText: string, index: string) {
  return page.getWebelementFromTextInOrder(webelementText, index)
    .scrollIntoView()
    .should('exist')
    .should('be.visible');
});


Then('I do not see the text {string} based on index {string}', function (webelementText: string, index: string) {
  return page.getWebelementFromTextInOrder(webelementText, index)
    .scrollIntoView()
    .should('not.be.visible');
});


Then('I see the text {string} for {int} times', function (webelementText: string, times: number) {
  return page.getListOfWebelementsOfTextForTimes(webelementText)
    .should('have.length', times);
});


Then('I do not see the text {string}', (webelementText: string) => {
  iDontSeeText(webelementText)
});

Then('I don´t see these texts', function (dataTable: any) {
  dataTable.hashes().forEach((row) => {
    Object.values(row).forEach((text: string) => {
      cy.contains(text).should('not.exist');  
    });
  });
});


Then('I scroll to the text {string}', function (text: string) {
  cy.contains(text)              
    .scrollIntoView()              
    .should('be.visible');         
});

Then('I see article {string}', (articleName: string) => {
  cy.waitUntil(() =>
    page.getWebelementOfArticle(articleName)
      .should('exist')  
      .scrollIntoView()  
      .should(($el) => {
        expect($el.length).to.be.greaterThan(0);  
        expect(Cypress.dom.isVisible($el)).to.be.true; 
      })
  , {
    timeout: 12000,  
    interval: 1000,  
    errorMsg: `Article with name '${articleName}' was not found or is not visible.`  
  })
  .then(() => {
    cy.log('Article with name ' + articleName + ' is visible now.');  
  });
});


Then('I see articles', (DataTable: any) => { 
  DataTable.hashes().forEach((row) => {
    Object.values(row).forEach((articleName: string) => {
      cy.waitUntil(() => 
        page.getWebelementOfArticle(articleName)
          .should('exist')  
          .scrollIntoView() 
          .should(($el) => {
            expect($el.length).to.be.greaterThan(0);  
            expect(Cypress.dom.isVisible($el)).to.be.true;  
          })
      , {
        timeout: 5000,  
        interval: 500,  
        errorMsg: `Article with name '${articleName}' was not found or is not visible.`  
      })
      .then(() => {
        cy.log('Article with name ' + articleName + ' is visible now.');  
      });
    });
  });
});


Then('I click onto the article {string}', (articleName: string) => {
  cy.waitUntil(() =>
    page.getWebelementOfArticle(articleName)
      .should('exist')  
      .scrollIntoView() 
  , {
    timeout: 8000,  
    interval: 700,  
    errorMsg: `Article with name '${articleName}' was not found or is not visible.`  
  })
  .click()  
  .then(() => {
    cy.log('Article with name ' + articleName + ' was clicked successfully.'); 
  });
});


Then('I see subarticle {string} underneath article {string}', (subArticle: string, article: string) => {
  page.getWebelementOfSubArticle(article, subArticle)
    .should('exist')
    .scrollIntoView()
    .should('be.visible');
});


Then('I hover over article {string}', (articleName: string) => {
  page.getWebelementOfArticle(articleName)
    .should('exist')
    .scrollIntoView()
    .should('be.visible');
});


When('I click onto next slide', () => {
  cy.waitUntil(() => page.getNextSlide().should('exist'), {
    timeout: 5000,
    interval: 500,
    errorMsg: 'Next slide button is not visible or not present.'
  })
  .click()  
  .then(() => {
    cy.log('Clicked onto next slide successfully.');
  });
});

When('I click onto previous slide', () => {
  cy.waitUntil(() => page.getPreviousSlide().should('exist'), {
    timeout: 5000,
    interval: 500,
    errorMsg: 'Next slide button is not visible or not present.'
  })
  .click()  
  .then(() => {
    cy.log('Clicked onto next slide successfully.');
  });
});

When('I close this dialog', () => {
  cy.waitUntil(() =>
    page.getCloseDialog()
      .should('exist') 
    , {
    timeout: 5000, 
    interval: 500,  
    errorMsg: 'Close dialog button is not visible or not present.'  
  })
  .click()  
  .then(() => {
    cy.log('Dialog was closed successfully.');
  });
});

function iSeeText(webelementText: string) {
  return cy.waitUntil(() =>
    page.getWebelementFromText(webelementText)
      .scrollIntoView()
      .should('exist')
      .should('be.visible'),
    { timeout: 10000, interval: 500 }
  ).then(() => {
    cy.log(`The element with text '${webelementText}' is visible on the page.`);
    return cy.wrap(true);
  });
}

function iDontSeeText(webelementText: string) {
  return page.getWebelementFromText(webelementText)
    .should('not.exist');
}