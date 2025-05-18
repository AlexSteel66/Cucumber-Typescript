Feature: Some basic features

  @Regression 
  Scenario: Basic verification of links inside the main page and additonal verification of all hyperlinks

    Given I visit the main website
    And I wait for 1000 milliseconds
    Then I click onto the button "Odmietnuť všetky"

    Then I see hyperlink for webelements
      | Kontakty                                  |
      | Asistenčné služby                         |
      | Pobočky KOOPERATIVA                       |
      | Stav mojej škody                          |
      | Postup pri poistnej udalosti              |
      | Dôležité dokumenty                        |
      | Online platba poistného                   |
      | Prihlásenie do klientskej zóny            |
      | Asistenčné služby                         |
      | Prvá appka na hlásenie poistných udalostí |
      | Elektronická karta PZP (zelená karta)     |

    And I don´t see these texts
      | Zimný denník jedného auta: Môj náročný týždeň na cestách                    |
      | Pokojné Vianoce začínajú doma. Chráňte to, na čom najviac záleží            |
      | Menej papiera, viac zelene: Prečo sa oplatí prejsť na digitálnu komunikáciu |

    Then Inside the block "Auto" I see hyperlinks
      | Auto                            |
      | Povinné zmluvné poistenie (PZP) |
      | Auto komplet                    |
      | MINI KASKO                      |
      | AutoMat                         |
      | GAP                             |

    And Inside the block "Život" I see hyperlinks
      | Život              |
      | Profi invest       |
      | Moja investícia    |
      | Bezstarostný život |
      | Nádej              |
      | Variant Kapitál    |
      | Dukátik            |
      | Skoré uzdravenie   |
      | Silencium          |
      | Vodič plus         |
      | Úrazové poistenie  |
      | Pripoistenia       |

    And Inside the block "Majetok" I see hyperlinks
      | Majetok            |
      | Bezstarostný domov |

    And Inside the block "Zodpovednosť" I see hyperlinks
      | Zodpovednosť                                                          |
      | Zodpovednosť za škodu spôsobenú zamestnávateľovi pri výkone povolania |

    And Inside the block "Cestovanie" I see hyperlinks
      | Cestovanie                                     |
      | MARCO POLO                                     |
      | Objavuj Slovensko                              |
      | Cestovné kancelárie poistené pre prípad úpadku |

    And Inside the block "Firmy a živnostníci" I see hyperlinks
      | Firmy a živnostníci                  |
      | Biznis MAX                           |
      | Podnikateľ                           |
      | Poistenie profesijných zodpovedností |
      | Enviro max                           |

    And Inside the block "Asistenčné služby" I see hyperlinks
      | Asistenčné služby |

    And Inside the block "Bankopoistenie" I see hyperlinks
      | Bankopoistenie |

    And Inside the block "Rýchle linky" with highlighted header I see hyperlinks
      | Kontakty             |
      | Pobočky a servisy    |
      | Kariéra              |
      | Často kladené otázky |
      | Fondy                |
      | Klientsky portál     |
      | Investičná stratégia |

    And Inside the block "Dôležité odkazy" with highlighted header I see hyperlinks
      | Dokumenty                      |
      | Ochrana osobných údajov        |
      | Informácie o používaní cookies |
      | Postup podávania sťažností     |
      | Partneri                       |
      | Whisteblowing                  |
      | Konflikt záujmov               |

    And Verify all links are OK

  @Regression
  Scenario: Testing basic verification of fields inside request for the information form
    Given I visit the main website
    When I click onto webelement "Kontakty"
    And I click onto the button "Odmietnuť všetky"

    Then I wait for 3500 milliseconds
    And I click onto the button "Cestovanie"
    And I click onto the button "Žiadosti"
    And I click onto the button "Žiadosť o zmenu v poistnej zmluve"
    Then I see the following fields
      | Meno                                        |
      | Číslo poistnej zmluvy / Číslo návrhu zmluvy |
      | Dátum narodenia                             |
      | Priezvisko                                  |
      | Email                                       |
      | Telefón                                     |
      | Správa                                      |

    Then I do not see the following fields
      | IČO               |
      | Názov spoločnosti |
      | Zastupujúca osoba |

    And I see the text area "Správa"

    Then I select the radiobutton "Spoločnosť"

    Then I see the following fields
      | IČO                                         |
      | Číslo poistnej zmluvy / Číslo návrhu zmluvy |
      | Názov spoločnosti                           |
      | Zastupujúca osoba                           |
      | Email                                       |
      | Telefón                                     |
      | Správa                                      |

    Then I do not see the following fields
      | Meno            |
      | Dátum narodenia |
      | Priezvisko      |

    But I see the text area "Správa"
    Then I select the radiobutton "Fyzická osoba"
    When I type "Alex" into the field "Meno"
    Then field "Meno" has value "Alex"
    When I type " " into the field "Meno"
    Then I see validation message "Meno je povinný údaj"
    When I type "Alex" into the field "Meno"
    Then I do not see validation message "Meno je povinný údaj"

    When I type "Gregor" into the field "Priezvisko"
    Then field "Priezvisko" has value "Gregor"
    When I type " " into the field "Priezvisko"
    Then I see validation message "Priezvisko je povinný údaj"
    And I type "Gregor" into the field "Priezvisko"
    Then I do not see validation message "Priezvisko je povinný údaj"


    When I type "1234567" into the field "Číslo poistnej zmluvy / Číslo návrhu zmluvy"
    Then I see validation message "Číslo zmluvy musí mať 8 alebo 10 číslic"

    When I type "123456789" into the field "Číslo poistnej zmluvy / Číslo návrhu zmluvy"
    Then I see validation message "Číslo zmluvy musí mať 8 alebo 10 číslic"

    When I type "abcdefgh" into the field "Číslo poistnej zmluvy / Číslo návrhu zmluvy"
    Then I see validation message "Číslo zmluvy musí mať 8 alebo 10 číslic"

    When I type "12345678" into the field "Číslo poistnej zmluvy / Číslo návrhu zmluvy"
    Then field "Číslo poistnej zmluvy / Číslo návrhu zmluvy" has value "12345678"
    Then I do not see validation message "Číslo zmluvy musí mať 8 alebo 10 číslic"

    When I type "1234567890" into the field "Číslo poistnej zmluvy / Číslo návrhu zmluvy"
    Then field "Číslo poistnej zmluvy / Číslo návrhu zmluvy" has value "1234567890"
    Then I do not see validation message "Číslo zmluvy musí mať 8 alebo 10 číslic"

    When I type "" into the field "Číslo poistnej zmluvy / Číslo návrhu zmluvy"
    Then I see validation message "Číslo zmluvy musí mať 8 alebo 10 číslic"

    When I type "test" into the field "Email"
    Then I see validation message "Prosím, zadajte platnú emailovú adresu"

    When I type "test@" into the field "Email"
    Then I see validation message "Prosím, zadajte platnú emailovú adresu"

    When I type "test@gmail" into the field "Email"
    Then I see validation message "Prosím, zadajte platnú emailovú adresu"

    When I type "test@gmail." into the field "Email"
    Then I see validation message "Prosím, zadajte platnú emailovú adresu"

    When I type "" into the field "Email"
    Then I see validation message "Prosím, zadajte platnú emailovú adresu"

    When I type "test@gmail.com" into the field "Email"
    Then field "Email" has value "test@gmail.com"
    And I do not see validation message "Prosím, zadajte platnú emailovú adresu"

    When I type "example.name+test@gmail.com" into the field "Email"
    Then field "Email" has value "example.name+test@gmail.com"
    And I do not see validation message "Prosím, zadajte platnú emailovú adresu"

    When I type "user123@mail.domain.com" into the field "Email"
    Then field "Email" has value "user123@mail.domain.com"
    And I do not see validation message "Prosím, zadajte platnú emailovú adresu"

    When I type "name.surname@mail.com" into the field "Email"
    Then field "Email" has value "name.surname@mail.com"
    And I do not see validation message "Prosím, zadajte platnú emailovú adresu"

    When I type "email_12345@gmail.io" into the field "Email"
    Then field "Email" has value "email_12345@gmail.io"
    And I do not see validation message "Prosím, zadajte platnú emailovú adresu"

    When I type "" into the field "Telefón"
    And I see validation message "Telefónne číslo je povinný údaj"

    When I type "123" into the field "Telefón"
    Then I see validation message "Telefónne číslo je povinný údaj"

    When I type "123456" into the field "Telefón"
    Then I see validation message "Telefónne číslo je povinný údaj"

    When I type "1234567" into the field "Telefón"
    Then I see validation message "Telefónne číslo je povinný údaj"

    When I type "12345678" into the field "Telefón"
    Then I see validation message "Telefónne číslo je povinný údaj"

    When I type "123456789" into the field "Telefón"
    Then I see validation message "Telefónne číslo je povinný údaj"

    When I type "" into the field "Telefón"
    Then I see validation message "Telefónne číslo je povinný údaj"

    When I type "323456789" into the field "Telefón"
    Then field "Telefón" has value "+421 323 456 789"
    And I do not see validation message "Telefónne číslo je povinný údaj"

    When I type "987654321" into the field "Telefón"
    Then field "Telefón" has value "+421 987 654 321"
    And I do not see validation message "Telefónne číslo je povinný údaj"

    When I type "" into the text area "Správa"
    Then I see validation message "Vaša správa je povinný údaj"

    When I type "Give me something" into the text area "Správa"
    Then text area "Správa" has value "Give me something"
    Then I do not see validation message "Vaša správa je povinný údaj"





