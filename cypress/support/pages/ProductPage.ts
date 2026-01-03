import 'cypress-xpath';

class ProductPage {

  private get nextSlide() {
    return '//button[@aria-label="Next slide"]';
  }

  private get previousSlide() {
    return '//button[@aria-label="Previous slide"]';
  }


  private get closeDialog() {
    return "//*[@aria-label='Zatvoriť']//ancestor::button";
  }

  private get searchfield() {
    return '(//*[@id="js-header"]//a)[position()=6]';
  }

  private get searchfieldSpace() {
    return '//*[@id="search-input"]';
  }

  private get searchfieldButton() {
    return '//*[@id="searchform-6"]//button';
  }

  private get numberOfResults() {
    return "//*[contains(text(),'Počet výsledkov')]//parent::div//span";
  }




  public getNextSlide() {
    return cy.xpath(this.nextSlide);
  }

  public getPreviousSlide() {
    return cy.xpath(this.previousSlide);
  }

  public getCloseDialog() {
    return cy.xpath(this.closeDialog);
  }

  public getSearchField() {
    return this.searchfield;
  }

  public getSearchFieldSpace() {
    return this.searchfieldSpace;
  }

  public getSearchFieldButton() {
    return this.searchfieldButton;
  }

  public getNumberOfResults() {
    return this.numberOfResults;
  }



  getSelectorOfTextArea(textAreaName: string) {
    return cy.contains(textAreaName).prev('textarea')
  }

  getSelectorOfFieldInputBasedOnIndex(fieldName: string, index: number) {
    return cy.contains(fieldName).parent().find('input').eq(index - 1)
  }

  getSelectorOfValidationMessageOfField(fieldName: string) {
    return cy.contains(fieldName)
      .parent()
      .nextAll('span')
      .find('span')
      .first();
  }

  getSelectorForSimpleRadioButton(radioButton: string) {
    return cy.contains(radioButton)
      .closest('.radio')
      .find('i');
  }

  getSelectorOfRectangleRadioButton(radioButton: string, position: number) {
    return cy.get('.radio-group-options')
      .contains(radioButton)
      .eq(position - 1);
  }

  getSelectorOfRadioButtonPropertyHeader() {
    return cy.get('.label')
      .parent('.radio-group');
  }

  getSelectorFromTextForTimes(webelementText: string) {
    return cy.contains(webelementText);
  }

  getSelectorOfDropdown(dropdownName: string) {
    return cy.contains(dropdownName)
      .parent()
      .find('select');
  }

  getSelectorForRectangleRadioButttons(text) {
    cy.contains(text).closest('.radio-group-options')
  }

  getSelectorFromTextInOrder(webelementText, position) {
    return cy.contains(webelementText).eq(position - 1)
  }

  getWebelementOfCheckbox(checkboxLabel: string) {
    return cy.contains('label', checkboxLabel)
      .parent()
      .find('input[type="checkbox"]')
  }

  getWebelementOfFieldInput(fieldName: string) {
    return cy.contains('label', fieldName).should('be.visible').parent().find('input');
  }


  getWebelementByText(webelementText: string) {
    return cy.contains(webelementText);
  }

  getSpanWebelementFromText(webelementText: string) {
    return cy.contains('span', webelementText).eq(0).closest('a');
  }


  getHyperlinksInsideBlock(blockName: string, hyperlinkName: string) {
    return cy.contains('section', blockName)
      .parent()
      .find('a')
      .contains(hyperlinkName)
  }


  getHyperlinksInsideHighlightedBlock(blockName: string, hyperlinkName: string) {
    return cy.contains('section', blockName)
      .contains('a', hyperlinkName)
  }


  getSelectorOfRadioButton(radioButton: string) {
    return "(//*[contains(text(),'" + radioButton + "')])//preceding-sibling::span//input"
  }


  getSelectorOfFieldInput(fieldName: string) {
    return `//label[contains(text(),'${fieldName}')]/preceding::input[1]`
  }

  getSelectorOfRadioButtonUnderTextBlock() {
    return "//input[@type='radio']//ancestor::label"
  }

  getSelectorOfButton(buttonName: string) {
    return "(//*[contains(text(),'" + buttonName + "')]//ancestor::button)[position()=1]"
  }

  getSelectorOfDropdownButton(buttonName: string) {
    return "//*[contains(text(),'" + buttonName + "')]//ancestor::*[contains(@role, 'button')]"
  }

  getSelectorOfArticle(articleName: string) {
    return "//*[contains(text(),'" + articleName + "')]//ancestor::article[@class]"
  }

  getSelectorOfSubArticle(article: string, subArticle: string) {
    return "(//*[contains(text(),'" + article + "')]//ancestor::article[contains(@class, 'bottom-skew')])[position()=2]//ul//a[contains(text(),'" + subArticle + "')]"
  }

  getSelectorOfLink(textOfLink: string) {
    return `(//a[contains(@href, '${textOfLink}')])[position()=1]`
  }


  getSelectorOfLinkAbove(textOfLink: string) {
    return "//*[normalize-space(text()) = '" + textOfLink + "']//ancestor::a"
  }

  getSelectorOfLinkUnderneathBlock(block: string, textOfLink: string) {
    return "//h3[contains(text(),'" + block + "')]//parent::div//*[contains(text(),'" + textOfLink + "')]"
  }


  getSelectorOfTheCheckbox(checkbox: string) {
    return "//*[contains(text(),'" + checkbox + "')]//ancestor::label//input"
  }

  getField(fieldName: string) {
    return cy.xpath("//input//preceding::label[contains(text(),'" + fieldName + "')]")
  }





  getTextArea(textAreaName: string) {
    return this.getSelectorOfTextArea(textAreaName)
  }

  getDropdownWebelement(dropdownName: string) {
    return this.getSelectorOfDropdown(dropdownName)
  }

  getTheFieldInputBasedOnIndex(fieldName: string, index: number) {
    return (this.getSelectorOfFieldInputBasedOnIndex(fieldName, index))
  }

  getSimpleRadioButton(radioButton: string) {
    return this.getSelectorForSimpleRadioButton(radioButton)
  }

  getRectangleRadioButtonInPosition(radioButton: string, position: number) {
    return this.getSelectorOfRectangleRadioButton(radioButton, position)
  }

  getWebelementOfLinkUnderneathBlock(block: string, link: string) {
    return cy.xpath(this.getSelectorOfLinkUnderneathBlock(block, link))
  }

  getWebelementOfTheCheckbox(checkbox: string) {
    return cy.xpath(this.getSelectorOfTheCheckbox(checkbox))
  }

  getListOfWebelementsOfTextForTimes(text: string) {
    return this.getSelectorFromTextForTimes(text).then(($elements) => {
      return Cypress.$($elements).toArray();
    });
  }

getListOfWebelementsFromText(text: string) {
  return cy.document().then(doc => {
    const elements = Array.from(
      doc.querySelectorAll('*')
    ).filter(el => el.textContent?.includes(text));

    return Cypress.$(elements);
  });
}

  getListOfRectangleRadioButtonsForTimes(text: string) {
    return this.getSelectorFromTextForTimes(text).then(($elements) => {
      return Cypress.$($elements).toArray();
    });
  }

  getWebelementOfRadioButtonPropertyHeader() {
    return this.getSelectorOfRadioButtonPropertyHeader()
  }

  getRadioButtonWebelement(radioButton: string) {
    return cy.xpath(this.getSelectorOfRadioButton(radioButton))
  }

  getWebelementFromTextInOrder(webelementText: string, position: string) {
    return this.getSelectorFromTextInOrder(webelementText, position)
  }

  getWebelementOfDropdownButton(buttonName: string) {
    return cy.xpath(this.getSelectorOfDropdownButton(buttonName))
  }

  getWebelementOfArticle(articleName: string) {
    return cy.xpath(this.getSelectorOfArticle(articleName))
  }

  getWebelementOfSubArticle(article: string, subArticle: string) {
    return cy.xpath(this.getSelectorOfSubArticle(article, subArticle))
  }

  getButton(buttonName: string) {
    return cy.xpath(this.getSelectorOfButton(buttonName))
  }

  getWebelementOfLink(textOfLink: string) {
    return cy.xpath(this.getSelectorOfLink(textOfLink))
  }

  getWebelementOfLinkAbove(textOfLink: string) {
    return cy.xpath(this.getSelectorOfLinkAbove(textOfLink))
  }
}



export default ProductPage;

