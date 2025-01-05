import 'cypress-xpath';

class ProductPage {

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



  getField(fieldName: string) {
    return cy.xpath("//input//preceding::label[contains(text(),'" + fieldName + "')]")
  }

  getSelectorOfFieldInputBasedOnIndex(fieldName: string, index: number): string {
    return `(//*[contains(text(),'${fieldName}')]//parent::*//input)[position()=${index}]`;
}


  getSelectorOfFieldInput(fieldName: string) {
    return `//label[contains(text(),'${fieldName}')]/following::input[1]`
  }

  getSelectorOfValidationMessageOfField(fieldName: string) {
    return "//label[contains(text(),'" + fieldName + "')]//parent::div//following::span//span[1]"
  }

  getSelectorForSimpleRadioButton(radioButton: string) {
    return "//*[contains(text(),'"+radioButton+"')]//ancestor::*[@class='radio']//i"
  }

  getSelectorOfRadioButton() {
    return "//input[@type='radio']//ancestor::label"
  }

  getSelectorOfRectangleRadioButton(radioButon: string, position: number) {
    return "(//*[contains(@class, 'radio-group-options')]//*[contains(text(),'"+radioButon+"')])[position()=" + position + "]"
  }

  getSelectorOfRadioButtonPropertyHeader() {
    return "//*[contains(@class, 'label')]//parent::*[contains(@class, 'radio-group')]"
  }


  getSelectorOfRadioButtonUnderTextBlock() {
    return "//input[@type='radio']//ancestor::label"
  }

  getSelectorFromTextForTimes(webelementText: string) {
    return "//*[contains(text(),'" + webelementText + "')]"
  }

  getSelectorOfDropdown(dropdownName: string) {
    return "//*[contains(text(),'" + dropdownName + "')]//parent::div//select"
  }

  getSelectorForRectangleRadioButttons(text: string) {
    return "//*[contains(text(),'"+text+"')]//ancestor::*[contains(@class, 'radio-group-options')]"
  }

  getSelectorFromText(webelementText: string) {
    return "(//*[contains(text(),'" + webelementText + "')])[position()=1]"
  }

  getSelectorFromTextInOrder(webelementText: string, position: number) {
    return "(//*[contains(text(),'" + webelementText + "')])[position()="+position+"]"
  }

  getSpanSelectorFromText(webelementText: string) {
    return "(//span[contains(text(),'" + webelementText + "')])[position()=1]//ancestor::a"
  }

  getSelectorOfButton(buttonName: string) {
    return "(//*[contains(text(),'" + buttonName + "')]//ancestor::button)[position()=1]"
  }

  getSelectorOfDropdownButton(buttonName: string) {
    return "//*[contains(text(),'" + buttonName + "')]//ancestor::*[contains(@role, 'button')]"
  }

  getSelectorOfArticle(articleName: string) {
    return "(//*[contains(text(),'" + articleName + "')]//ancestor::article[contains(@class, 'bottom-skew')])[position()=2]"
  }

  getSelectorOfSubArticle(article: string, subArticle: string) {
    return "(//*[contains(text(),'" + article + "')]//ancestor::article[contains(@class, 'bottom-skew')])[position()=2]//ul//a[contains(text(),'" + subArticle + "')]"
  }

  getSelectorOfLink(textOfLink: string) {
    return "(//*[contains(@href, '" + textOfLink + "')])[position()=1]"
  }

  getSelectorOfLinkUnderneathBlock(block: string, textOfLink: string) {
    return "//h3[contains(text(),'"+block+"')]//parent::div//*[contains(text(),'"+textOfLink+"')]"
  }


  getSelectorOfCheckbox(checkbox: string) {
    return "(//*[@type='checkbox']//following::input[@name='"+checkbox+"'])[position()=1]"
  }

  getSelectorOfTheCheckbox(checkbox: string) {
    return "//*[contains(text(),'"+checkbox+"')]//preceding-sibling::input"
  }

  getDropdownWebelement(dropdownName: string) {
    return cy.xpath(this.getSelectorOfDropdown(dropdownName))
  }

  getTheFieldInputBasedOnIndex(fieldName: string, index: number) {
    return cy.xpath(this.getSelectorOfFieldInputBasedOnIndex(fieldName, index))
  }

  getSimpleRadioButton(radioButton: string) {
    return cy.xpath(this.getSelectorForSimpleRadioButton(radioButton))
  }
  
  getRectangleRadioButtonInPosition(radioButton: string, position : number) {
    return cy.xpath(this.getSelectorOfRectangleRadioButton(radioButton, position))
  }


  getWebelementOfLinkUnderneathBlock(block: string, link : string) {
    return cy.xpath(this.getSelectorOfLinkUnderneathBlock(block, link))
  }

  getWebelementOfCheckbox(checkbox: string) {
    return cy.xpath(this.getSelectorOfCheckbox(checkbox))
  }

  getWebelementOfTheCheckbox(checkbox: string) {
    return cy.xpath(this.getSelectorOfTheCheckbox(checkbox))
  }

  getListOfWebelementsOfTextForTimes(text: string) {
    return cy.xpath(this.getSelectorFromTextForTimes(text)).then(($elements) => {
      return $elements.toArray(); 
    });
  }

  getListOfRectangleRadioButtonsForTimes(text: string) {
    return cy.xpath(this.getSelectorFromTextForTimes(text)).then(($elements) => {
      return $elements.toArray(); 
    });
  }

  getWebelementOfRadioButtonPropertyHeader() {
    return cy.xpath(this.getSelectorOfRadioButtonPropertyHeader()
    );
  }

  getRadioButtonWebelement() {
    return cy.xpath(this.getSelectorOfRadioButton())
  }

  getWebelementOfFieldInput(fieldName: string) {
    return cy.xpath(this.getSelectorOfFieldInput(fieldName))
  }

  getSpanWebelementFromText(webelementText: string) {
    return cy.xpath(this.getSpanSelectorFromText(webelementText))
  }

  getWebelementFromText(webelementText: string) {
    return cy.xpath(this.getSelectorFromText(webelementText))
  }

  getWebelementFromTextInOrder(webelementText: string, position: number) {
    return cy.xpath(this.getSelectorFromTextInOrder(webelementText, position))
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
}

export default ProductPage;
