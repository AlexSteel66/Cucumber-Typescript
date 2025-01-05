import ProductPage from "../pages/ProductPage"
import ProductSteps from "../steps/ProductSteps"
import { FieldData } from './FieldData';

const productPage = new ProductPage()
const productSteps = new ProductSteps()
const fieldData = new FieldData();


it('Testing presence of basic links in Vienna Insurance website after entering a keyword', function () {


    cy.visitKpasURL();
    productSteps.doSearch("Kom")
    productSteps.getToVIG(productPage,fieldData.vigTitle,fieldData.acceptCookiesButton,"193");
    productSteps.iSeeHyperLink(fieldData.getHyperlink('glossary'));
    productSteps.iSeeHyperLink(fieldData.getHyperlink('companyBodies'));
    productSteps.iSeeHyperLink(fieldData.getHyperlink('annualReports'));
    productSteps.iSeeHyperLink(fieldData.getHyperlink('awards'));
    productSteps.iSeeHyperLink(fieldData.getHyperlink('partners'));
    productSteps.iSeeHyperLink(fieldData.getHyperlink('careerOpportunities'));

    productSteps.iSeeLink(fieldData.companyWebLink);
    productSteps.iClickOntoWebElementInOrder(fieldData.corporateResponsibilityElement, 2);

    productSteps.iSeeHyperLink(fieldData.getHyperlink('supportCities'));
    productSteps.iSeeHyperLink(fieldData.getHyperlink('youthFriendly'));
    productSteps.iSeeHyperLink(fieldData.getHyperlink('sustainableFinancing'));

    productSteps.iClickOntoWebElementInOrder(fieldData.mediaElement, 2);
    productSteps.iSeeHyperLink(fieldData.getHyperlink('corporateIdentity'));
    productSteps.iSeeHyperLink(fieldData.getHyperlink('mediaContact'));
    productSteps.iSeeHyperLink(fieldData.getHyperlink('insurance'));
    productSteps.iSeeHyperLink(fieldData.getHyperlink('claimsResolution'));
    productSteps.iSeeSimpleLink('/stranka/osobny-poistny-ucet-max');

})

it('Testing options inside the dropdown "Dospeli"', function () {
    cy.visitKpasURL();
    productSteps.getToVIG(productPage,fieldData.vigTitle,fieldData.acceptCookiesButton,"193");
    productSteps.iClickIntoSimpleLink(fieldData.getSimpleLink('personalInsuranceAccount'));
    productSteps.iSeeText("Opu Max");
    productSteps.iSeeDropdownButton(fieldData.getDropdownButton('children'));
    productSteps.iSeeDropdownButton(fieldData.getDropdownButton('adults'));
    productSteps.iSeeDropdownButton(fieldData.getDropdownButton('housing'));
    productSteps.iSeeDropdownButton(fieldData.getDropdownButton('citiesAndTowns'));
    productSteps.iClickOntoWebElementInOrder(fieldData.getDropdownButton('adults'), 2);
    productSteps.iSeeSimpleLink(fieldData.getSimpleLink('adultRiskInsurance'));
    productSteps.iSeeSimpleLink(fieldData.getSimpleLink('adultLifeInsurance'));
    productSteps.iSeeSimpleLink(fieldData.getSimpleLink('adultAccidentInsurance'));
    productSteps.iSeeSimpleLink(fieldData.getSimpleLink('adultFuneralInsurance'));
})


it('Testing options inside articles', function () {
    cy.visitKpasURL();
    productSteps.iSeeArticles(fieldData.getCategory('children'));
    productSteps.iSeeArticles(fieldData.getCategory('adults'));
    productSteps.iSeeArticles(fieldData.getCategory('housing'));
    productSteps.iSeeArticles(fieldData.getCategory('vehicles'));
    productSteps.iSeeArticles(fieldData.getCategory('travel'));
    productSteps.iSeeArticles(fieldData.getCategory('business'));
    productSteps.iSeeArticles(fieldData.getCategory('citiesAndTowns'));
    productSteps.iSeeArticles(fieldData.getCategory('liability'));

    productSteps.iSeeSubarticleUnderneathArticle(
        fieldData.getSubarticle('adults', 'riskInsurance'),
        fieldData.getCategory('adults')
    );
    productSteps.iSeeSubarticleUnderneathArticle(
        fieldData.getSubarticle('adults', 'investmentInsurance'),
        fieldData.getCategory('adults')
    );
    productSteps.iSeeSubarticleUnderneathArticle(
        fieldData.getSubarticle('adults', 'accidentInsurance'),
        fieldData.getCategory('adults')
    );
    productSteps.iSeeSubarticleUnderneathArticle(
        fieldData.getSubarticle('adults', 'funeralInsurance'),
        fieldData.getCategory('adults')
    );
    productSteps.iSeeSubarticleUnderneathArticle(
        fieldData.getSubarticle('children', 'comprehensiveInsurance'),
        fieldData.getCategory('children')
    );
    productSteps.iSeeSubarticleUnderneathArticle(
        fieldData.getSubarticle('housing', 'home'),
        fieldData.getCategory('housing')
    );
    productSteps.iSeeSubarticleUnderneathArticle(
        fieldData.getSubarticle('housing', 'household'),
        fieldData.getCategory('housing')
    );
    productSteps.iSeeSubarticleUnderneathArticle(
        fieldData.getSubarticle('housing', 'cottage'),
        fieldData.getCategory('housing')
    );
    productSteps.iSeeSubarticleUnderneathArticle(
        fieldData.getSubarticle('housing', 'garage'),
        fieldData.getCategory('housing')
    );

})

it('Testing functionality of variety of type-in fields', function () {
    cy.visitKpasURL();
    productSteps.iClickIntoInvisibleLink(fieldData.getElement('invisibleLink'));
    productSteps.iSeeWebelement(fieldData.getElement('closeInsurance'));
    productSteps.iSeeWebelement(fieldData.getElement('contract'));
    productSteps.iSeeWebelement(fieldData.getElement('moreInfo'));
    productSteps.iClickOntoWebElement(fieldData.getElement('moreInfo'));
    productSteps.iSeeRadioButton(fieldData.getElement('clientRadio'));
    productSteps.iSeeRadioButton(fieldData.getElement('nonClientRadio'));
    productSteps.iSeeRadioButton(fieldData.getElement('physicalPersonRadio'));
    productSteps.iSeeRadioButton(fieldData.getElement('companyRadio'));
    productSteps.iSeeField(fieldData.getElement('contractNumberField'));
    productSteps.iSeeField(fieldData.getElement('birthDateField'));
    productSteps.iSeeField(fieldData.getElement('firstNameField'));
    productSteps.iSeeField(fieldData.getElement('lastNameField'));
    productSteps.iSeeField(fieldData.getElement('emailField'));
    productSteps.iSeeField(fieldData.getElement('phoneField'));
    productSteps.iSeeField(fieldData.getElement('messageField'));

    productSteps.fieldHasValue(fieldData.getElement('contractNumberField'), fieldData.getFieldValue('contractNumber'));
    productSteps.fieldHasValue(fieldData.getElement('firstNameField'), fieldData.getFieldValue('firstName'));
    productSteps.fieldHasValue(fieldData.getElement('lastNameField'), fieldData.getFieldValue('lastName'));
    productSteps.fieldHasValue(fieldData.getElement('emailField'), fieldData.getFieldValue('email'));

    fieldData.setFieldValue('firstName', 'Alexander');
    fieldData.setFieldValue('email', 'a');
    productSteps.typeIntoField(fieldData.getElement('firstNameField'), fieldData.getFieldValue('firstName'));
    productSteps.typeIntoField(fieldData.getElement('emailField'), fieldData.getFieldValue('email'));
    productSteps.clickIntoField(fieldData.getElement('firstNameField'));
    productSteps.iSeeValidationMessageUnderneathField(fieldData.getElement('emailField'), fieldData.getMessage('invalidEmail'));
    productSteps.iSelectCheckbox(fieldData.getElement('acceptTermsCheckbox'));

})


it('Testing visibility and invisibility of fields', function () {
    cy.visitKpasURL();
    productSteps.iClickIntoInvisibleLink("zodpovednost/poistenie-zodpovednosti-za-skodu-sposobenu-primatormi-a-starostami")

    productSteps.iClickOntoWebElement(fieldData.getElement('moreInfo'))
    productSteps.iSeeRadioButton(fieldData.getElement("clientRadio"));
    productSteps.iSeeRadioButton(fieldData.getElement("nonClientRadio"));
    productSteps.iSeeRadioButton(fieldData.getElement("physicalPersonRadio"));
    productSteps.iSeeRadioButton(fieldData.getElement("companyRadio"));

    productSteps.iSeeField(fieldData.getElement("contractNumberField"));
    productSteps.iSeeField(fieldData.getElement("birthDateField"));
    productSteps.iSeeField(fieldData.getElement("firstNameField"));
    productSteps.iSeeField(fieldData.getElement("lastNameField"));
    productSteps.iSeeField(fieldData.getElement("emailField"));
    productSteps.iSeeField(fieldData.getElement("phoneField"));
    productSteps.iSeeField(fieldData.getElement("messageField"));

    productSteps.iSeeRadioButtonIsChecked(fieldData.getElement("clientRadio"));
    productSteps.iSeeRadioButtonIsChecked(fieldData.getElement("physicalPersonRadio"));
    productSteps.iSeeRadioButtonIsUnchecked(fieldData.getElement("nonClientRadio"));
    productSteps.iSeeRadioButtonIsUnchecked(fieldData.getElement("companyRadio"));

    productSteps.iSelectRadioButton(fieldData.getElement("nonClientRadio"));
    productSteps.iDontSeeRadioButton(fieldData.getElement("companyRadio"));
    productSteps.iDontSeeRadioButton(fieldData.getElement("physicalPersonRadio"));

    productSteps.iSeeField(fieldData.getElement("firstNameField"));
    productSteps.iSeeField(fieldData.getElement("lastNameField"));
    productSteps.iSeeField(fieldData.getElement("emailField"));
    productSteps.iSeeField(fieldData.getElement("phoneField"));
    productSteps.iDontSeeField(fieldData.getElement("birthDateField"));
    productSteps.iDontSeeField(fieldData.getElement("contractNumberField"));

    productSteps.iSelectRadioButton(fieldData.getElement("clientRadio"));
    productSteps.iSelectRadioButton(fieldData.getElement("companyRadio"));

    productSteps.iSeeRadioButtonIsChecked(fieldData.getElement("clientRadio"));
    productSteps.iSeeRadioButtonIsUnchecked(fieldData.getElement("nonClientRadio"));

    productSteps.iSeeField(fieldData.getElement("contractNumberField"));
    productSteps.iSeeField(fieldData.getElement("icoField"));
    productSteps.iSeeField(fieldData.getElement("messageField"));
    productSteps.iSeeField(fieldData.getElement("companyNameField"));
    productSteps.iSeeField(fieldData.getElement("representativeField"));
    productSteps.iSeeField(fieldData.getElement("emailField"));
    productSteps.iSeeField(fieldData.getElement("phoneField"));
    productSteps.iDontSeeField(fieldData.getElement("birthDateField"));

})


it('Testing visibility of hyperlinks', function () {
    const sectionLinks = new FieldData()
    cy.visitKpasURL();
    sectionLinks.getLinks("Insurance").forEach((link) => {
        productSteps.iSeeLinkUnderneathBlock("Poistenie", link);
    });

    sectionLinks.getLinks("Claims").forEach((link) => {
        productSteps.iSeeLinkUnderneathBlock("Riešenie škôd", link);
    });

    sectionLinks.getLinks("ImportantLinks").forEach((link) => {
        productSteps.iSeeLinkUnderneathBlock("Dôležité odkazy", link);
    });
    cy.verifyAllLinksInPageAreOk()
})


it('Testing visibility of pdf links', function () {
    cy.visitKpasURL();

    productSteps.iClickOntoHyperLink(fieldData.hyperLinks.insuranceTerms);
    fieldData.spanWebElements.forEach((spanText) => {
        productSteps.iSeeSpanWebelement(spanText);
    });

    productSteps.iClickOntoSpanWebElement("Životné poistenie");
    fieldData.lifeInsurancePdfs.forEach((pdf) => {
        productSteps.iSeePdf(pdf);
    });

    productSteps.iClickOntoSpanWebElement("Životné poistenie");
    fieldData.excludedLifeInsurancePdfs.forEach((excludedPdf) => {
        productSteps.iDontSeePdf(excludedPdf);
    });

    productSteps.iClickOntoSpanWebElement("Povinné zmluvné poistenie");
    fieldData.otherPdfs.pzp.forEach((pdf) => {
        productSteps.iSeeOtherPdf(pdf);
    });

    fieldData.otherPdfs.kasko.forEach((pdf) => {
        productSteps.iSeeOtherPdf(pdf);
    });
});


it('Testing basic functionality of property insurance', function () {
    cy.visitKpasURL();
    productSteps.iClickOntoWebElementInOrder(fieldData.getElement('onlinePoistenie'), 2)
    productSteps.iClickOntoWebElement(fieldData.getElement('poistenieMajetku'))
    productSteps.iClickOntoWebElement(fieldData.getElement('byt'))

    productSteps.iClickOntoWebElement(fieldData.getElement('pokracovat'))
    productSteps.iSeeTextForTimes(fieldData.getElement('povedzteNamViac'), 2)

    productSteps.iSeeRadioButtonBlock(fieldData.getFormQuestion("radioButtonQuestions")[0]);
    productSteps.iSeeRadioButtonBlock(fieldData.getFormQuestion("radioButtonQuestions")[1]);
    productSteps.iSeeRadioButtonBlock(fieldData.getFormQuestion("radioButtonQuestions")[2]);
    productSteps.iSeeRadioButtonBlock(fieldData.getFormQuestion("radioButtonQuestions")[3]);

    productSteps.iSeeRectangleRadioButtonForTimes(fieldData.getFormQuestion("rectangleRadioButtonYesNo")[0], 3);
    productSteps.iSeeRectangleRadiobuttonInOrderIsSelected(fieldData.getFormQuestion("rectangleRadioButtonYesNo")[0], 1, false);
    productSteps.iSeeRectangleRadiobuttonInOrderIsSelected(fieldData.getFormQuestion("rectangleRadioButtonYesNo")[1], 1, false);
    productSteps.iSeeRectangleRadiobuttonInOrderIsSelected(fieldData.getFormQuestion("rectangleRadioButtonYesNo")[0], 2, false);
    productSteps.iSeeRectangleRadiobuttonInOrderIsSelected(fieldData.getFormQuestion("rectangleRadioButtonYesNo")[1], 2, false);
    productSteps.iSeeRectangleRadiobuttonInOrderIsSelected(fieldData.getFormQuestion("rectangleRadioButtonYesNo")[0], 3, false);
    productSteps.iSeeRectangleRadiobuttonInOrderIsSelected(fieldData.getFormQuestion("rectangleRadioButtonYesNo")[1], 3, false);

    productSteps.iSeeSimpleRadioButton(fieldData.getFormQuestion("simpleRadioButtonOptions")[0]);
    productSteps.iSeeSimpleRadioButton(fieldData.getFormQuestion("simpleRadioButtonOptions")[1]);

    productSteps.iSeeSimpleRadioButtonIsSelected(fieldData.getFormQuestion("simpleRadioButtonOptions")[0], false);
    productSteps.iSeeSimpleRadioButtonIsSelected(fieldData.getFormQuestion("simpleRadioButtonOptions")[1], false);
    productSteps.iSelectRectangleRadiobuttonInOrder(fieldData.getFormQuestion("rectangleRadioButtonYesNo")[1], 1);

    productSteps.iSeeRectangleRadiobuttonInOrderIsSelected(fieldData.getFormQuestion("rectangleRadioButtonYesNo")[1], 1, true);
    productSteps.iDontSeeRectangleRadiobuttonInOrder(fieldData.getFormQuestion("rectangleRadioButtonYesNo")[0], 2);
    productSteps.iDontSeeRectangleRadiobuttonInOrder(fieldData.getFormQuestion("rectangleRadioButtonYesNo")[1], 2);
    productSteps.iDontSeeRectangleRadiobuttonInOrder(fieldData.getFormQuestion("rectangleRadioButtonYesNo")[0], 3);
    productSteps.iDontSeeRectangleRadiobuttonInOrder(fieldData.getFormQuestion("rectangleRadioButtonYesNo")[1], 3);

    // productSteps.iSeeText(fieldData.getFormQuestion("errorMessage")[0]);
    productSteps.iSelectRectangleRadiobuttonInOrder(fieldData.getFormQuestion("rectangleRadioButtonYesNo")[0], 1);
    productSteps.iSeeSimpleRadioButton(fieldData.getFormQuestion("simpleRadioButtonOptions")[0]);
    productSteps.iSeeSimpleRadioButton(fieldData.getFormQuestion("simpleRadioButtonOptions")[1]);
    productSteps.iSeeSimpleRadioButtonIsSelected(fieldData.getFormQuestion("simpleRadioButtonOptions")[0], false);
    productSteps.iSeeSimpleRadioButtonIsSelected(fieldData.getFormQuestion("simpleRadioButtonOptions")[1], false);
    productSteps.iSelectSimpleRadioButton(fieldData.getFormQuestion("simpleRadioButtonOptions")[1]);
    productSteps.iSeeSimpleRadioButtonIsSelected(fieldData.getFormQuestion("simpleRadioButtonOptions")[1], true);
})


it('Testing basic functionality of property insurance', function () {
    cy.visitKpasURL();
    productSteps.iClickOntoWebElement(fieldData.getElement("onlinePoistenie"));
    productSteps.iClickOntoWebElement(fieldData.getElement("poistenieMajetku"));
    productSteps.iClickOntoWebElement(fieldData.getElement("byt"));
    productSteps.iClickOntoWebElement(fieldData.getElement("pokracovat"));
    productSteps.iSeeTextForTimes(fieldData.getElement("povedzteNamViac"), 2);
    productSteps.iSeeRadioButtonBlock(fieldData.getFormQuestion("radioButtonQuestions")[0]);
    productSteps.iSeeRadioButtonBlock(fieldData.getFormQuestion("radioButtonQuestions")[1]);
    productSteps.iSeeRadioButtonBlock(fieldData.getFormQuestion("radioButtonQuestions")[2]);
    productSteps.iSeeRadioButtonBlock(fieldData.getFormQuestion("radioButtonQuestions")[3]);

    productSteps.iSeeRectangleRadioButtonForTimes(fieldData.getFormQuestion("rectangleRadioButtonYesNo")[0], 3);
    productSteps.iSeeRectangleRadiobuttonInOrderIsSelected(fieldData.getFormQuestion("rectangleRadioButtonYesNo")[0], 1, false);
    productSteps.iSeeRectangleRadiobuttonInOrderIsSelected(fieldData.getFormQuestion("rectangleRadioButtonYesNo")[1], 1, false);
    productSteps.iSeeRectangleRadiobuttonInOrderIsSelected(fieldData.getFormQuestion("rectangleRadioButtonYesNo")[0], 2, false);
    productSteps.iSeeRectangleRadiobuttonInOrderIsSelected(fieldData.getFormQuestion("rectangleRadioButtonYesNo")[1], 2, false);
    productSteps.iSeeRectangleRadiobuttonInOrderIsSelected(fieldData.getFormQuestion("rectangleRadioButtonYesNo")[0], 3, false);
    productSteps.iSeeRectangleRadiobuttonInOrderIsSelected(fieldData.getFormQuestion("rectangleRadioButtonYesNo")[1], 3, false);

    productSteps.iSeeSimpleRadioButton(fieldData.getFormQuestion("simpleRadioButtonOptions")[0]);
    productSteps.iSeeSimpleRadioButton(fieldData.getFormQuestion("simpleRadioButtonOptions")[1]);
    productSteps.iSeeSimpleRadioButtonIsSelected(fieldData.getFormQuestion("simpleRadioButtonOptions")[0], false);
    productSteps.iSeeSimpleRadioButtonIsSelected(fieldData.getFormQuestion("simpleRadioButtonOptions")[1], false);
    productSteps.iSelectRectangleRadiobuttonInOrder(fieldData.getFormQuestion("rectangleRadioButtonYesNo")[1], 1);
    productSteps.iSeeRectangleRadiobuttonInOrderIsSelected(fieldData.getFormQuestion("rectangleRadioButtonYesNo")[1], 1, true);
    productSteps.iDontSeeRectangleRadiobuttonInOrder(fieldData.getFormQuestion("rectangleRadioButtonYesNo")[0], 2);
    productSteps.iDontSeeRectangleRadiobuttonInOrder(fieldData.getFormQuestion("rectangleRadioButtonYesNo")[1], 2);
    productSteps.iDontSeeRectangleRadiobuttonInOrder(fieldData.getFormQuestion("rectangleRadioButtonYesNo")[0], 3);
    productSteps.iDontSeeRectangleRadiobuttonInOrder(fieldData.getFormQuestion("rectangleRadioButtonYesNo")[1], 3);
    productSteps.iSeeText("Bohužiaľ, vašu nehnuteľnosť nie je možné poistiť online. Môžeme kontakt na Vás poskytnúť nášmu zástupcovi, ktorý Vás bude kontaktovať s individuálnou ponukou?");
    productSteps.iSelectRectangleRadiobuttonInOrder(fieldData.getFormQuestion("rectangleRadioButtonYesNo")[0], 1);
    productSteps.iSeeSimpleRadioButton(fieldData.getFormQuestion("simpleRadioButtonOptions")[0]);
    productSteps.iSeeSimpleRadioButton(fieldData.getFormQuestion("simpleRadioButtonOptions")[1]);
    productSteps.iSeeSimpleRadioButtonIsSelected(fieldData.getFormQuestion("simpleRadioButtonOptions")[0], false);
    productSteps.iSeeSimpleRadioButtonIsSelected(fieldData.getFormQuestion("simpleRadioButtonOptions")[1], false);
    productSteps.iSelectSimpleRadioButton(fieldData.getFormQuestion("simpleRadioButtonOptions")[1]);
    productSteps.iSeeSimpleRadioButtonIsSelected(fieldData.getFormQuestion("simpleRadioButtonOptions")[1], true);
})

it('Testing basic functionality of insurance event- validations', function () {
    cy.visitKpasURL();
    productSteps.iClickOntoWebElementInOrder(fieldData.getElement("callUs"), 2);
    productSteps.iClickOntoWebElementInOrderAndOpenLink(fieldData.getElement("online"), 6);
    productSteps.iClickOntoWebElement(fieldData.getElement("citizenProperty"));
    productSteps.iSeeTheCheckbox(fieldData.checkBox);
    productSteps.iSelectTheCheckbox(fieldData.checkBox);
    
    productSteps.iSeeTheFieldBasedOnIndex(fieldData.fieldNameFirstName, 1);
    productSteps.iSeeTheFieldBasedOnIndex(fieldData.fieldNameLastName, 1);
    productSteps.iSeeTheFieldBasedOnIndex(fieldData.fieldNamePhone, 1);
    productSteps.iSeeTheFieldBasedOnIndex(fieldData.fieldNameEmail, 1);
    
    productSteps.iDeselectTheCheckbox(fieldData.checkBox);
    productSteps.iDontSeeTheFieldBasedOnIndex(fieldData.fieldNameFirstName, 1);
    productSteps.iDontSeeTheFieldBasedOnIndex(fieldData.fieldNameLastName, 1);
    productSteps.iDontSeeTheFieldBasedOnIndex(fieldData.fieldNamePhone, 1);
    productSteps.iDontSeeTheFieldBasedOnIndex(fieldData.fieldNameEmail, 1);
    
    productSteps.iSeeTheFieldBasedOnIndex(fieldData.fieldNameFirstName, 2);
    productSteps.iSeeTheFieldBasedOnIndex(fieldData.fieldNameLastName, 2);
    productSteps.iSeeTheFieldBasedOnIndex(fieldData.fieldNamePersonalId, 1);
    productSteps.iSeeTheFieldBasedOnIndex(fieldData.fieldNamePhone, 2);
    productSteps.iSeeTheFieldBasedOnIndex(fieldData.fieldNameEmail, 2);
    productSteps.iSeeTheFieldBasedOnIndex(fieldData.fieldNameStreet, 1);
    productSteps.iSeeTheFieldBasedOnIndex(fieldData.fieldNameHouseNumber, 1);
    
    productSteps.iSeeTheFieldBasedOnIndex(fieldData.fieldNameZipCode, 1);
    productSteps.iSeeTheFieldBasedOnIndex(fieldData.fieldNameCity, 1);
    productSteps.iSeeTheFieldBasedOnIndex(fieldData.fieldNameCountry, 1);
    productSteps.iSeeTheFieldBasedOnIndex(fieldData.fieldNameInsuranceNumber, 1);
    

    productSteps.fieldWithIndexHasValue(fieldData.fieldNameFirstName, 2, fieldData.getValue(fieldData.fieldNameFirstName)[0]);
    productSteps.fieldWithIndexHasValue(fieldData.fieldNameLastName, 2, fieldData.getValue(fieldData.fieldNameLastName)[0]);
    productSteps.fieldWithIndexHasValue(fieldData.fieldNamePersonalId, 1, fieldData.getValue(fieldData.fieldNamePersonalId)[0]);
    productSteps.fieldWithIndexHasValue(fieldData.fieldNamePhone, 2, fieldData.getValue(fieldData.fieldNamePhone)[0]);
    productSteps.fieldWithIndexHasValue(fieldData.fieldNameEmail, 2, fieldData.getValue(fieldData.fieldNameEmail)[0]);
    productSteps.fieldWithIndexHasValue(fieldData.fieldNameStreet, 1, fieldData.getValue(fieldData.fieldNameStreet)[0]);
    productSteps.fieldWithIndexHasValue(fieldData.fieldNameHouseNumber, 1, fieldData.getValue(fieldData.fieldNameHouseNumber)[0]);

    productSteps.fieldWithIndexHasValue(fieldData.fieldNameCountry, 1, fieldData.getValue(fieldData.fieldNameCountry)[2]);
    productSteps.fieldWithIndexHasValue(fieldData.fieldNameInsuranceNumber, 1, fieldData.getValue(fieldData.fieldNameInsuranceNumber)[0]);
    
    productSteps.typeIntoFieldWithIndex(fieldData.fieldNameFirstName, fieldData.getValue(fieldData.fieldNameFirstName)[1], 2);
    productSteps.iClickAwayFromField();
    productSteps.iSeeTextWithIndex(fieldData.getMessage("invalidName"), 2);
    productSteps.typeIntoFieldWithIndex(fieldData.fieldNameFirstName, fieldData.getValue(fieldData.fieldNameFirstName)[2], 2);
    productSteps.fieldWithIndexHasValue(fieldData.fieldNameFirstName, 2, fieldData.getValue(fieldData.fieldNameFirstName)[2]);
    productSteps.iClickAwayFromField();
    productSteps.iDontSeeTextWithIndex(fieldData.getMessage("invalidName"), 2);
    
    productSteps.typeIntoFieldWithIndex(fieldData.fieldNameLastName, fieldData.getValue(fieldData.fieldNameLastName)[1], 2);
    productSteps.iClickAwayFromField();
    productSteps.iSeeTextWithIndex(fieldData.getMessage("invalidSurname"), 2);
    productSteps.typeIntoFieldWithIndex(fieldData.fieldNameLastName, fieldData.getValue(fieldData.fieldNameLastName)[2], 2);
    productSteps.fieldWithIndexHasValue(fieldData.fieldNameLastName, 2, fieldData.getValue(fieldData.fieldNameLastName)[2]);
    productSteps.iClickAwayFromField();
    productSteps.iDontSeeTextWithIndex(fieldData.getMessage("invalidSurname"), 2);
    
    productSteps.typeIntoFieldWithIndex(fieldData.fieldNamePersonalId, fieldData.getValue(fieldData.fieldNamePersonalId)[1], 1);
    productSteps.iClickAwayFromField();
    productSteps.iSeeText(fieldData.getMessage("invalidIDNumber"));
    productSteps.typeIntoFieldWithIndex(fieldData.fieldNamePersonalId, fieldData.getValue(fieldData.fieldNamePersonalId)[2], 1);
    productSteps.iClickAwayFromField();
    productSteps.iSeeText(fieldData.getMessage("invalidIDNumber"));
    productSteps.typeIntoFieldWithIndex(fieldData.fieldNamePersonalId, fieldData.getValue(fieldData.fieldNamePersonalId)[3], 1);
    productSteps.iClickAwayFromField();
    productSteps.iDontSeeText(fieldData.getMessage("invalidIDNumber"));
    
    productSteps.typeIntoFieldWithIndex(fieldData.fieldNamePhone, fieldData.getValue(fieldData.fieldNamePhone)[1], 2);
    productSteps.iClickAwayFromField();
    productSteps.iSeeTextWithIndex(fieldData.getMessage("invalidPhoneNumber"), 2);
    productSteps.typeIntoFieldWithIndex(fieldData.fieldNamePhone, fieldData.getValue(fieldData.fieldNamePhone)[2], 2);
    productSteps.iClickAwayFromField();
    productSteps.iSeeTextWithIndex(fieldData.getMessage("invalidPhoneNumber"), 2);
    productSteps.typeIntoFieldWithIndex(fieldData.fieldNamePhone, fieldData.getValue(fieldData.fieldNamePhone)[3], 2);
    productSteps.iClickAwayFromField();
    productSteps.iSeeTextWithIndex(fieldData.getMessage("invalidPhoneNumber"), 2);
    productSteps.typeIntoFieldWithIndex(fieldData.fieldNamePhone, fieldData.getValue(fieldData.fieldNamePhone)[4], 2);
    productSteps.iClickAwayFromField();
    productSteps.iSeeTextWithIndex(fieldData.getMessage("invalidPhoneNumber"), 2);
    productSteps.typeIntoFieldWithIndex(fieldData.fieldNamePhone, fieldData.getValue(fieldData.fieldNamePhone)[5], 2);
    productSteps.iClickAwayFromField();
    productSteps.iDontSeeTextWithIndex(fieldData.getMessage("invalidPhoneNumber"), 2);
    
    productSteps.typeIntoFieldWithIndex(fieldData.fieldNameEmail, fieldData.getValue(fieldData.fieldNameEmail)[1], 2);
    productSteps.iClickAwayFromField();
    productSteps.iSeeTextWithIndex(fieldData.getMessage("invalidEmail"), 2);
    productSteps.typeIntoFieldWithIndex(fieldData.fieldNameEmail, fieldData.getValue(fieldData.fieldNameEmail)[2], 2);
    productSteps.iClickAwayFromField();
    productSteps.iSeeTextWithIndex(fieldData.getMessage("invalidEmail"), 2);
    productSteps.typeIntoFieldWithIndex(fieldData.fieldNameEmail, fieldData.getValue(fieldData.fieldNameEmail)[3], 2);
    productSteps.iClickAwayFromField();
    productSteps.iSeeTextWithIndex(fieldData.getMessage("invalidEmail"), 2);
    productSteps.typeIntoFieldWithIndex(fieldData.fieldNameEmail, fieldData.getValue(fieldData.fieldNameEmail)[4], 2);
    productSteps.iClickAwayFromField();
    productSteps.iSeeTextWithIndex(fieldData.getMessage("invalidEmail"), 2);
    productSteps.typeIntoFieldWithIndex(fieldData.fieldNameEmail, fieldData.getValue(fieldData.fieldNameEmail)[5], 2);
    productSteps.iClickAwayFromField();
    productSteps.iDontSeeTextWithIndex(fieldData.getMessage("invalidEmail"), 2);
    
    productSteps.typeIntoFieldWithIndex(fieldData.fieldNameStreet, fieldData.getValue(fieldData.fieldNameStreet)[2], 1);
    productSteps.typeIntoFieldWithIndex(fieldData.fieldNameHouseNumber, fieldData.getValue(fieldData.fieldNameHouseNumber)[2], 1);
    productSteps.typeIntoFieldWithIndex(fieldData.fieldNameCity, fieldData.getValue(fieldData.fieldNameCity)[2], 1);
    
    productSteps.typeIntoFieldWithIndex(fieldData.fieldNameZipCode, fieldData.getValue(fieldData.fieldNameZipCode)[1], 1);
    productSteps.iClickAwayFromField();
    productSteps.iSeeText(fieldData.getMessage("invalidZipCode"));
    productSteps.typeIntoFieldWithIndex(fieldData.fieldNameZipCode, fieldData.getValue(fieldData.fieldNameZipCode)[2], 1);
    productSteps.iClickAwayFromField();
    productSteps.iSeeText(fieldData.getMessage("invalidZipCode"));
    productSteps.typeIntoFieldWithIndex(fieldData.fieldNameZipCode, fieldData.getValue(fieldData.fieldNameZipCode)[3], 1);
    productSteps.iClickAwayFromField();
    productSteps.iSeeText(fieldData.getMessage("invalidZipCode"));
    productSteps.typeIntoFieldWithIndex(fieldData.fieldNameZipCode, fieldData.getValue(fieldData.fieldNameZipCode)[4], 1);
    productSteps.iClickAwayFromField();
    productSteps.iDontSeeText(fieldData.getMessage("invalidZipCode"));
    
    productSteps.typeIntoFieldWithIndex(fieldData.fieldNameInsuranceNumber, fieldData.getValue(fieldData.fieldNameInsuranceNumber)[1], 1);
    productSteps.iClickAwayFromField();
    productSteps.iSeeText(fieldData.getMessage("invalidInsuranceNumber"));
    productSteps.typeIntoFieldWithIndex(fieldData.fieldNameInsuranceNumber, fieldData.getValue(fieldData.fieldNameInsuranceNumber)[2], 1);
    productSteps.iClickAwayFromField();
    productSteps.iSeeText(fieldData.getMessage("invalidInsuranceNumber"));
    productSteps.typeIntoFieldWithIndex(fieldData.fieldNameInsuranceNumber, fieldData.getValue(fieldData.fieldNameInsuranceNumber)[3], 1);
    productSteps.iClickAwayFromField();
    productSteps.iSeeText(fieldData.getMessage("invalidInsuranceNumber"));
    productSteps.typeIntoFieldWithIndex(fieldData.fieldNameInsuranceNumber, fieldData.getValue(fieldData.fieldNameInsuranceNumber)[4], 1);
    productSteps.iClickAwayFromField();
    productSteps.iSeeText(fieldData.getMessage("invalidInsuranceNumber"));
})


it.only('Testing basic functionality of insurance event- part 2', function () {
    productSteps.iProceedToTheSection("event")
    productSteps.iSeeTheFieldBasedOnIndex(fieldData.fieldNameDate, 1)
    productSteps.iSeeTheFieldBasedOnIndex(fieldData.fieldNameTime, 1)
    productSteps.iSeeTheFieldBasedOnIndex(fieldData.fieldNameStreet, 1)
    productSteps.iSeeTheFieldBasedOnIndex(fieldData.fieldNameHouseNumber, 1)
    productSteps.iSeeTheFieldBasedOnIndex(fieldData.fieldNameZipCode, 1)
    productSteps.iSeeTheFieldBasedOnIndex(fieldData.fieldNameCity, 1)
    productSteps.iSeeTheFieldBasedOnIndex(fieldData.fieldNameCountry, 1)
    productSteps.iSeeTheFieldBasedOnIndex(fieldData.fieldNameGPS, 1)
    productSteps.dropdownHasValue(fieldData.dropdownNameCauseOfHarm, fieldData.causeOfHarmOptions[0]);
    productSteps.testDropdownOptions(fieldData.dropdownNameCauseOfHarm, fieldData.causeOfHarmOptions);
    productSteps.testDropdownDoesNotContainOptions(fieldData.dropdownNameCauseOfHarm, fieldData.causeOfHarmNotOptions);
    productSteps.selectOptionFromDropdown(fieldData.dropdownNameCauseOfHarm, fieldData.causeOfHarmOptions[5]);

})



