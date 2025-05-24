Feature: Testing banking insurance

    @Regression @Banking 
    Scenario: Verification of links inside banking insurance
        Given I visit the main website
        Then I wait for 1500 milliseconds
        Then I click onto hyperlink "Bankopoistenie"
        And I click onto the button "Odmietnuť všetky"

        And I see these texts
            | Bankopoistenie                                                                          |
            | Poistné produkty                                                                        |
            | Spolupráca so Slovenskou sporiteľňou                                                    |
            | poistenie poisťovne KOOPERATIVA šité na mieru.                                          |
            | Produkty poisťovne KOOPERATIVA, ktoré ponúka Slovenská sporiteľňa:                      |
            | Produkty a služby Slovenskej sporiteľne, ktoré ponúka KOOPERATIVA na svojich pobočkách: |

        Then I see links for webelements with text
            # | Poistenie ŽIVOT                             |
            | Poistenie k úveru                           |
            | Osobná poistka                              |
            | Pohrebné poistenie                          |
            | Dlhodobé cestovné poistenie k osobným účtom |
            | Cestovné poistenie k platobným kartám       |
            | Cestovné poistenie k balíku Premium         |
            | Poistenie majetku DOMOV                     |
            | Poistenie Podnikateľ                        |

        Then I see links for webelements with text
            | Všeobecné poistné podmienky pre poistenie Život_13092024                                                                        |
            | Dokument s kľúčovými informáciami Život štandard_01022025                                                                       |
            | Štatút vlastného fondu Fond svetových akcií_01062024                                                                            |
            | Dokument o udržateľnosti produktov_01022024                                                                                     |
            | Sadzobník poplatkov, úrokov, limitov, obmedzenia na pripoisteniach a cenník úhrad za lekárske služby_pre produkt Život_13092024 |
            | Manuál pre postup pri výbere a využití DHS asistenčných služieb_13092024                                                        |

        Then I see links for webelements with text
            | ProDoctor                   |
            | webe                        |
            | pobočkách                   |
            | +421 2 5729 9999            |
            | Napíšte nám                 |
            | 0850 200 200                |
            | +421 2 5729 9983            |
            | Slovenskej sporiteľne, a.s. |
            | životného a pohrebného      |
            | neživotného poistenia       |
            | životného a pohrebného      |
            | neživotného poistenia       |


    @Regression @Banking
    Scenario: Verification of funeral insurance
        Given I visit the main website
        Then I wait for 1500 milliseconds
        Then I click onto hyperlink "Bankopoistenie"
        And I click onto the button "Odmietnuť všetky"
        And I click onto the link of webelement with text "Pohrebné poistenie"

        And I see these texts
            | Dokumenty k Pohrebnému poisteniu: |
            | Pohrebné poistenie                |
            | Bankové produkty                  |
            | Ako nahlásiť škodovú udalosť      |

        Then I don’t see links for webelements with text
            | Poistné podmienky pre poistenie ŽIVOT_VPP 2000_01012023                                            |
            | Verejné vyhlásenie spoločnosti KOOPERATIVA k posteniu ŽIVOT a Poistenie úveru_01012025             |
            | Verejné vyhlásenie spoločnosti KOOPERATIVA_01012024                                                |
            | Verejné vyhlásenie spoločnosti KOOPERATIVA_01012023                                                |
            | Verejné vyhlásenie spoločnosti KOOPERATIVA k poisteniu ŽIVOT a Poistenie k úveru_01012022-31122022 |
            | Verejné vyhlásenie spoločnosti KOOPERATIVA k poisteniu ŽIVOT a Poistenie k úveru_01012022-31122022 |
            | Verejné vyhlásenie spoločnosti KOOPERATIVA k poisteniu ŽIVOT a Poistenie k úveru_01042020-31122020 |
            | Dodatok č_ 1 k Verejnému vyhláseniu k poistnej zmluve ŽIVOT a Poistenie k úveru_01042020-31122021  |
            | Dokument s kľúčovými informáciami pre produkt Život bežne platené_01012024                         |
            | Dokument s kľúčovými informáciami pre produkt Život jednorázovo platené_01012024                   |
            | Postup klienta pri asistenčných službách eDoctor_01032022                                          |

        Then I see these texts
            | Dokument o dôležitých zmluvných podmienkach - Pohrebné poistenie bežne platené_01012020       |
            | Dokument o dôležitých zmluvných podmienkach - Pohrebné poistenie jednorazovo platené_01012020 |
            | Poistné podmienky pre Pohrebné poistenie SLSP_VPP 2100_01012023                               |
            | Poistné podmienky pre Pohrebné poistenie_PSS_01042018                                         |
            | Postup klienta pri asistenčných službách eDoctor_01032022                                     |
            | Informácia pre spotrebiteľa pred uzavretím zmluvy na diaľku Pohrebné poistenie_01012020       |

        Then I see links for webelements with text
            | eDoctor                     |
            | webe                        |
            | pobočkách                   |
            | +421 2 5729 9999            |
            | Napíšte nám                 |
            | 0850 200 200                |
            | +421 2 5729 9983            |
            | Slovenskej sporiteľne, a.s. |
            | životného a pohrebného      |
            | neživotného poistenia       |
            | životného a pohrebného      |
            | neživotného poistenia       |
