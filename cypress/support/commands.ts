/// <reference types="cypress" />
/// <reference types="cypress-xpath" /> 

import 'cypress-iframe';
import ProductPage from '../pages/ProductPage';
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

Cypress.Commands.add('visitKpasURL', (): void => {
  const url = 'https://www.kpas.sk/';
  cy.visit(url);
});

Cypress.Commands.add('visitVIGsite', (): void => {
  const url = 'https://group.vig/';
  cy.visit(url);
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

Cypress.Commands.add('getValueOfFieldDependingOnItsIndex', (fieldName: string, index: number) => {
  return productPage.getTheFieldInputBasedOnIndex(fieldName, index)
    .invoke('val')
    .then((value) => value?.toString() || '');
})


Cypress.Commands.add("verifyVisibilityOfElementUponMouseOver", (elementName: string, classNameOfVisibleElement: string) => {
  productPage.getWebelementFromText(elementName).eq(0).trigger('mouseover')
  cy.get(classNameOfVisibleElement).should('be.visible')
})


Cypress.Commands.add('verifyAllLinksInPageAreOk', () => {
  cy.on('uncaught:exception', (err, runnable) => {
    console.error(`Uncaught exception occurred: ${err.message || err}`);
    return false;
  });

  cy.get('a').each(($el) => {
    const href = $el.prop('href');
    
    if (
      href === 'http://online.kpas.sk/povinne-zmluvne-poistenie' ||
      href === 'https://s3.koop.vshosting.cz/prod-kooperativa-dss-media/media/Vitajte%20vo%20svete%20megatrendov_TRENDY%20ESG.mp4?v=1716289218'
    ) {
      console.log(`%cLink: ${href} - Skipping this link as per the condition.`, 'color: grey;');
      return; 
    }

    if (href) {
      const startTime = Date.now();

      cy.request({
        url: href,
        failOnStatusCode: false,
        timeout: 10000, 
      }).then((response) => {
        const elapsedTime = (Date.now() - startTime) / 1000; 
        const statusCode = response.status;

        if (elapsedTime > 6) {
          console.log(
            `%cLink: ${href} - Failed to load within 6 seconds (Time: ${elapsedTime}s)`,
            'color: red;'
          );
        } else {
          console.log(
            `%cLink: ${href} - Status: ${statusCode} (Time: ${elapsedTime}s)`,
            statusCode === 200 ? 'color: green;' : 'color: orange;'
          );
        }
      }).then(null, () => {
        console.log(`Link: ${href} - Failed to load or encountered an error.`);
      });
    } else {
      console.warn('%cInvalid or missing href attribute.', 'color: orange;');
    }
  });
});