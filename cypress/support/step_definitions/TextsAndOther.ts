import { fi } from "@faker-js/faker";
import 'cypress-iframe';
import 'cypress-wait-until';
import { addSoftAssertion } from '../softAssertions';
import ProductPage from "../pages/ProductPage";
import {Given, When, Then, } from "@badeball/cypress-cucumber-preprocessor";
import { reportStep } from '../reports/hierarchicalReport';

const page = new ProductPage();

Given('I visit the main website', () => {
  cy.visitMainWebsite();
  cy.waitForPageLoaded();
  reportStep('I visit the main website', 'PASSED');
});

Given('I visit business-max product', () => {
  cy.visitBusinessMax();
  cy.waitForPageLoaded();
  reportStep('I visit business-max product', 'PASSED');
});

Then('I wait for {int} milliseconds', (milliseconds: number) => {
  cy.wait(milliseconds);
  reportStep(`I wait for ${milliseconds} milliseconds`, 'PASSED');
});

Then('I see message {string}', (message: string) => {
  iSeeText(message, `I see message '${message}'`)
    .then(() => reportStep(`I see message ${message}`, 'PASSED'));
});

Then('I don´t see message {string}', (message: string) => {
  iDontSeeText(message)
    .then(() => reportStep(`I don’t see message ${message}`, 'PASSED'));
});

Then('I see the text {string}', (webelementText: string) => {
  return iSeeText(webelementText, `I see the text '${webelementText}'`)
    .then(() => reportStep(`I see the text ${webelementText}`, 'PASSED'));
});

Then('I see these texts', (dataTable: any) => {
  const texts: string[] = dataTable.rawTable.map((row: string[]) => row[0]);

  texts.forEach((text) => {
    cy.waitUntil(() => cy.contains(text).should('exist'), {
      timeout: 3000,
      interval: 500
    });
  });

  reportStep('I see these texts', 'PASSED');
});

Then('I click away', () => {
  cy.iClickAway()
    .then(() => reportStep('I click away', 'PASSED'));
});

Then('I see the text {string} based on index {string}', (webelementText: string, index: string) => {
  return page.getWebelementFromTextInOrder(webelementText, index)
    .scrollIntoView()
    .should('exist')
    .should('be.visible')
    .then(() => reportStep(`I see the text ${webelementText} based on index ${index}`, 'PASSED'));
});

Then('I do not see the text {string} based on index {string}', (webelementText: string, index: string) => {
  return page.getWebelementFromTextInOrder(webelementText, index)
    .scrollIntoView()
    .should('not.be.visible')
    .then(() => reportStep(`I do not see the text ${webelementText} based on index ${index}`, 'PASSED'));
});

Then('I see the text {string} for {int} times', (webelementText: string, times: number) => {
  return page.getListOfWebelementsOfTextForTimes(webelementText)
    .should('have.length', times)
    .then(() => reportStep(`I see the text ${webelementText} for ${times} times`, 'PASSED'));
});

Then('I do not see the text {string}', (webelementText: string) => {
  iDontSeeText(webelementText)
    .then(() => reportStep(`I do not see the text ${webelementText}`, 'PASSED'));
});

Then('I don´t see these texts', (dataTable: any) => {
  dataTable.hashes().forEach((row) => {
    Object.values(row).forEach((text: string) => {
      cy.contains(text).should('not.exist');
    });
  });

  reportStep('I don’t see these texts', 'PASSED');
});

Then('I scroll to the text {string}', (text: string) => {
  cy.contains(text)
    .scrollIntoView()
    .should('be.visible')
    .then(() => reportStep(`I scroll to the text ${text}`, 'PASSED'));
});

Then('I see article {string}', (articleName: string) => {
  cy.waitUntil(() => checkIfArticleIsVisible(articleName), {
    timeout: 12000,
    interval: 1000,
    errorMsg: `Article with name '${articleName}' was not found or is not visible.`
  })
  .then(() => reportStep(`I see article ${articleName}`, 'PASSED'));
});

Then('I see articles', (dataTable: any) => {
  dataTable.hashes().forEach((row) => {
    Object.values(row).forEach((articleName: string) => {
      cy.waitUntil(() => checkIfArticleIsVisible(articleName), {
        timeout: 5000,
        interval: 500
      });
    });
  });

  reportStep('I see articles', 'PASSED');
});

Then('I click onto the article {string}', (articleName: string) => {
  cy.waitUntil(() => page.getWebelementOfArticle(articleName).should('exist').scrollIntoView(), {
    timeout: 8000,
    interval: 700
  })
    .click()
    .then(() => reportStep(`I click onto the article ${articleName}`, 'PASSED'));
});

Then('I see subarticle {string} underneath article {string}', (subArticle: string, article: string) => {
  page.getWebelementOfSubArticle(article, subArticle)
    .should('exist')
    .scrollIntoView()
    .should('be.visible')
    .then(() => reportStep(`I see subarticle ${subArticle} underneath article ${article}`, 'PASSED'));
});

Then('I hover over article {string}', (articleName: string) => {
  page.getWebelementOfArticle(articleName)
    .should('exist')
    .scrollIntoView()
    .should('be.visible')
    .then(() => reportStep(`I hover over article ${articleName}`, 'PASSED'));
});

When('I click onto next slide', () => {
  cy.waitUntil(() => page.getNextSlide().should('exist'), {
    timeout: 5000,
    interval: 500
  })
    .click()
    .then(() => reportStep('I click onto next slide', 'PASSED'));
});

When('I click onto previous slide', () => {
  cy.waitUntil(() => page.getPreviousSlide().should('exist'), {
    timeout: 5000,
    interval: 500
  })
    .click()
    .then(() => reportStep('I click onto previous slide', 'PASSED'));
});

When('I close this dialog', () => {
  cy.waitUntil(() => page.getCloseDialog().should('exist'), {
    timeout: 5000,
    interval: 500
  })
    .click()
    .then(() => reportStep('I close this dialog', 'PASSED'));
});



function iSeeText(webelementText: string, gherkinStep: string) {
  return page.getListOfWebelementsFromText(webelementText)
    .then($elements => {
      if ($elements.length === 1 && $elements.is(':visible')) {
        cy.log(`✅ Validation message '${webelementText}' is visible`);
      } else {
        const msg = `Expected exactly 1 visible element with text '${webelementText}', but found ${$elements.length}.`;
        cy.log(`🟠 SOFT ASSERT: ${msg}`);
        addSoftAssertion(gherkinStep, msg);
      }
    })
}

function iDontSeeText(webelementText: string) {
  return page.getWebelementByText(webelementText)
    .should('not.exist')
}

function checkIfArticleIsVisible(articleName: string): Cypress.Chainable<boolean> {
  return page.getWebelementOfArticle(articleName)
    .should('exist')
    .scrollIntoView()
    .should(($el) => {
      expect($el.length).to.be.greaterThan(0);
      expect(Cypress.dom.isVisible($el)).to.be.true;
    })
    .then(() => true);
}
