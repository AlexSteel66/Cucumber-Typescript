import { fi } from "@faker-js/faker";
import 'cypress-iframe';
import 'cypress-wait-until';
import ProductPage from "../pages/ProductPage";
import {Given, When, Then, } from "@badeball/cypress-cucumber-preprocessor";

const page = new ProductPage();

Then('I click onto {string} occurrence of webelement {string} and open its link', function (position: string, webelementText: string) {
  page.getWebelementFromTextInOrder(webelementText, position)
    .scrollIntoView()
    .should('exist')
    .then(($el) => {
      const href = $el.attr('href');
      if (href) {
        cy.visit(href);
      } else {
        throw new Error('Element does not have attribute href');
      }
    });
});


Then('I see link {string}', (textOfLink: string) => {
  cy.contains('a', textOfLink)
    .should('exist')
    .should('have.attr', 'href')
    .and('include', "http://" + textOfLink + "/");
});


Then('I see simple link {string}', (textOfLink: string) => {
  page.getWebelementOfLink(textOfLink)
    .should('exist');
});

Then('I click onto the simple link {string}', (textOfLink: string) => {
  page.getWebelementOfLink(textOfLink)
    .should('exist')
    .click({ force: true });
});


Then('I see hyperlink for {string}', (uiText: string) => {
  cy.convertTextToHref(uiText).then((convertedHref) => {
    cy.contains('a', uiText)
      .should('exist')
      .should('have.attr', 'href')
      .and('include', convertedHref);
  });
});


Then('I click onto hyperlink {string}', (uiText: string) => {
    cy.convertTextToHref(uiText).then((convertedHref) => {
      cy.contains('a', uiText)
        .should('have.attr', 'href')
        .and('include', convertedHref)
        .then(() => {
          iClickOntoLink(convertedHref);
        });
    });
  });

  
Then('I click onto the link {string}', function (textOfLink: string) {
  return iClickOntoLink(textOfLink);
});

function iClickOntoLink(textOfLink: string) {
  return page.getWebelementOfLink(textOfLink)
    .should('exist')
    .click({force: true});
} 


Then('I see hyperlink for {string}', (uiText: string) => {
  cy.convertTextToHref(uiText).then((convertedHref) => {
    cy.contains('a', uiText)
      .should('exist')
      .should('have.attr', 'href')
      .and('include', convertedHref);
  });
});


Then('I see links', (dataTable: any) => {
  const links: string[] = dataTable.rawTable.map((row: string[]) => row[0]);

  links.forEach((textOfLink) => {
    cy.log(`Waiting for link '${textOfLink}' to be present and visible.`);
    cy.waitUntil(() =>
      page.getWebelementOfLink(textOfLink)
        .should(($el) => $el.length > 0)
        .then(($el) => Cypress.dom.isVisible($el))
      , {
        timeout: 4000,
        interval: 500,
        errorMsg: `Link '${textOfLink}' was not found or is not visible.`
      }).then(() => {
        cy.log(`Link '${textOfLink}' is present and visible.`);
      });
      
  });
  cy.on('fail', (error) => {
    const screenshotPath = `cypress/reports/screenshots/${Cypress.spec.name}.png`;
    // cy.task('updateReport', {
    //   testTitle: "Banking insurance verification",
    //   screenshotPath,
    //   errorMessage: error.message,
    //   stackTrace: error.stack,
    // });

    // throw error;
  });
});
 

Then('I see links for webelements with text', function (dataTable: any) {
    const uiTexts = dataTable.rawTable.flat();
    const links: string[] = dataTable.rawTable.map((row: string[]) => row[0]);
    
    links.forEach((textOfLink) => {
      cy.waitUntil(() => {
        return page.getWebelementOfLinkAbove(textOfLink)
          .should('exist')
      }, {
        timeout: 10000, 
        interval: 500,  
      }).then(($el: JQuery<HTMLElement>) => {
        const isVisible = $el.is(':visible') && window.getComputedStyle($el[0]).display !== 'none';
        const isPositionFixed = window.getComputedStyle($el[0]).position === 'fixed';
  
        if (isVisible && !isPositionFixed) {
          cy.log(`Element '${textOfLink}' is visible.`);
          cy.wrap($el).should('be.visible');  
          
          cy.wrap($el).should('have.attr', 'href').then((href) => {
            cy.log(`Element has href: ${href}`);
          });
        } else if (isPositionFixed) {
          cy.log(`Element '${textOfLink}' has position fixed, checking if it's offscreen.`);
          
          const rect = $el[0].getBoundingClientRect();
          if (rect.top < 0 || rect.bottom > window.innerHeight || rect.left < 0 || rect.right > window.innerWidth) {
            cy.log(`Element '${textOfLink}' with position fixed is offscreen.`);
          } else {
            cy.log(`Element '${textOfLink}' with position fixed is visible on screen.`);
          }
        } else {
          cy.log(`Element '${textOfLink}' is not visible (because it is hidden due to display: none or other reasons).`);
        }
      });
    });
  });
  
  
  
  Then('I don’t see links for webelements with text', function (dataTable: any) {
    const uiTexts = dataTable.rawTable.flat();
    const links: string[] = dataTable.rawTable.map((row: string[]) => row[0]);
    links.forEach((textOfLink) => {
      page.getWebelementOfLinkAbove(textOfLink)
        .should('not.exist')
        .then(() => {
          cy.log(`Link '${textOfLink}' is not present.`);
        });
    });
  });
  
  
  Then('I click onto the link of webelement with text {string}', function (linkOfText: string) {
    page.getWebelementOfLinkAbove(linkOfText)
      .should('exist')
      .filter(':visible')
      .first()
      .click();
    cy.log(`Visible link '${linkOfText}' was clicked.`);
  });
  
  
  
  Then('I see hyperlink for webelements', function (dataTable: any) {
    const uiTexts: string[] = dataTable.rawTable.flat();
    uiTexts.forEach((uiText: string) => {
      cy.waitUntil(() => {
        cy.contains('a', uiText)
          .should('exist')  
          .then(($el: JQuery<HTMLElement>) => {
            cy.wrap($el).should('have.attr', 'href').then((href) => {
              cy.log(`Element has href: ${href}`);
            });
  
            const isVisible = $el.is(':visible') && window.getComputedStyle($el[0]).display !== 'none';
  
            if (isVisible) {
              cy.log(`Element ${uiText} is visible.`);
              cy.wrap($el).should('be.visible');  
            } else {
              cy.log(`Element ${uiText} is not visible (because it is hidden due to display: none).`);
            }
          });
        return true;  
      }, {
        timeout: 10000,  
        interval: 500    
      });
    });
  });
  
  
  
  Then('Inside the block {string} I see hyperlinks', function (blockName: string, dataTable: any) {
    const uiTexts = dataTable.rawTable.flat();
    uiTexts.forEach((uiText: string) => {
      page.getHyperlinksInsideBlock(blockName, uiText)
        .should('exist')  
        .then(($el: JQuery<HTMLElement>) => {
          const isVisible = $el.is(':visible') && window.getComputedStyle($el[0]).display !== 'none';
  
          if (isVisible) {
            cy.log(`Element ${uiText} is visible.`);
            cy.wrap($el).should('be.visible');  
            
            cy.wrap($el).should('have.attr', 'href').then((href) => {
              cy.log(`Element has href: ${href}`);
            });
          } else {
            cy.log(`Element ${uiText} is not visible (because it is hidden due to display: none).`);
          }
        });
    });
  });
  
  
  
  Then('Inside the block {string} with highlighted header I see hyperlinks', function (blockName: string, dataTable: any) {
    const uiTexts = dataTable.rawTable.flat();
    uiTexts.forEach(function (uiText) {
      page.getHyperlinksInsideHighlightedBlock(blockName, uiText)
        .should('exist')
        .should('have.attr', 'href')
        .then(() => {
          cy.log(`Hyperlink "${uiText}" exists inside the highlighted block "${blockName}"`);
        });
    });
  });
  
  Then('I see link underneath block {string} {string}', (block: string, textOfLink: string) => {
    page.getWebelementOfLinkUnderneathBlock(block, textOfLink)
      .should('exist')
      .should('have.attr', 'href');
  });
  
  
  Then('I click into invisible link {string}', (textOfLink: string) => {
    page.getWebelementOfLink(textOfLink).click({ force: true });
  });
  
  
  Then('I open link {string} and go to {string}', (textOfLink: string, newURL: string) => {
    cy.contains('a', textOfLink)
      .should('have.attr', 'href', "http://" + textOfLink + "/")
      .then(($link) => {
        ($link as JQuery<HTMLAnchorElement>).removeAttr('target');
      });
    iClickOntoWebelement(textOfLink);
    cy.url().should('eq', "https://" + newURL);
  });
  
  
  
  Then('Verify all links are OK', function () {
    cy.verifyAllLinksInPageAreOk();
  });

  function iClickOntoWebelement(webelementText: string) {
    cy.waitForPageLoaded();
    return page.getWebelementFromText(webelementText)
      .scrollIntoView()
      .should('exist')
      .then(($el) => {
        $el[0].click();
      });
  }


