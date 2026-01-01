import 'cypress-iframe';
import 'cypress-wait-until';
import ProductPage from "../pages/ProductPage";
import { Given, When, Then, } from "@badeball/cypress-cucumber-preprocessor";
import { Helpers } from '../Helpers';

const helpers = new Helpers();
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
        helpers.iClickOntoLink(convertedHref);
      });
  });
});


Then('I click onto the link {string}', function (textOfLink: string) {
  return helpers.iClickOntoLink(textOfLink);
});


Then('I see hyperlink for {string}', (uiText: string) => {
  cy.convertTextToHref(uiText).then((convertedHref) => {
    cy.contains('a', uiText)
      .should('exist')
      .should('have.attr', 'href')
      .and('include', convertedHref);
  });
});


Then('I see links', (dataTable: any) => {
  const links: string[] = dataTable.rawTable.map(([linkText]) => linkText);

  links.forEach((linkText) => {
    helpers.waitForLinkToBeVisible(linkText);
  });
});


Then('I see links for webelements with text', function (dataTable: any) {
  const uiTexts = dataTable.rawTable.flat();
  const links: string[] = dataTable.rawTable.map((row: string[]) => row[0]);

  links.forEach((textOfLink) => {
    cy.waitUntil(() => {
      return page.getWebelementOfLinkAbove(textOfLink).should('exist');
    }, {
      timeout: 10000,
      interval: 500,
    }).then(($el: JQuery<HTMLElement>) => {
      const el = $el[0];
      const isVisible = $el.is(':visible') && window.getComputedStyle(el).display !== 'none';
      const isPositionFixed = window.getComputedStyle(el).position === 'fixed';

      if (isVisible && !isPositionFixed) {
        helpers.handleVisibleElement($el, textOfLink);
      } else if (isPositionFixed) {
        helpers.handleFixedPositionElement($el, textOfLink);
      } else {
        helpers.handleInvisibleElement(textOfLink);
      }
    });
  });
});


Then('I don’t see links for webelements with text', function (dataTable: any) {
  const links: string[] = dataTable.rawTable.map((row: string[]) => row[0]);

  links.forEach((textOfLink) => {
    helpers.verifyLinkNotVisible(textOfLink);
  });
});

// Then('I don’t see links for webelements with text', function (dataTable: any) {
//   const uiTexts = dataTable.rawTable.flat();
//   const links: string[] = dataTable.rawTable.map((row: string[]) => row[0]);
//   links.forEach((textOfLink) => {
//     page.getWebelementOfLinkAbove(textOfLink)
//       .should('not.be.visible')
//       .then(() => {
//         cy.log(`Link '${textOfLink}' is not present.`);
//       });
//   });
// });


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
    helpers.checkHyperlink(uiText);
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
          helpers.assertVisibleHyperlink($el, uiText);
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
  helpers.iClickOntoWebelement(textOfLink);
  cy.url().should('eq', "https://" + newURL);
});



Then('Verify all links are OK', function () {
cy.on('uncaught:exception', (err) => {
    console.error(`Uncaught exception occurred: ${err.message || err}`);
    return false;
  });

  cy.get('a').each(($el) => {
    const href = $el.prop('href');

    if (helpers.shouldSkipLink(href)) {
      console.log(`%cSkipping link: ${href}`, 'color: grey;');
      return;
    }

    if (!href) {
      console.warn('%cInvalid or missing href attribute.', 'color: orange;');
      return;
    }

    helpers.checkLinkResponse(href);
  });
});







