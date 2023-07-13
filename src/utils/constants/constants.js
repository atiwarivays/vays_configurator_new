const installationsortOptions = [
  {
    value: 1,
    label: "Haus",
  },
  {
    value: 2,
    label: "Wohnung",
  },
  {
    value: 3,
    label: "Gewerbe",
  },
  {
    value: 4,
    label: "Sonstiges",
  },
];

const bauvorhabenOptions = [
  {
    value: 1,
    label: "Nachrüstung",
  },
  {
    value: 2,
    label: "Renovierung",
  },
  {
    value: 3,
    label: "Sanierung",
  },
  {
    value: 4,
    label: "Neubau",
  },
];

const bauphaseOptions = [
  {
    value: 1,
    label: "Bezugsfertig",
  },
  {
    value: 2,
    label: "Innenausbau",
  },
  {
    value: 3,
    label: "Rohbau",
  },
  {
    value: 4,
    label: "Planung",
  },
];

const raumeOptions = [
  {
    value: 1,
    label: "1 Räume",
  },
  {
    value: 2,
    label: "2 Räume",
  },
  {
    value: 3,
    label: "3 Räume",
  },
  {
    value: 4,
    label: "4 Räume",
  },
  {
    value: 5,
    label: "5 Räume",
  },
  {
    value: 6,
    label: "6 Räume",
  },
  {
    value: 7,
    label: "7 Räume",
  },
  {
    value: 8,
    label: "8 Räume",
  },
  {
    value: 9,
    label: "9 Räume",
  },
  {
    value: 10,
    label: "10 Räume",
  },
  {
    value: 11,
    label: "11 Räume",
  },
  {
    value: 12,
    label: "12 Räume",
  },
  {
    value: 13,
    label: "13 Räume",
  },
  {
    value: 14,
    label: "14 Räume",
  },
  {
    value: 15,
    label: "15 Räume",
  },
  {
    value: 16,
    label: "16 Räume",
  },
  {
    value: 17,
    label: "17 Räume",
  },
  {
    value: 18,
    label: "18 Räume",
  },
  {
    value: 19,
    label: "19 Räume",
  },
  {
    value: 20,
    label: "20 Räume",
  },
  {
    value: 21,
    label: "21 Räume",
  },
  {
    value: 22,
    label: "22 Räume",
  },
  {
    value: 23,
    label: "23 Räume",
  },
  {
    value: 24,
    label: "24 Räume",
  },
  {
    value: 25,
    label: "25 Räume",
  },
  {
    value: 26,
    label: "26 Räume",
  },
  {
    value: 27,
    label: "27 Räume",
  },
  {
    value: 28,
    label: "28 Räume",
  },
  {
    value: 29,
    label: "29 Räume",
  },
  {
    value: 30,
    label: "30 Räume",
  },
];

const zentalOptions = [
  {
    value: 1,
    label: "Bosch",
  },
  {
    value: 2,
    label: "homematic",
  },
  {
    value: 3,
    label: "FIBARO",
  },
  {
    value: 4,
    label: "homey",
  },
];

const bedienungSelection = [
  { id: 0, label: "App", included: "inklusive", checked: true },
  { id: 1, label: "Bedienpanel", included: "+ 1.232,00€", checked: false },
  { id: 2, label: "Szenenschalter", included: "+ 1.232,00€", checked: false },
  { id: 3, label: "Fernbedienung", included: "+ 1.232,00€", checked: false },
  { id: 4, label: "Sprachsteuerung", included: "+ 1.239,50€", checked: false },
];

const priceIncludedList = [
  "Montage vom zertifizierten Elektriker",
  "Parametrierung und Einrichtung",
  "Programmierung vom Systemexperten",
  "Professionelle Inbetriebnahme",
  "Einweisung in das System",
  "Service & Betreuung vom Elektromeister",
];

const wartungList = [
  "Exklusive Systembetreuung ",
  "Fernwartung bei Störfällen",
  "Fehlerbehebung vor Ort",
  "Übernahme Reperaturkosten",
  "Jährlicher System-Health-Check",
  "Austausch defekter Geräte",
  "Versicherungsschutz",
  "Unbegrenzte Gewährleistung",
];

const installationsserviceOptions = [
  {
    value: 1,
    // label: (
    //   <p>
    //     Installation <small className="ml-auto">Inklusive</small>
    //   </p>
    // ),
    label: "Installation Inklusive",
  },
  {
    value: 2,
    label: "Keine Installation",
  },
];

const heimautomatisierungOptions = [
  {
    value: 1,
    // label: [
    //   <p>
    //     3 Automatisierungen <small className="ml-auto">Inklusive</small>
    //   </p>,
    // ],
    label: " 3 Automatisierungen Inklusive",
  },
  {
    value: 2,
    label: "5 Automatisierungen",
  },
  {
    value: 3,
    label: "Unbegrenzt Automatisierungen",
  },
];

const vorhandenerOptions = [
  {
    value: 1,
    // label: [
    //   <p>
    //     Keine Integration<small className="ml-auto">+ 0,00 €</small>
    //   </p>,
    // ],
    label: "Keine Integration + 0,00 €",
  },
  {
    value: 2,
    // label: [
    //   <p>
    //     3 Integrationen<small className="ml-auto">+ 0,00 €</small>
    //   </p>,
    // ],
    label: "3 Integrationen + 0,00 €",
  },
  {
    value: 3,
    // label: [
    //   <p>
    //     Unbegrenzt Integrationen<small className="ml-auto">+ 0,00 €</small>
    //   </p>,
    // ],
    label: "Unbegrenzt Integrationen + 0,00 €",
  },
];

const fördermittelserviceOptions = [
  {
    value: 1,
    // label: [
    //   <p>
    //     15% Förderung<small className="ml-auto">Inklusive</small>
    //   </p>,
    // ],
    label: "15% Förderung Inklusive",
  },
  {
    value: 2,
    label: "Keine Förderung",
  },
];

const WartungsserviceOptions = [
  {
    value: 1,
    // label: [
    //   <p>
    //     0 Jahre<small className="ml-auto">+ 0,00€</small>
    //   </p>,
    // ],
    label: "0 Jahre + 0,00€",
  },
  {
    value: 2,
    // label: [
    //   <p>
    //     1 Jahre<small className="ml-auto">+ 0,00€</small>
    //   </p>,
    // ],
    label: "1 Jahre + 0,00€",
  },
  {
    value: 3,
    // label: [
    //   <p>
    //     2 Jahre<small className="ml-auto">+ 0,00€</small>
    //   </p>,
    // ],
    label: "2 Jahre + 0,00€",
  },
  {
    value: 5,
    // label: [
    //   <p>
    //     3 Jahre<small className="ml-auto">+ 0,00€</small>
    //   </p>,
    // ],
    label: "3 Jahre + 0,00€",
  },
];

const GewährleistungOptions = [
  {
    value: 1,
    // label: [
    //   <p>
    //     2 Jahre<small className="ml-auto">+ 0,00 €</small>
    //   </p>,
    // ],
    label: "2 Jahre + 0,00€",
  },
  {
    value: 2,
    // label: [
    //   <p>
    //     3 Jahre<small className="ml-auto">+ 0,00 €</small>
    //   </p>,
    // ],
    label: "3 Jahre + 0,00€",
  },
  {
    value: 3,
    // label: [
    //   <p>
    //     5 Jahre<small className="ml-auto">+ 0,00 €</small>
    //   </p>,
    // ],
    label: "5 Jahre + 0,00€",
  },
];

const functionSelection = [
  { id: 0, label: "Heizung", included: "gewählt", checked: false },
  { id: 1, label: "Beleuchtung", included: "+ 1.232,00€", checked: false },
  { id: 2, label: "Beschattung", included: "+ 1.232,00€", checked: false },
  { id: 3, label: "Energie", included: "+ 1.232,00€", checked: false },
  { id: 4, label: "Steckdosen", included: "+ 1.232,00€", checked: false },
  { id: 5, label: "Bewegungsmelder", included: "+ 1.232,00€", checked: false },
  { id: 6, label: "Alarmsystem", included: "+ 1.532,00€", checked: false },
  { id: 7, label: "Kameras", included: "+ 1.532,00€", checked: false },
  { id: 8, label: "Rauchmelder", included: "+ 1.532,00€", checked: false },
  { id: 9, label: "Türstation", included: "+ 4.578,20€", checked: false },
  { id: 10, label: "Zugang", included: "+ 4.578,20€", checked: false },
  { id: 11, label: "Sound", included: "+ 4.578,20€", checked: false },
  { id: 12, label: "Garten", included: "+ 1.232,00€", checked: false },
  { id: 13, label: "Lüftung", included: "+ 1.232,00€", checked: false },
];

const german_language = {
  name: "german_language",
  months: [
    ["Januar", "Jan"],
    ["Februar", "Feb"],
    ["Marsch", "Mar"],
    ["April", "Apr"],
    ["Dürfen", "Dür"],
    ["Juni", "Jun"],
    ["Juli", "Jul"],
    ["August", "Aug"],
    ["September", "Sep"],
    ["Oktober", "Okt"],
    ["November", "Nov"],
    ["Dezember", "Dez"],
  ],
  weekDays: [
    ["Samstag", "Sa"],
    ["Sonntag", "So"],
    ["Montag", "Mo"],
    ["Dienstag", "Di"],
    ["Mittwoch", "Mi"],
    ["Donnerstag", "Do"],
    ["Freitag", "Fr"],
  ],
  digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  meridiems: [
    ["BIN", "BIN"],
    ["PN", "PN"],
  ],
};

const LOADING = "loading";
const FAILED = "failed";
const SUCCEEDED = "succeeded";

module.exports = {
  installationsortOptions,
  bauvorhabenOptions,
  bauphaseOptions,
  raumeOptions,
  zentalOptions,
  bedienungSelection,
  priceIncludedList,
  wartungList,
  installationsserviceOptions,
  heimautomatisierungOptions,
  vorhandenerOptions,
  fördermittelserviceOptions,
  WartungsserviceOptions,
  GewährleistungOptions,
  functionSelection,
  LOADING,
  FAILED,
  SUCCEEDED,
  german_language,
};
