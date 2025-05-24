Feature: Testing section responsibility insurance

    @Regression @ResponsibilityInsurance
    Scenario: Verification of fields, links and checkboxes for responsibility insurance
        Given I visit the main website
        Then I wait for 1500 milliseconds
        When I click onto hyperlink "Poistenie"

        Then I see links
            | auto              |
            | zivot             |
            | majetok           |
            | zodpovednost      |
            | firmy-zivnostnici |
            | cestovanie        |
            | asistencne-sluzby |

        And I click onto the simple link "zodpovednost"
        And I click onto the simple link "zodpovednost/skoda-sposobena-zamestnavatelovi"
        Then I see links for webelements with text
            | Úvod                          |
            | O poistení                    |
            | Pripoistenia                  |
            | Otázky a odpovede             |
            | Dokumenty                     |
            | Chcem poistenie zodpovednosti |

        And I click onto the link of webelement with text "Chcem poistenie zodpovednosti"
        And I click onto the button "Odmietnuť všetky"
        Then I see following checkboxes in states
            | checkbox                             | state     |
            | Životné poistenie                    | unchecked |
            | Poistenie bývania                    | unchecked |
            | Cestovné poistenie                   | unchecked |
            | Poistenie auta - PZP                 | unchecked |
            | Poistenie auta - AutoMat             | unchecked |
            | Iné špecifické poistenie             | unchecked |
            | Oboznámil som sa s                   | unchecked |
            | Poistenie zodpovednosti              | checked   |
            | Podnikateľské poistenie              | unchecked |
            | Poistenie do hôr                     | unchecked |
            | Poistenie auta - Havarijné poistenie | unchecked |
            | Poistenie auta - iné                 | unchecked |

        When I type "Alex" into the field "Meno"
        Then field "Meno" has value "Alex"
        When I type "" into the field "Meno"
        Then I see validation message "Meno je povinný údaj"
        When I type "Alex" into the field "Meno"
        Then I do not see validation message "Meno je povinný údaj"

        When I type "Gregor" into the field "Priezvisko"
        Then field "Priezvisko" has value "Gregor"
        When I type "" into the field "Priezvisko"
        Then I see validation message "Priezvisko je povinný údaj"
        And I type "Gregor" into the field "Priezvisko"
        Then I do not see validation message "Priezvisko je povinný údaj"


        When I type "test" into the field "Email"
        Then I see validation message "Prosím, zadajte platnú emailovú adresu"

        When I type "test@" into the field "Email"
        And I click away
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

        When I type " " into the field "Telefón"
        Then I see validation message "Telefónne číslo je povinný údaj"

        When I type "323456789" into the field "Telefón"
        Then field "Telefón" has value "+421 323 456 789"
        And I do not see validation message "Telefónne číslo je povinný údaj"

        When I type "987654321" into the field "Telefón"
        Then field "Telefón" has value "+421 987 654 321"
        And I do not see validation message "Telefónne číslo je povinný údaj"

    @Regression @ResponsibilityInsurance
    Scenario: Verification of links inside responsibility insurance

        Given I visit the main website
        Then I wait for 1500 milliseconds
        When I click onto hyperlink "Poistenie"
        And I click onto the simple link "zodpovednost"
        And I click onto the simple link "zodpovednost/skoda-sposobena-zamestnavatelovi"
        And I click onto the link of webelement with text "Chcem poistenie zodpovednosti"
        And I click onto the button "Odmietnuť všetky"

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

        Then I see links for webelements with text
            | Zľava 10 % pre všetkých na havarijné poistenie                                                  |
            | Zľava 5 % na rizikové životné poistenie Bezstarostný život                                      |
            | Zľava 10 % na poistenie bývania až na 3 roky a k tomu extra 20 % pre poistenie bytu na prvý rok |
