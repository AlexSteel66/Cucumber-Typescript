Feature: Testing Business-max

    @Regression @BusinessMax
    Scenario: Verification of articles for business-max product
        Given I visit business-max product
        And I click onto the button "Odmietnuť všetky"
        Then I see article "Odcudzenie"
        Then I see article "Vandalizmus"
        Then I see article "Poistenie skla"
        Then I see article "Zodpovednosť za škodu spôsobenú vadou výrobku"

        When I click onto next slide
        Then I see article "Lom stroja"
        Then I see article "Preprava zásielky"
        Then I see articles
            | Prerušenie prevádzky    |
            | Prepätie alebo podpätie |

        When I click onto next slide

        Then I see articles
            | Cudzie veci prevzaté |
            | Regresy sociálnej a zdravotných poisťovní       |
            | Spätné vystúpenie vody z kanalizačného potrubia |
            | Čisté finančné škody                            |

        When I click onto next slide
        Then I see articles
            | Škody na podzemných a nadzemných vedeniach |
            | Búracie práce                              |

        And I click onto the article "Búracie práce"
        Then I see these texts
            | Búracie práce                                               |
            | Škody spôsobené búracími a demolačnými prácami bez použitia |
            | Pripoistenie si môžete zriadiť k poisteniu zodpovednosti.   |

        And I close this dialog
        Then I don´t see these texts
            | Škody spôsobené búracími a demolačnými prácami bez použitia |
            | Pripoistenie si môžete zriadiť k poisteniu zodpovednosti.   |


        And I click onto the article "Škody na podzemných a nadzemných vedeniach"
        Then I see these texts
            | Škody na podzemných a nadzemných vedeniach                                                                           |
            | Fyzické poškodenie nadzemného alebo podzemného vedenia, napr. vodovody, kanalizácia, plynovody, optické káble a pod. |
            | Pripoistenie si môžete zriadiť k poisteniu zodpovednosti.                                                            |

        And I close this dialog
        Then I don´t see these texts
            | Fyzické poškodenie nadzemného alebo podzemného vedenia, napr. vodovody, kanalizácia, plynovody, optické káble a pod. |
            | Pripoistenie si môžete zriadiť k poisteniu zodpovednosti.                                                            |

        When I click onto previous slide
        And I click onto the article "Regresy sociálnej a zdravotných poisťovní"
        Then I see these texts
            | Regresy sociálnej a zdravotných poisťovní                                                                                                                |
            | Pripoistenie zodpovednosti pri pracovnom úraze zamestnanca. Zahŕňa aj náhradu nákladov za zdravotnú starostlivosť, nemocenské a dôchodkové zabezpečenie. |
            | Pripoistenie si môžete zriadiť k poisteniu zodpovednosti.                                                                                                |

        And I close this dialog
        Then I don´t see these texts
            | Pripoistenie zodpovednosti pri pracovnom úraze zamestnanca. Zahŕňa aj náhradu nákladov za zdravotnú starostlivosť, nemocenské a dôchodkové zabezpečenie. |
            | Pripoistenie si môžete zriadiť k poisteniu zodpovednosti.                                                                                                |
