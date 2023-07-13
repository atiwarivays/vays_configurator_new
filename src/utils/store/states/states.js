export const initialState = {
  installationsortValues: [
    {
      value: 1,
      label: "Haus",
    },
  ],
  bauvorhabenValues: [
    {
      value: 1,
      label: "Nachrüstung",
    },
  ],
  bauphaseValues: [
    {
      value: 1,
      label: "Bezugsfertig",
    },
  ],
  raumeValues: [
    {
      value: 4,
      label: "4 Räume",
    },
  ],
  herstellerValues: [
    {
      value: 1,
      label: "Bosch",
    },
  ],
  installationServiceValues: [
    {
      value: 1,
      // label: (
      //   <p>
      //     Installation <small className="ml-auto">Inklusive</small>
      //   </p>
      // ),
      label: "Installation Inklusive",
    },
  ],

  heimautomatisierungValues: [
    {
      value: 1,
      // label: [
      //   <p>
      //     3 Automatisierungen <small className="ml-auto">Inklusive</small>
      //   </p>,
      // ],
      label: "3 Automatisierungen Inklusive",
    },
  ],

  vorhandenerValues: [
    {
      value: 1,
      // label: [
      //   <p>
      //     Keine Integration<small className="ml-auto">+ 0,00 €</small>
      //   </p>,
      // ],
      label: "Keine Integration + 0,00 €",
    },
  ],

  fordermittelserviceValues: [
    {
      value: 1,
      // label: [
      //   <p>
      //     15% Förderung<small className="ml-auto">Inklusive</small>
      //   </p>,
      // ],
      label: "15% Förderung Inklusive",
    },
  ],

  wartungsServiceValues: [
    {
      value: 1,
      // label: [
      //   <p>
      //     0 Jahre<small className="ml-auto">+ 0,00€</small>
      //   </p>,
      // ],
      label: "0 Jahre + 0,00€",
    },
  ],

  gewahrlewistungValues: [
    {
      value: 1,
      // label: [
      //   <p>
      //     0 Jahre<small className="ml-auto">+ 0,00€</small>
      //   </p>,
      // ],
      label: "2 Jahre + 0,00€",
    },
  ],

  intentions: [
    { id: 1, label: "Heizkosten sparen", checked: true },
    { id: 2, label: "Stromkosten sparen", checked: false },
    { id: 3, label: "Wohnkomfort steigern", checked: false },
    { id: 4, label: "Mehr Sicherheit", checked: false },
    { id: 5, label: "Wertsteigerung der Immobilie", checked: false },
    { id: 6, label: "Barrierefreiheit im Alter", checked: false },
  ],

  bedienungSelection: [
    { id: 0, label: "App", included: "inklusive", checked: true },
    { id: 1, label: "Bedienpanel", included: "+ 1.232,00€", checked: false },
    { id: 2, label: "Szenenschalter", included: "+ 1.232,00€", checked: false },
    { id: 3, label: "Fernbedienung", included: "+ 1.232,00€", checked: false },
    {
      id: 4,
      label: "Sprachsteuerung",
      included: "+ 1.239,50€",
      checked: false,
    },
  ],

  functionSelection: [
    { id: 0, label: "Heizung", included: "gewählt", checked: true },
    { id: 1, label: "Beleuchtung", included: "+ 1.232,00€", checked: false },
    { id: 2, label: "Beschattung", included: "+ 1.232,00€", checked: false },
    { id: 3, label: "Energie", included: "+ 1.232,00€", checked: false },
    { id: 4, label: "Steckdosen", included: "+ 1.232,00€", checked: false },
    {
      id: 5,
      label: "Bewegungsmelder",
      included: "+ 1.232,00€",
      checked: false,
    },
    { id: 6, label: "Alarmsystem", included: "+ 1.532,00€", checked: false },
    { id: 7, label: "Kameras", included: "+ 1.532,00€", checked: false },
    { id: 8, label: "Rauchmelder", included: "+ 1.532,00€", checked: false },
    { id: 9, label: "Türstation", included: "+ 4.578,20€", checked: false },
    { id: 10, label: "Zugang", included: "+ 4.578,20€", checked: false },
    { id: 11, label: "Sound", included: "+ 4.578,20€", checked: false },
    { id: 12, label: "Garten", included: "+ 1.232,00€", checked: false },
    { id: 13, label: "Lüftung", included: "+ 1.232,00€", checked: false },
  ],
};
