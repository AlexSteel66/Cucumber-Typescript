import 'cypress-iframe';
import 'cypress-wait-until';
import ProductPage from "../pages/ProductPage";
import { Given, When, Then, } from "@badeball/cypress-cucumber-preprocessor";
import { Helpers } from '../Helpers';
import { reportStep } from '../reports/hierarchicalReport';


const helpers = new Helpers();
const page = new ProductPage();

Then('I click onto {string} occurrence of webelement {string} and open its link', (position: string, webelementText: string) => {
  page.getWebelementFromTextInOrder(webelementText, position)
    .scrollIntoView()
    .should('exist')
    .then(($el) => {
      const href = $el.attr('href');
      if (!href) throw new Error('Element does not have attribute href');
      cy.visit(href);
    })
    .then(() => {
      reportStep(`I click onto ${position} occurrence of webelement ${webelementText} and open its link`, 'PASSED');
    });
});

Then('I see link {string}', (textOfLink: string) => {
  cy.contains('a', textOfLink)
    .should('exist')
    .should('have.attr', 'href')
    .and('include', `http://${textOfLink}/`)
    .then(() => {
      reportStep(`I see link ${textOfLink}`, 'PASSED');
    });
});

Then('I see simple link {string}', (textOfLink: string) => {
  page.getWebelementOfLink(textOfLink)
    .should('exist')
    .then(() => {
      reportStep(`I see simple link ${textOfLink}`, 'PASSED');
    });
});

Then('I click onto the simple link {string}', (textOfLink: string) => {
  page.getWebelementOfLink(textOfLink)
    .should('exist')
    .click({ force: true })
    .then(() => {
      reportStep(`I click onto the simple link ${textOfLink}`, 'PASSED');
    });
});

Then('I see hyperlink for {string}', (uiText: string) => {
  cy.convertTextToHref(uiText).then((convertedHref) => {
    cy.contains('a', uiText)
      .should('exist')
      .should('have.attr', 'href')
      .and('include', convertedHref)
      .then(() => {
        reportStep(`I see hyperlink for ${uiText}`, 'PASSED');
      });
  });
});

Then('I click onto hyperlink {string}', (uiText: string) => {
  cy.convertTextToHref(uiText).then((convertedHref) => {
    cy.contains('a', uiText)
      .should('have.attr', 'href')
      .and('include', convertedHref)
      .then(() => {
        helpers.iClickOntoLink(convertedHref);
        reportStep(`I click onto hyperlink ${uiText}`, 'PASSED');
      });
  });
});

Then('I click onto the link {string}', (textOfLink: string) => {
  helpers.iClickOntoLink(textOfLink)
    .then(() => {
      reportStep(`I click onto the link ${textOfLink}`, 'PASSED');
    });
});

Then('I see links', (dataTable: any) => {
  const links: string[] = dataTable.rawTable.map(([linkText]) => linkText);
  links.forEach((linkText) => {
    helpers.waitForLinkToBeVisible(linkText);
  });
  reportStep('I see all listed links', 'PASSED');
});

Then('I see links for webelements with text', (dataTable: any) => {
  const links: string[] = dataTable.rawTable.map(row => row[0]);

  links.forEach((textOfLink) => {
    cy.waitUntil(
      () => page.getWebelementOfLinkAbove(textOfLink).should('exist'),
      { timeout: 10000, interval: 500 }
    ).then(($el) => {
      const el = $el[0];
      const styles = window.getComputedStyle(el);
      const isVisible = $el.is(':visible') && styles.display !== 'none';

      if (isVisible && styles.position !== 'fixed') helpers.handleVisibleElement($el, textOfLink);
      else if (styles.position === 'fixed') helpers.handleFixedPositionElement($el, textOfLink);
      else helpers.handleInvisibleElement(textOfLink);
    });
  });

  reportStep('I see links for webelements with text', 'PASSED');
});

Then('I don’t see links for webelements with text', (dataTable: any) => {
  const links: string[] = dataTable.rawTable.map(row => row[0]);
  links.forEach((textOfLink) => {
    helpers.verifyLinkNotVisible(textOfLink);
  });
  reportStep('I do not see links for webelements with text', 'PASSED');
});

Then('I click onto the link of webelement with text {string}', (linkOfText: string) => {
  page.getWebelementOfLinkAbove(linkOfText)
    .should('exist')
    .filter(':visible')
    .first()
    .click()
    .then(() => {
      reportStep(`I click onto the link of webelement with text ${linkOfText}`, 'PASSED');
    });
});

Then('I see hyperlink for webelements', (dataTable: any) => {
  const uiTexts: string[] = dataTable.rawTable.flat();
  uiTexts.forEach(uiText => helpers.checkHyperlink(uiText));
  reportStep('I see hyperlink for all webelements', 'PASSED');
});

Then('Inside the block {string} I see hyperlinks', (blockName: string, dataTable: any) => {
  const uiTexts = dataTable.rawTable.flat();

  uiTexts.forEach(uiText => {
    page.getHyperlinksInsideBlock(blockName, uiText)
      .should('exist')
      .then(($el) => {
        if ($el.is(':visible')) helpers.assertVisibleHyperlink($el, uiText);
      });
  });

  reportStep(`Inside the block ${blockName} I see hyperlinks`, 'PASSED');
});

Then('Inside the block {string} with highlighted header I see hyperlinks', (blockName: string, dataTable: any) => {
  const uiTexts = dataTable.rawTable.flat();

  uiTexts.forEach(uiText => {
    page.getHyperlinksInsideHighlightedBlock(blockName, uiText)
      .should('exist')
      .should('have.attr', 'href');
  });

  reportStep(`Inside the highlighted block ${blockName} I see hyperlinks`, 'PASSED');
});

Then('I see link underneath block {string} {string}', (block: string, textOfLink: string) => {
  page.getWebelementOfLinkUnderneathBlock(block, textOfLink)
    .should('exist')
    .should('have.attr', 'href')
    .then(() => {
      reportStep(`I see link ${textOfLink} underneath block ${block}`, 'PASSED');
    });
});

Then('I click into invisible link {string}', (textOfLink: string) => {
  page.getWebelementOfLink(textOfLink)
    .click({ force: true })
    .then(() => {
      reportStep(`I click into invisible link ${textOfLink}`, 'PASSED');
    });
});

Then('I open link {string} and go to {string}', (textOfLink: string, newURL: string) => {
  cy.contains('a', textOfLink)
    .should('have.attr', 'href', `http://${textOfLink}/`)
    .then($link => ($link as JQuery<HTMLAnchorElement>).removeAttr('target'));

  helpers.iClickOntoWebelement(textOfLink);

  cy.url()
    .should('eq', `https://${newURL}`)
    .then(() => {
      reportStep(`I open link ${textOfLink} and go to ${newURL}`, 'PASSED');
    });
});

Then('Verify all links are OK', () => {
  cy.on('uncaught:exception', () => false);

  cy.get('a').each(($el) => {
    const href = $el.prop('href');
    if (!href || helpers.shouldSkipLink(href)) return;
    helpers.checkLinkResponse(href);
  }).then(() => {
    reportStep('Verify all links are OK', 'PASSED');
  });
});







