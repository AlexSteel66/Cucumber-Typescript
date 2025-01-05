import { fi } from "@faker-js/faker";
import 'cypress-iframe';
import ProductPage from "../pages/ProductPage";
import { FieldData } from "../e2e/FieldData";


class ProductSteps {
  page = new ProductPage();

  doSearch(keyword: string) {
    this.clickIntoPredefinedWebelement(this.page.getSearchField())
    this.typeIntoPredifinedField(this.page.getSearchFieldSpace(), keyword)
    Cypress.config('defaultCommandTimeout', 2000)
    this.clickIntoPredefinedWebelement(this.page.getSearchFieldButton())
  }

  getToVIG(productPage: ProductPage, insuranceCompany: string, buttonName: string, number: string) {
    this.getTextNextToWebElement(productPage.getNumberOfResults(), number)
    cy.chooseHeader(insuranceCompany)
    this.clickOntoButton(buttonName)
  }

  clickIntoPredefinedWebelement(webelement: string) {
    cy.xpath(webelement).click({ force: true });
  }

  iSeeWebelement(webelementText: string) {
    this.page.getWebelementFromText(webelementText)
      .scrollIntoView()
      .should('exist');
  }

  iSeeSpanWebelement(webelementText: string) {
    this.page.getSpanWebelementFromText(webelementText)
      .scrollIntoView()
      .should('exist');
  }


  iClickOntoWebElement(webelementText: string) {
    cy.waitForPageLoaded()
    this.page.getWebelementFromText(webelementText)
      .scrollIntoView()
      .should('exist')
      .then(($el) => {
        $el[0].click();
      });
  }

  iClickOntoWebElementInOrder(webelementText: string, position: number) {
    this.page.getWebelementFromTextInOrder(webelementText, position)
      .scrollIntoView()
      .should('exist')
      .then(($el) => {
        $el[0].click();
      });
  }


  iClickOntoWebElementInOrderAndOpenLink(webelementText: string, position: number) {
    this.page.getWebelementFromTextInOrder(webelementText, position)
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
  }


  iClickOntoSpanWebElement(webelementText: string) {
    this.page.getSpanWebelementFromText(webelementText).click()
  }

  getTextNextToWebElement(element: string, someText: string) {
    cy.xpath(element).then(function (text1) {
      expect(text1.text()).to.equal(someText)
    })
  }

  iSeeField(fieldName: string) {
    this.page.getField(fieldName)
      .scrollIntoView()
      .should('exist')
      .should('be.visible');
  }


  testDropdownOptions(dropdownName: string, expectedOptions: string[]) {
    const dropdownSelector = this.page.getSelectorOfDropdown(dropdownName);
    const actualOptions: string[] = [];
    cy.xpath(dropdownSelector)
      .find('option')
      .each(($el) => {
        cy.wrap($el).invoke('text').then((text) => {
          actualOptions.push(text.trim()); 
        });
      })
      .then(() => {
        const unmatchedOptions = actualOptions.filter(option => !expectedOptions.includes(option))
          .concat(expectedOptions.filter(option => !actualOptions.includes(option)));

        if (unmatchedOptions.length > 0) {
          throw new Error(`Different option in dropdown: ${unmatchedOptions.join(', ')}`);
        }

        expect(actualOptions).to.deep.equal(expectedOptions);

      });
  }

  testDropdownDoesNotContainOptions(dropdownName: string, unexpectedOptions: string[]) { 
    const dropdownSelector = this.page.getSelectorOfDropdown(dropdownName);
    const actualOptions: string[] = [];
    cy.xpath(dropdownSelector)
      .find('option')
      .each(($el) => {
        cy.wrap($el).invoke('text').then((text) => {
          actualOptions.push(text.trim()); 
        });
      })
      .then(() => {
        const foundUnexpectedOptions = actualOptions.filter(option => unexpectedOptions.includes(option));
        expect(foundUnexpectedOptions).to.be.empty;
  
        if (foundUnexpectedOptions.length > 0) {
          throw new Error(`Unexpected option in dropdown: ${foundUnexpectedOptions.join(', ')}`);
        }
      });
  }

  selectOptionFromDropdown(dropdownName: string, defaultOption: string) { 
    const dropdownSelector = this.page.getSelectorOfDropdown(dropdownName);
    cy.xpath(dropdownSelector)
      .should('be.visible')  
      .select(defaultOption); 
}

dropdownHasValue(dropdownName: string, expectedValue: string) {
  const dropdownSelector = this.page.getSelectorOfDropdown(dropdownName);
  
  cy.xpath(dropdownSelector)
    .should('be.visible')  
    .invoke('val')  
    .then((actualValue) => {
      expect(actualValue?.toString() || '').to.equal(expectedValue, `Expected dropdown value to be '${expectedValue}', but got '${actualValue}'.`);
    });
}
  

  iSeeTheFieldBasedOnIndex(fieldName: string, index: number) {
    this.page.getTheFieldInputBasedOnIndex(fieldName, index)
      .scrollIntoView()
      .should('exist')
      .should('be.visible');
  }

  iDontSeeTheFieldBasedOnIndex(fieldName: string, index: number) {
    this.page.getTheFieldInputBasedOnIndex(fieldName, index)
      .should('not.be.visible');
  }

  iDontSeeField(fieldName: string) {
    this.page.getField(fieldName)
      .scrollIntoView()
      .should('exist')
      .should('not.be.visible');
  }

  fieldHasValue(fieldName: string, value: string) {
    cy.getValueOfField(fieldName).should('eq', value)
  }

  fieldWithIndexHasValue(fieldName: string, index: number, value: string) {
    cy.getValueOfFieldDependingOnItsIndex(fieldName, index).should('eq', value)
  }

  fieldValueHasText(fieldName: string, value: string) {
    cy.getText(this.page.getSelectorOfFieldInput(fieldName)).should('eq', value)
  }

  clickIntoField(fieldName: string) {
    this.page.getWebelementOfFieldInput(fieldName).as('fieldInput')
      .click()
  }

  typeIntoField(fieldName: string, value: string) {
    this.page.getWebelementOfFieldInput(fieldName).as('fieldInput')
      .clear({ force: true })
      .type(value)
  }

  typeIntoFieldWithIndex(fieldName: string, value: string, index: number) {
    this.page.getTheFieldInputBasedOnIndex(fieldName, index).as('fieldInput')
      .clear({ force: true })
      .type(value)
  }

  typeIntoPredifinedField(element: string, text: string) {
    const field = cy.xpath(element)
      .should('exist')
      .should('be.visible');
    field.clear();
    field.type(text);
    cy.log("Text: " + text + " was typed into the given field.")
    return this;
  }


  iSeeValidationMessageUnderneathField(fieldName: string, validationMessage: string,) {
    cy.getText(this.page.getSelectorOfValidationMessageOfField(fieldName))
      .should('eq', validationMessage)
  }

  iSeePdf(webelementText: string) {
    this.iSeeText(webelementText)
      .should('have.attr', 'class', 'pdf')
      .should('have.attr', 'href')

  }

  iSeeOtherPdf(webelementText: string) {
    this.iSeeText(webelementText)
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'href')
  }

  iDontSeePdf(webelementText: string) {
    this.iDontSeeText(webelementText)
  }


  iSeeText(webelementText: string) {
    return this.page.getWebelementFromText(webelementText)
      .scrollIntoView()
      .should('exist')
      .should('be.visible')
  }

  iClickAwayFromField() {
    cy.iClickAway()
  }

  iSeeTextWithIndex(webelementText: string, index: number) {
    return this.page.getWebelementFromTextInOrder(webelementText, 2)
      .scrollIntoView()
      .should('exist')
      .should('be.visible')
  }

  iDontSeeTextWithIndex(webelementText: string, index: number) {
    return this.page.getWebelementFromTextInOrder(webelementText, 2)
      .scrollIntoView()
      .should('not.be.visible')
  }

  iSeeTextForTimes(webelementText: string, times: number) {
    return this.page.getListOfWebelementsOfTextForTimes(webelementText)
      .should('have.length', times)
  }


  iSeeRectangleRadioButtonForTimes(webelementText: string, times: number) {
    return this.page.getListOfRectangleRadioButtonsForTimes(webelementText)
      .should('have.length', times)
  }


  iDontSeeText(webelementText: string) {
    return this.page.getWebelementFromText(webelementText)
      .scrollIntoView()
      .should('not.be.visible')
  }


  clickOntoButton(buttonName: string) {
    const button = this.iSeeButton(buttonName);
    button.click();
  }

  iSeeButton(buttonName: string) {
    return this.page.getButton(buttonName)
      .should('exist')
      .scrollIntoView()
      .should('be.visible')
  }

  iSeeSimpleRadioButton(buttonName: string) {
    return this.page.getSimpleRadioButton(buttonName)
      .should('exist')
      .scrollIntoView()
      .should('be.visible')
  }

  iSelectSimpleRadioButton(buttonName: string) {
    return this.page.getSimpleRadioButton(buttonName).click()
  }


  iSeeSimpleRadioButtonIsSelected(radioButton: string, state: boolean) {
    this.page.getSimpleRadioButton(radioButton).then(($radioButton) => {
      if (state) {
        cy.wrap($radioButton).should('have.attr', 'class', 'icon icon--radio-true');
      } else {
        cy.wrap($radioButton).should('have.attr', 'class', 'icon icon--radio-false');
      }
    });
  }


  iSeeRadioButton(radioButtonName: string) {
    this.page.getRadioButtonWebelement().each(($label) => {
      cy.wrap($label).invoke('text').then((actualRadiobuttonName) => {
        cy.log('Radiobutton name', actualRadiobuttonName.trim());
        if (actualRadiobuttonName.trim() === radioButtonName) {
          cy.log(`Found radiobutton with name: ${radioButtonName}`);
          expect(actualRadiobuttonName.trim()).to.equal(radioButtonName);
          cy.wrap($label).should('be.visible');
        }
      });
    });
  }



  iSeeRadioButtonBlock(radioButtonName: string) {
    this.page.getWebelementOfRadioButtonPropertyHeader().each(($label) => {
      cy.wrap($label).invoke('text').then((actualRadiobuttonName) => {
        cy.log('Radiobutton name', actualRadiobuttonName.trim());
        if (actualRadiobuttonName.trim() === radioButtonName) {
          cy.log(`Found radiobutton with name: ${radioButtonName}`);
          expect(actualRadiobuttonName.trim()).to.equal(radioButtonName);
          cy.wrap($label).should('be.visible');
        }
      });
    });
  }



  iDontSeeRadioButton(radioButtonName: string) {
    this.page.getRadioButtonWebelement().each(($label) => {
      cy.wrap($label).invoke('text').then((actualRadiobuttonName) => {
        cy.log('Radiobutton name', actualRadiobuttonName.trim());
        if (actualRadiobuttonName.trim() === radioButtonName) {
          cy.log(`Found radiobutton with name: ${radioButtonName}`);
          expect(actualRadiobuttonName.trim()).to.equal(radioButtonName);
          cy.wrap($label).should('not.be.visible');
        }
      });
    });
  }


  iSeeRectangleRadiobuttonInOrderIsSelected(radioButtonName: string, position: number, state: boolean) {
    this.page.getRectangleRadioButtonInPosition(radioButtonName, position).then(($radioButton) => {
      if (state) {
        cy.wrap($radioButton).should('have.attr', 'class', 'selected');
      } else {
        cy.wrap($radioButton).should('not.have.attr', 'class', 'selected');
      }
    });
  }

  iDontSeeRectangleRadiobuttonInOrder(radioButtonName: string, position: number) {
    this.page.getRectangleRadioButtonInPosition(radioButtonName, position)
      .should('not.be.visible')
  }

  iSelectRectangleRadiobuttonInOrder(radioButtonName: string, position: number) {
    this.page.getRectangleRadioButtonInPosition(radioButtonName, position).click();
  }

  iSelectRadioButton(radioButtonName: string) {
    this.page.getRadioButtonWebelement().each(($label) => {
      cy.wrap($label)
        .invoke('text')
        .then((actualRadiobuttonName) => {
          cy.log('Radiobutton name', actualRadiobuttonName.trim());
          if (actualRadiobuttonName.trim() === radioButtonName) {
            cy.log(`Found radiobutton with name: ${radioButtonName}`);
            cy.wrap($label)
              .find('input[type="radio"]')
              .click();
          }
        });
    });
  }


  iSeeRadioButtonIsChecked(radioButtonName: string) {
    this.page.getRadioButtonWebelement().each(($label) => {
      cy.wrap($label)
        .invoke('text')
        .then((actualRadiobuttonName) => {
          cy.log('Radiobutton name', actualRadiobuttonName.trim());
          if (actualRadiobuttonName.trim() === radioButtonName) {
            cy.log(`Found radiobutton with name: ${radioButtonName}`);
            expect(actualRadiobuttonName.trim()).to.equal(radioButtonName);

            cy.wrap($label)
              .find('input[type="radio"]')
              .should('have.attr', 'checked');
          }
        });
    });
  }

  iSeeRadioButtonIsUnchecked(radioButtonName: string) {
    this.page.getRadioButtonWebelement().each(($label) => {
      cy.wrap($label)
        .invoke('text')
        .then((actualRadiobuttonName) => {
          cy.log('Radiobutton name', actualRadiobuttonName.trim());
          if (actualRadiobuttonName.trim() === radioButtonName) {
            cy.log(`Found radiobutton with name: ${radioButtonName}`);
            expect(actualRadiobuttonName.trim()).to.equal(radioButtonName);

            cy.wrap($label)
              .find('input[type="radio"]')
              .should('not.have.attr', 'checked');
          }
        });
    });
  }

  iSeeDropdownButton(buttonName: string) {
    this.page.getWebelementOfDropdownButton(buttonName)
      .should('exist')
      .scrollIntoView()
      .should('be.visible')
  }

  iClickIntoDropdownButton(buttonName: string) {
    this.page.getWebelementOfDropdownButton(buttonName)
      .should('exist')
      .scrollIntoView()
      .should('be.visible').click()
  }

  iSeeLink(textOfLink: string) {
    cy.contains('a', textOfLink)
      .should('exist')
      .should('have.attr', 'href')
      .and('include', "http://" + textOfLink + "/");
  }

  iSeeSimpleLink(textOfLink: string) {
    this.page.getWebelementOfLink(textOfLink)
      .should('exist')
  }


  iSeeHyperLink(uiText: string) {
    cy.convertTextToHref(uiText).then((convertedHref) => {
      // Find the element containing the uiText and check if the href attribute contains the converted href value
      cy.contains('a', uiText)  // Ensures that it finds an anchor (<a>) element with the displayed text
        .should('exist')        // Verify that the element exists
        .should('have.attr', 'href')  // Ensure it has an href attribute
        .and('include', convertedHref);  // Check that href includes the converted value
    });
  }


  iClickOntoHyperLink(uiText: string): void {
    cy.convertTextToHref(uiText).then((convertedHref) => {
      cy.contains('a', uiText)
        .should('have.attr', 'href')
        .and('include', convertedHref)
        .then(() => {
          this.iClickIntoSimpleLink(convertedHref);
        });
    });
  }

  iSeeLinkUnderneathBlock(block: string, textOfLink: string) {
    this.page.getWebelementOfLinkUnderneathBlock(block, textOfLink)
      .should('exist')        // Verify that the element exists
      .should('have.attr', 'href')
  }

  iClickIntoSimpleLink(textOfLink: string) {
    this.page.getWebelementOfLink(textOfLink)
      .should('be.visible').click()
  }

  iClickIntoInvisibleLink(textOfLink: string) {
    this.page.getWebelementOfLink(textOfLink).click({ force: true })
  }

  openLink(textOfLink: string, newURL: string) {
    cy.contains('a', textOfLink)
      .should('have.attr', 'href', "http://" + textOfLink + "/")
      .then(($link) => {
        // Remove the 'target' attribute to make sure the link opens in the same tab
        ($link as JQuery<HTMLAnchorElement>).removeAttr('target');
      });
    // Click the link, and it will open in the same window
    this.iClickOntoWebElement(textOfLink)
    cy.url().should('eq', "https://" + newURL);
  }


  iSeeArticles(articleName: string) {
    this.page.getWebelementOfArticle(articleName)
      .should('exist')
      .scrollIntoView()
      .should('be.visible')
  }

  iSeeSubarticleUnderneathArticle(subArticle: string, article: string) {
    this.page.getWebelementOfSubArticle(article, subArticle)
      .should('exist')
      .scrollIntoView()
      .should('be.visible')
  }

  iHoverOverArticle(articleName: string) {
    this.page.getWebelementOfArticle(articleName)
      .should('exist')
      .scrollIntoView()
      .should('be.visible')
  }

  clickOntoButtonInCookieDialog(buttonName: string) {
    cy.wait(3000)
    cy.get('body').click();
  }

  iSeeCheckbox(checkbox: string) {
    this.page.getWebelementOfCheckbox(checkbox)
      .should('exist')
      .should('be.visible')
  }

  iSelectCheckbox(checkbox: string) {
    this.page.getWebelementOfCheckbox(checkbox)
      .click()
  }

  iSeeTheCheckbox(checkbox: string) {
    this.page.getWebelementOfTheCheckbox(checkbox)
      .should('exist')
      .should('be.visible')
  }

  iSelectTheCheckbox(checkbox: string) {
    this.page.getWebelementOfTheCheckbox(checkbox)
      .click()
  }

  iDeselectTheCheckbox(checkbox: string) {
    this.page.getWebelementOfTheCheckbox(checkbox)
      .click()
  }

  iProceedToTheSection(sectionName: string) {
    const fieldData = new FieldData()

    if (sectionName === "event") {
      cy.visitKpasURL();
      this.iClickOntoWebElementInOrder(fieldData.getElement("callUs"), 2);
      this.iClickOntoWebElementInOrderAndOpenLink(fieldData.getElement("online"), 6);
      this.iClickOntoWebElement(fieldData.getElement("citizenProperty"));
      
      this.typeIntoFieldWithIndex(fieldData.fieldNameFirstName, fieldData.getValue(fieldData.fieldNameFirstName)[2], 2);
      this.typeIntoFieldWithIndex(fieldData.fieldNameLastName, fieldData.getValue(fieldData.fieldNameLastName)[2], 2);
      this.typeIntoFieldWithIndex(fieldData.fieldNamePersonalId, fieldData.getValue(fieldData.fieldNamePersonalId)[3], 1);
      this.typeIntoFieldWithIndex(fieldData.fieldNamePhone, fieldData.getValue(fieldData.fieldNamePhone)[4], 2);
      this.typeIntoFieldWithIndex(fieldData.fieldNameEmail, fieldData.getValue(fieldData.fieldNameEmail)[4], 2);
      this.typeIntoFieldWithIndex(fieldData.fieldNameStreet, fieldData.getValue(fieldData.fieldNameStreet)[2], 1);
      this.typeIntoFieldWithIndex(fieldData.fieldNameHouseNumber, fieldData.getValue(fieldData.fieldNameHouseNumber)[2], 1);
      this.typeIntoFieldWithIndex(fieldData.fieldNameCity, fieldData.getValue(fieldData.fieldNameCity)[2], 1);
      this.typeIntoFieldWithIndex(fieldData.fieldNameZipCode, fieldData.getValue(fieldData.fieldNameZipCode)[4], 1);
      this.typeIntoFieldWithIndex(fieldData.fieldNameInsuranceNumber, fieldData.getValue(fieldData.fieldNameInsuranceNumber)[4], 1);
      
      this.iClickOntoWebElement(fieldData.getElement("next"));
    }
  }

}



export default ProductSteps