import ProductPage from "./pages/ProductPage";

const page = new ProductPage();
export class Helpers {

    clickButtonIfVisibleAndEnabled(buttonName: string): void {
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
    }

    
    waitForButtonToExist(buttonName: string): () => Cypress.Chainable<boolean> {
        return () =>
            page.getButton(buttonName)
                .should('exist')
                .then(() => true);
    }

    iSeeText(webelementText: string) {
        return cy.waitUntil(() =>
            page.getWebelementByText(webelementText)
                .scrollIntoView()
                .should('exist')
                .should('be.visible'),
            { timeout: 10000, interval: 500 }
        ).then(() => {
            cy.log(`The element with text '${webelementText}' is visible on the page.`);
            return cy.wrap(true);
        });
    }

    iDontSeeText(webelementText: string) {
        return page.getWebelementByText(webelementText)
            .should('not.exist');
    }

    iClickOntoWebelement(webelementText: string) {
        cy.waitForPageLoaded();
        return page.getWebelementByText(webelementText)
            .scrollIntoView()
            .should('exist')
            .then(($el: JQuery<HTMLElement>) => {
                if ($el.length > 0) {
                    cy.wrap($el).click();
                } else {
                    throw new Error(`Element with the text "${webelementText}" was not found.`);
                }
            });
    }



    #Links
    iClickOntoLink(textOfLink: string) {
        return page.getWebelementOfLink(textOfLink)
            .should('exist')
            .click({ force: true });
    }



    waitForLinkToBeVisible(linkText: string) {
        cy.log(`✅ Waiting for link '${linkText}' to be present and visible.`);

        return cy.waitUntil(() =>
            page.getWebelementOfLink(linkText)
                .should('have.length.greaterThan', 0)
                .then(($el) => Cypress.dom.isVisible($el))
            , {
                timeout: 4000,
                interval: 500,
                errorMsg: `❌ Link '${linkText}' was not found or is not visible.`
            }).then(() => {
                cy.log(`✅ Link '${linkText}' is present and visible.`);
            });
    }

    handleVisibleElement($els: JQuery<HTMLElement>, textOfLink: string): void {
        const $visible = $els.filter((_, el) => Cypress.dom.isVisible(el));

        if ($visible.length > 0) {
            const $el = $visible.first();

            cy.log(`✅ Element '${textOfLink}' is visible.`);
            cy.wrap($el).should('be.visible');
            cy.wrap($el)
                .should('have.attr', 'href')
                .then((href) => {
                    cy.log(`🔗 Element has href: ${href}`);
                });
        } else {
            cy.log(`⚠️ No visible element found for '${textOfLink}'.`);
        }
    }


    handleFixedPositionElement($el: JQuery<HTMLElement>, textOfLink: string): void {
        cy.log(`Element '${textOfLink}' has position fixed, checking if it's offscreen.`);
        const rect = $el[0].getBoundingClientRect();

        if (rect.top < 0 || rect.bottom > window.innerHeight || rect.left < 0 || rect.right > window.innerWidth) {
            cy.log(`Element '${textOfLink}' with position fixed is offscreen.`);
        } else {
            cy.log(`Element '${textOfLink}' with position fixed is visible on screen.`);
        }
    }

    handleInvisibleElement(textOfLink: string): void {
        cy.log(`Element '${textOfLink}' is not visible (because it is hidden due to display: none or other reasons).`);
    }

    checkHyperlink(uiText: string) {
        return cy.waitUntil(() => {
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
    }

    assertVisibleHyperlink($el: JQuery<HTMLElement>, uiText: string): void {
        cy.log(`Element ${uiText} is visible.`);
        cy.wrap($el).should('be.visible');
        cy.wrap($el).should('have.attr', 'href').then((href) => {
            cy.log(`Element has href: ${href}`);
        });
    }



    shouldSkipLink(href: string | undefined): boolean {
        const skipLinks = [
            'http://online.kpas.sk/povinne-zmluvne-poistenie',
            'https://s3.koop.vshosting.cz/prod-kooperativa-dss-media/media/Vitajte%20vo%20svete%20megatrendov_TRENDY%20ESG.mp4?v=1716289218',
        ];
        return href !== undefined && skipLinks.includes(href);
    }

    verifyLinkNotVisible(textOfLink: string) {
        cy.document().then((doc) => {
            const xpath = `//*[contains(normalize-space(.), '${textOfLink}')]/ancestor::a`;
            const result = doc.evaluate(xpath, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

            if (result.snapshotLength === 0) {
                cy.log(`✅ Link '${textOfLink}' is not in DOM.`);
            } else {
                for (let i = 0; i < result.snapshotLength; i++) {
                    const el = result.snapshotItem(i) as HTMLElement;
                    cy.wrap(el).should('not.be.visible');
                }
                cy.log(`✅ Link '${textOfLink}' exists in DOM but is not visible.`);
            }
        });
    }

    checkLinkResponse(href: string) {
        const startTime = Date.now();

        cy.wrap(null).then(() => {
            return cy.request({
                url: href,
                failOnStatusCode: false,
                timeout: 20000,
            });
        }).then((response: Cypress.Response<any>) => {
            const elapsedTime = (Date.now() - startTime) / 1000;
            const statusCode = response.status;

            if (elapsedTime > 6) {
                cy.log(`%cLink: ${href} - Failed to load within 6 seconds (Time: ${elapsedTime}s)`, 'color: red;');
            } else {
                const color = statusCode === 200 ? 'green' : 'orange';
                cy.log(`%cLink: ${href} - Status: ${statusCode} (Time: ${elapsedTime}s)`, `color: ${color};`);
            }
        }).then(null, () => {
            cy.log(`Link: ${href} - Failed to load or encountered an error.`);
        });
    }
}