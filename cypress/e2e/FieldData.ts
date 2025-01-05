export class FieldData {

    // Checkbox text
    public checkbox: string;

    // Fields
    public fieldNameFirstName: string;
    public fieldNameLastName: string;
    public fieldNamePhone: string;
    public fieldNameEmail: string;
    public fieldNamePersonalId: string;
    public fieldNameStreet: string;
    public fieldNameHouseNumber: string;
    public fieldNameZipCode: string;
    public fieldNameCity: string;
    public fieldNameCountry: string;
    public fieldNameInsuranceNumber: string;
    public invalidInsuranceNumber: string;
    public fieldNameDate: string;
    public fieldNameTime: string;
    public fieldNameGPS: string;
    public dropdownNameCauseOfHarm: string;


    // General
    public vigTitle: string;
    public acceptCookiesButton: string;
    public vigCode: string;

    // Hyperlinks
    public hyperlinks: Record<string, string>;
    public mediaLinks: Record<string, string>;
    public socialResponsibilityLinks: Record<string, string>;

    // Elements 
    public companyWebLink: string;
    public corporateResponsibilityElement: string;
    public mediaElement: string;
    public onlinePoistenie: string;
    public poistenieMajetku: string;
    public byt: string;
    public pokracovat: string;
    public povedzteNamViac: string;
    public callUs: string
    public online: string
    public citizenProperty: string
    public next: string
    public checkBox: string


    //Form questions
    public radioButtonQuestions: string[];
    public rectangleRadioButtonYesNo: string[];
    public simpleRadioButtonOptions: string[];
    public errorMessage: string;

    // Web Elements (fields, buttons, links, etc.)
    public elements: Record<string, string>;

    // Field values for validation
    public fieldValues: Record<string, string>;

    // Dropdown buttons
    public dropdownButtons: Record<string, string>;

    // Simple links
    public simpleLinks: Record<string, string>;

    // Field values
    private values: Record<string, string[] | string>;

    private formQuestions: Record<string, string[] | string>;

    // Error messages
    private messages: Record<string, string>;

    public categories: Record<string, string>;

    public sections: Record<string, string[]>;


    // Subarticles
    public subarticles: Record<string, Record<string, string>>;

    public hyperLinks: { insuranceTerms: string };
    public spanWebElements: string[];
    public lifeInsurancePdfs: string[];
    public excludedLifeInsurancePdfs: string[];
    public otherPdfs: { pzp: string[]; kasko: string[] };

    //Others
    public causeOfHarmOptions: string[];
    public causeOfHarmNotOptions: string[];


    constructor() {
        this.checkBox = "iba nahlasujem  za poškodeného";
        this.fieldNameFirstName = "Meno";
        this.fieldNameLastName = "Priezvisko";
        this.fieldNamePhone = "Telefón";
        this.fieldNameEmail = "Email";
        this.fieldNamePersonalId = "Rodné číslo";
        this.fieldNameStreet = "Ulica";
        this.fieldNameHouseNumber = "Číslo domu";
        this.fieldNameZipCode = "PSČ";
        this.fieldNameCity = "Mesto";
        this.fieldNameCountry = "Krajina";
        this.fieldNameInsuranceNumber = "Číslo poistnej zmluvy";
        this.fieldNameDate = "Dátum";
        this.fieldNameTime = "Čas";
        this.fieldNameGPS = "GPS súradnice";
        this.dropdownNameCauseOfHarm = "Príčina vzniku škody";

        this.vigTitle = "Vienna Insurance Group";
        this.acceptCookiesButton = "Akceptovať všetky cookies";
        this.vigCode = "193";

        this.categories = {
            children: "Deti",
            adults: "Dospelí",
            housing: "Bývanie",
            vehicles: "Vozidlá",
            travel: "Cestovanie",
            business: "Podnikanie",
            citiesAndTowns: "Mestá a obce",
            liability: "Zodpovednosť",
        };

        this.elements = {
            invisibleLink: "zodpovednost/poistenie-zodpovednosti-za-skodu-sposobenu-primatormi-a-starostami",
            closeInsurance: "Uzatvoriť poistenie",
            contract: "Moja zmluva",
            moreInfo: "Viac informácií",
            clientRadio: "Som klient",
            nonClientRadio: "Nie som klient",
            physicalPersonRadio: "Fyzická osoba",
            companyRadio: "Spoločnosť",
            contractNumberField: "Číslo poistnej zmluvy / Číslo návrhu zmluvy*",
            birthDateField: "Dátum narodenia*",
            firstNameField: "Meno*",
            lastNameField: "Priezvisko*",
            emailField: "Email*",
            phoneField: "Telefón*",
            messageField: "Vaša správa*",
            acceptTermsCheckbox: "AcceptTerms",
            companyNameField: "Názov spoločnosti",
            representativeField: "Zastupujúca osoba",
            icoField: "IČO",
            onlinePoistenie: "Online poistenie",
            poistenieMajetku: "Poistenie majetku",
            byt: "Byt",
            pokracovat: "Pokračovať",
            povedzteNamViac: "Povedzte nám viac",
            callUs: "Zavolajte nám",
            online: "Online",
            citizenProperty: "Poistenie majetku (Občania)",
            next: "Ďalej"

        };

        this.formQuestions = {
            radioButtonQuestions: [
                "Je nehnuteľnosť obývaná viac ako 183 dní v roku?",
                "Využívate nehnuteľnosť na podnikanie alebo ju prenajímate?",
                "Z akého materiálu je nehnuteľnosť zhotovená?",
                "Bola nehnuteľnosť za posledných 5 rokov poškodená povodňou alebo záplavou minimálne dvakrát?",
            ],
            rectangleRadioButtonYesNo: ["Áno", "Nie"],
            simpleRadioButtonOptions: [
                "Panelové / Betónové vyhotovenie",
                "Murované / Kombinované (iné) vyhotovenie",
            ],
            errorMessage:
                "Bohužiaľ, vašu nehnuteľnosť nie je možné poistiť online. Môžeme kontakt na Vás poskytnúť nášmu zástupcovi, ktorý Vás bude kontaktovať s individuálnou ponukou?",
        };


        this.fieldValues = {
            contractNumber: "",
            firstName: "",
            lastName: "",
            email: "",
        };

        this.subarticles = {
            adults: {
                riskInsurance: "Rizikové poistenie",
                investmentInsurance: "Investičné poistenie",
                accidentInsurance: "Úrazové poistenie",
                funeralInsurance: "Poistenie Pieta",
            },
            children: {
                comprehensiveInsurance: "Komplexné poistenie detí",
            },
            housing: {
                home: "Dom / Byt",
                household: "Domácnosť",
                cottage: "Chata",
                garage: "Garáž",
            },
        };

        // Hyperlinks
        this.hyperlinks = {
            glossary: "Slovník pojmov",
            companyBodies: "Orgány spoločnosti",
            annualReports: "Výročné správy",
            awards: "Ocenenia",
            partners: "Partneri",
            careerOpportunities: "Pracovné príležitosti",
        };

        this.socialResponsibilityLinks = {
            supportCities: "Podpora miest a obcí",
            youthFriendly: "Komunita priateľská deťom a mladým ľuďom",
            sustainableFinancing: "Udržateľné financovanie",
        };

        this.mediaLinks = {
            corporateIdentity: "Korporátna identita",
            mediaContact: "Kontakt pre médiá",
            insurance: "Poistenie",
            claimsResolution: "Riešenie škôd",
        };

        // Elements
        this.companyWebLink = "www.vig.com";
        this.corporateResponsibilityElement = "Spoločenská zodpovednosť";
        this.mediaElement = "Pre médiá";


        // Dropdown buttons
        this.dropdownButtons = {
            children: "Deti",
            adults: "Dospelí",
            housing: "Bývanie",
            citiesAndTowns: "Mestá a obce",
        };

        // Simple links
        this.simpleLinks = {
            personalInsuranceAccount: "/stranka/osobny-poistny-ucet-max",
            adultRiskInsurance: "dospeli/rizikove-poistenie-provital-partner",
            adultLifeInsurance: "dospeli/investicne-zivotne-poistenie",
            adultAccidentInsurance: "dospeli/urazove-poistenie",
            adultFuneralInsurance: "dospeli/poistenie-pohrebnych-nakladov",
        };

        this.values = {
            [this.fieldNameFirstName]: ["", " ", "Alexander"],
            [this.fieldNameLastName]: ["", " ", "Gregor"],
            [this.fieldNameCountry]: ["", " ", "Slovensko"],
            [this.fieldNamePersonalId]: ["", " ", "haha", "881032"],
            [this.fieldNamePhone]: ["", " ", "haha", "0999", "0918381980", "00421918 381 980"],
            [this.fieldNameEmail]: ["", " ", "haha", "alex@gmail.com.", "@gmail.com", "alex.gregor@gmail.com"],
            [this.fieldNameStreet]: ["", " ", "Tomasikova 2"],
            [this.fieldNameHouseNumber]: ["", " ", "3"],
            [this.fieldNameCity]: ["", " ", "Bratislava"],
            [this.fieldNameZipCode]: ["", " ", "haha", ",,,", "82105"],
            [this.fieldNameInsuranceNumber]: ["", " ", "haha", ",,,", "82105"],
        };

        this.messages = {
            invalidName: "Pole Meno obsahuje hodnotu, ktorá sa nenachádza v číselníku Krstných mien. Ak je to v poriadku, pokračujte ďalej.",
            invalidSurname: "Pole Priezvisko obsahuje Meno, prosím skontrolujte zadaný údaj. Ak je to v poriadku, pokračujte ďalej.",
            invalidEmail: "Zadajte platnú emailovú adresu.",
            invalidPhoneNumber: "Zadajte platné telefónne číslo v medzinárodnom formáte +4219XXXXXXXX alebo 004219XXXXXXXX.",
            invalidDate: "Zadaný dátum má nesprávny formát. Použite formát DD.MM.RRRR.",
            requiredField: "Toto pole je povinné a nemôže zostať prázdne.",
            invalidValue: "Zadaná hodnota nie je platná. Prosím, skontrolujte údaje a skúste to znova.",
            invalidIDNumber: "Zadajte rodné číslo bez medzier a lomítka",
            invalidZipCode: "PSČ obsahuje nepovolené znaky",
            invalidInsuranceNumber: "Nesprávne číslo zmluvy"
        };

        this.sections = {
            Insurance: [
                "Poistenie dospelých",
                "Poistenie detí",
                "Poistenie bývania",
                "Poistenie vozidiel",
                "Poistenie podnikania",
                "Poistenie miest a obcí",
                "Poistenie zodpovednosti",
                "Cestovné poistenie",
            ],
            Claims: [
                "Asistenčné služby",
                "Nahlásiť poistnú udalosť",
                "Zistiť stav poistnej udalosti",
            ],
            ImportantLinks: [
                "Ochrana osobných údajov",
                "Poistné podmienky",
                "Tlačivá na stiahnutie",
                "Predzmluvná dokumentácia",
                "Informácie o fondoch",
                "Investičná stratégia",
                "Povinné informácie",
                "Život",
                "Aktualizácia nastavenia cookies",
                "Whistleblowing, konflikt záujmov, etický kódex",
                "Postup podávania sťažností",
            ],
        };
        this.hyperLinks = {
            insuranceTerms: "Poistné podmienky",
        };

        this.spanWebElements = [
            "Životné poistenie",
            "Povinné zmluvné poistenie",
            "Havarijné poistenie",
            "Neživotné poistenie",
        ];

        this.causeOfHarmOptions = [
            "",
            "Požiar",
            "Výbuch",
            "Úder blesku",
            "Pád predmetov",
            "Povodeň",
            "Záplava",
            "Zosuv pôdy",
            "Zrútenie skál, lavín",
            "Krupobitie",
            "Zemetrasenie",
            "Ťarcha snehu",
            "Vodovod",
            "Dym",
            "Nárazová vlna",
            "Vietor",
            "Námraza",
            "Krádež",
            "Lúpež",
            "Vandalizmus",
            "Poškodenie/Zničenie skla",
            "Poškodenie práčky/umývačky",
            "Skrat elektromotorov"
        ];

        this.causeOfHarmNotOptions = [
           "Búrka",
           "Cunami"
        ];
        

        this.lifeInsurancePdfs = [
            "Všeobecné poistné podmienky pre životné poistenie",
            "Všeobecné poistné podmienky pre investičné životné poistenie",
            "Všeobecné poistné podmienky pre úrazové poistenie",
            "Osobitné poistné podmienky pre pripoistenie chirurgického zákroku",
            "Osobitné poistné podmienky pre pripoistenie úrazu, práceneschopnosti, hospitalizácie a invalidity",
            "Osobitné poistné podmienky pre pripoistenie kritických chorôb",
            "Osobitné poistné podmienky pre pripoistenie hospitalizácie",
            "Osobitné poistné podmienky pre pripoistenie denného odškodného za čas práceneschopnosti následkom úrazu alebo choroby",
            "Osobitné poistné podmienky pre pripoistenie polovičné a úplné osirotenie",
            "Osobitné poistné podmienky pre pripoistenie materiálnej škody",
            "Osobitné poistné podmienky pre pripoistenie opatrovníctvo poisteného",
            "Osobitné poistné podmienky pre investičné životné pripoistenie",
            "Osobitné poistné podmienky pre pripoistenie oslobodenia od platenia s náhradou poistného",
            "Osobitné poistné podmienky pre pripoistenie onkologických chorôb",
            "Osobitné poistné podmienky pre pripoistenie čiastočnej alebo plnej invalidity",
            "Rozsah nárokov a dojednaní pre individuálne úrazové poistenie",
            "Rozsah nárokov a dojednaní pre investičné životné poistenie Provital Invest",
            "Rozsah nárokov a dojednaní pre investičné životné poistenie Provital Junior",
            "Rozsah nárokov a dojednaní pre rizikové životné poistenie Pieta",
            "Rozsah nárokov a dojednaní pre rizikové životné poistenie Provital Partner",
        ];

        this.excludedLifeInsurancePdfs = [
            "Rozsah nárokov a dojednaní pre úrazové poistenie K - Škole",
            "Rozsah nárokov a dojednaní pre skupinové úrazové poistenie",
            "Rozsah nárokov a dojednaní pre kapitálové životné poistenie Projekt Istota",
        ];

        this.otherPdfs = {
            pzp: [
                "Všeobecné poistné podmienky pre poistenie zodpovednosti za škodu spôsobenú prevádzkou motorového vozidla (VPP PZP-2)",
                "Zmluvné dojednania pre rozšírenie PZP za škodu spôsobenú prevádzkou motorového vozidla v spojitosti s verejným prísľubom o úrazové poistenie nemenovaných osôb (ZD VPU-6)",
                "Všeobecné informácie o postupe pri zohľadňovaní celkového škodového priebehu",
                "Všeobecné poistné podmienky pre úrazové poistenie (VPP 1000-10)",
                "Osobitné poistné podmienky pre pripoistenia k povinnému zmluvnému poisteniu zodpovednosti za škodu spôsobenú prevádzkou motorového vozidla (OPP P PZP-2)",
                "Verejný prísľub na rozšírenie poistenia zodpovednosti za škodu spôsobenú prevádzkou motorového vozidla o krytie úrazu vodiča a členov posádky poisteného motorového vozidla 2025",
            ],
            kasko: [
                "Verejný prísľub na rozšírenie poistenia zodpovednosti za škodu spôsobenú prevádzkou motorového vozidla o krytie batožiny vodiča a členov posádky poisteného motorového vozidla 2025",
                "Všeobecné poistné podmienky pre havarijné poistenie motorových vozidiel (VPP KAS-8)",
                "Verejný prísľub na rozšírenie poistenia zodpovednosti za škodu spôsobenú prevádzkou motorového vozidla o asistenčné služby Pasasist 2025",
            ],
        };
    }

    public getMessage(type: string): string {
        return this.messages[type];
    }

    public getValue(fieldName: string): string[] | string | undefined {
        return this.values[fieldName];
    }

    public getHyperlink(key: string): string {
        return this.hyperlinks[key] || this.socialResponsibilityLinks[key] || this.mediaLinks[key];
    }

    public getDropdownButton(key: string): string {
        return this.dropdownButtons[key];
    }

    public getSimpleLink(key: string): string {
        return this.simpleLinks[key];
    }

    // Get category name by key
    public getCategory(key: string): string {
        return this.categories[key];
    }

    // Get subarticle under category
    public getSubarticle(categoryKey: string, subarticleKey: string): string {
        return this.subarticles[categoryKey]?.[subarticleKey];
    }

    // Get element by key
    public getElement(key: string): string {
        return this.elements[key];
    }

    // Get field value by key
    public getFieldValue(key: string): string {
        return this.fieldValues[key];
    }

    // Set field value by key
    public setFieldValue(key: string, value: string): void {
        this.fieldValues[key] = value;
    }
    public getLinks(section: string): string[] {
        return this.sections[section];
    }

    public getFormQuestion(key: string): string | string[] {
        if (this.formQuestions[key] !== undefined) {
            return this.formQuestions[key];
        }
        throw new Error(`Form question key '${key}' not found`);
    }
}
