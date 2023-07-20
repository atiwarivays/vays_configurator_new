import "./funktionenModal.scss";
import crossIcon from "../../../assets/images/close.svg";
import faqIcon1 from "../../../assets/images/faq-icon1.svg";
import faqIcon2 from "../../../assets/images/faq-icon2.svg";
import faqIcon3 from "../../../assets/images/faq-icon3.svg";
import faqIcon4 from "../../../assets/images/faq-icon4.svg";
import faqIcon5 from "../../../assets/images/faq-icon5.svg";
import faqIcon6 from "../../../assets/images/faq-icon6.svg";
import faqIcon7 from "../../../assets/images/faq-icon7.svg";
import faqIcon8 from "../../../assets/images/faq-icon8.svg";
import faqIcon9 from "../../../assets/images/faq-icon9.svg";
import faqIcon10 from "../../../assets/images/faq-icon10.svg";
import faqIcon11 from "../../../assets/images/faq-icon11.svg";
import faqIcon12 from "../../../assets/images/faq-icon12.svg";
import faqIcon13 from "../../../assets/images/faq-icon13.svg";
import faqIcon14 from "../../../assets/images/faq-icon14.svg";
import faqIcon15 from "../../../assets/images/faq-icon15.svg";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel
} from "react-accessible-accordion";
import OutsideClickHandler from "react-outside-click-handler";

export const FunktionenModal = (props) => {
  const FunktionenDataList = [
    {
      questionIcon : faqIcon1,
      questionTitle: "Heizung",
      questionSubTitle: "z.B. smarte Heizkörper- oder Fußbodenheizungsthermostate",
      answer: [
          "Zentrale Überwachung der Heizung per App",
          "Fernzugriff auf Heizung per App",
          "Intelligente Heizsparpläne (z.B. Energiespar-Modus bei Nacht)",
          "Statistiken über Energieverbrauch",
          "Erkennung von Sparpotential in Energieverbrauch",
          "Smarte Temperaturkontrolle der gesamten Heizungsanlage",
          "Smarte Einzelraumregelung per App oder Thermostat",
          "Benachrichtigung über Änderungen im System",
          "Temperatur halten bei Anwesenheit",
          "Frostschutz der Heizungsanlage bei Minusgraden"
      ],
    },
    {
      questionIcon : faqIcon2,
      questionTitle: "Beschattung",
      questionSubTitle: "z.B. Rollladen-, Jalousien-, oder Markisensteuerung",
      answer: [
          "Zentrale Steuerung der Rollläden, Raffstores oder Jalousien per App",
          "Anwesenheit simulieren (z.B. wenn Sie im Urlaub sind)",
          "Einzelraumsteuerung der Rollläden per App oder Taster",
          "Rollläden fahren automatisch runter (z.B. bei Dämmerung, Uhrzeit oder Sonnenstand)",
          "Tageslichtwecker (Rollladen fahren mit Sonnenaufgang hoch)",
          "Alarmmodus “Haus abriegeln” bei Einbruch",
          "Optimale Helligkeit anhand natürlichem Licht regeln",
          "Lamellen stellen bei Raffstores anhand Sonnenstand",
          "Frost-, Sturm- und Windschutz der Rollläden oder Raffstores"
      ],
    },
    {
      questionIcon : faqIcon3,
      questionTitle: "Beleuchtung",
      questionSubTitle: "z.B. smarte Innen- und Außenbeleuchtung oder smarte Leuchtmittel ",
      answer: [
          "Zentrale Steuerung der Beleuchtung per App",
          "Anwesenheit simulieren (z.B. wenn Sie im Urlaub sind)",
          "Beleuchtung anhand Bewegungs- oder Präsenzerkennung steuern",
          "Intelligente Wegebeleuchtung bei Nacht",
          "Einfache Erstellung von Lichtszenen je Atmosphäre",
          "Dimmung oder Farbsteuerung der Beleuchtung",
          "Automatische Schaltung der Beleuchtung (z.B. bei Verlassen des Hauses)",
          "Optimale Helligkeit anhand natürlichem Licht regeln",
          "Abschalten der Beleuchtung, wenn nicht benötigt",
          "Tageslichtwecker (Simulation von Sonnenaufgang durch Hochdimmen)"
      ],
    },
    {
      questionIcon : faqIcon4,
      questionTitle: "Energie",
      questionSubTitle: "z.B. Energiemanagement für PV-Anlage, Ladestation und Smart Meter",
      answer: [
          "Zentrale Überwachung des Stromverbrauchs in der App",
          "Zentral alle Verbraucher ausschalten (z.B. beim Verlassen des Hauses)",
          "Energiestatistiken und Verbrauchsverhalten",
          "Lastabhängige Szenarien",
          "Einsicht der Energieerzeugung durch PV-Anlage",
          "Schaltung der E-Ladestation abhängig produzierter Solarenergie"
      ],
    },
    {
      questionIcon : faqIcon5,
      questionTitle: "Steckdosen",
      questionSubTitle: "z.B. Schaltung und Energiemessung von Verbrauchern (z.B. Lampe)",
      answer: [
          "Schaltung einzelner Verbraucher (z.B. Leselampe oder Kaffeemaschine)",
          "Auswertung des Stromverbrauchs bestimmter Verbraucher",
          "Verbraucher schalten um Anwesenheit zu simulieren (z.B. TV)"
      ],
    },
    {
      questionIcon : faqIcon6,
      questionTitle: "Bewegungsmelder",
      questionSubTitle: "z.B. Licht oder Alarm steuern durch Bewegung und Präsenz ",
      answer: [
          "Schaltung von Lichtszenen anhand Bewegung oder Präsenz",
          "Intelligente Wegbeleuchtung anhand Bewegung oder Präsenz",
          "Benachrichtigung über verdächtige Aktivitäten anhand Bewegung oder Präsenz",
          "Intelligente Außenbeleuchtung anhand Bewegung oder Präsenz"
      ],
    },
    {
      questionIcon : faqIcon7,
      questionTitle: "Alarmsystem",
      questionSubTitle: "z.B. Alarmkontakte für Türen und Fenster und Alarmsirenen",
      answer: [
          "Zentrale Überwachung und Steuerung des Alarms in der App",
          "Erkennung von geöffneten Fenstern ",
          "Benachrichtigung über geöffnete Fenster (z.B. bei Verlassen des Hauses)",
          "Alarmanlage “scharf schalgen” per App oder Taster",
          "Anwesenheitsabhängiger Einbruchsalarm per Sirene",
          "Tag-. Nacht- und Abwesenheitsmodus der Alarmanlage",
          "App-Benachrichtigungen bei verdächtiger Aktivität",
          "Aufgeschobenes “scharf schalten” der Alarmanlage (z.B. in 30min)",
          "Mehrstufier Alarm in aufbauenden Eskalationsstufen",
          "Automatische Protokollierung der verdächtigen Aktivitäten"
      ],
    },
    {
      questionIcon : faqIcon8,
      questionTitle: "Kameras",
      questionSubTitle: "z.B. Sicherheitskameras für Innen- und Außenbereich",
      answer: [
          "HD-Sicherheitskameras mit Ultra-Weitwinkel",
          "Intelligente Personen-, Tier- und Auto-Erkennung",
          "Bewegungs-Erkennung",
          "Zwei-Wege-Audio ",
          "Farbige Nachtsicht bei Kameras",
          "Zeitraffer-Aufnahme",
          "Wahlweise Speicherung per SD-Karte, lokalem Speicher oder Cloud",
          "Optionale Stromversorgung per Solarpanel"
      ],
    },
    {
      questionIcon : faqIcon9,
      questionTitle: "Rauchmelder",
      questionSubTitle: "z.B. intelligente Erkennung von Rauch und Brand",
      answer: [
          "App-Benachrichtigung im Brandfall (z.B. bei Abwesenheit)",
          "Mehrstufiger Alarm im Brandfall"
      ],
    },
    {
      questionIcon : faqIcon10,
      questionTitle: "Türstation",
      questionSubTitle: "z.B. smarte Videogegensprechanlage, Türgong und Innenstation",
      answer: [
          "Einsicht auf Videogegensprechanlage per App (auch unterwegs)",
          "Empfangen der Gäste per Videogegensprechanlage",
          "App-Benachrichtigung wenn jemand klingelt",
          "Automatische Antwortnachricht für Besucher (z.B. bei Abwesenheit)",
          "Historie der Besucher in der App",
          "Licht blinken, wenn jemand an der Tür klingelt"
      ],
    },
    {
      questionIcon : faqIcon11,
      questionTitle: "Zugang",
      questionSubTitle: "z.B. Tür und Tore smart öffnen per App, Zahlencode oder Fingerprint",
      answer: [
          "Gesicherte Öffnung der Tür per App",
          "Gesicherte Öffnung der Garage- und Hoftor per App",
          "Optional gesicherte Öffnung der Tür per Chip",
          "Optional gesicherte Öffnung der Tür per Zahlencode",
          "Optional gesicherte Öffnung der Tür per Fingerprint"
      ],
    },
    {
      questionIcon : faqIcon12,
      questionTitle: "Sound",
      questionSubTitle: "z.B. Heimkino, Multiroom-Sound oder Soundsystem für den Garten",
      answer: [
          "Zentrale Steuerung der Musik in der App",
          "Musik in verschiedenen Räumen abspielen",
          "Musik automatisch abspielen",
          "Erinnerungen und Nachrichten bei Ereignissen",
          "Autom. Wiedergabe von Playlisten",
          "Morgendlicher Wecker durch Lieblingsmusik",
          "Individuelle Musikpräferenzen je Raum",
          "Einfaches Steuern der Musik per Sprache, Taster oder Automatisierung",
          "Einbruchalarm über Lautsprecher",
          "Lautsprecher spielen Willkommensnachricht für Besucher",
          "Steuerung des Smart Homes (z.B. Licht) per Sprachsteuerung",
          "Automatisches Stoppen der Musik wenn TV geschaltet"
      ],
    },
    {
      questionIcon : faqIcon13,
      questionTitle: "Garten",
      questionSubTitle: "z.B. smarte Bewässerung, Mähroboter oder Wetterstation",
      answer: [
          "Intelligente Steuerung der Bewässerung (z.B. anhand Uhrzeit oder Sonnenstand)",
          "Heimkehr des Mähroboters bei Regen oder Start der Bewässerungsroutine",
          "Steuerung und Auswertung des Wetters in Echtzeit (z.B. Regen und Wind)",
          "Steuerung der Gartengeräte anhand Wetter (z.B. Regen und Wind)"
      ],
    },
    {
      questionIcon : faqIcon14,
      questionTitle: "Lüftung",
      questionSubTitle: "z.B. smarte Steuerung der zentralen oder dezentralen Lüftung",
      answer: [
          "Steuerung der zentralen oder dezentralen Lüftung per App",
          "Automatische Lüftung bei Rauchentwicklung",
          "Lüftung abschalten bei geöffneten Fenstern",
          "Automatische Lüftung bei hoher Luftfeuchtigkeit im Waschraum"
      ],
    },
    {
      questionIcon : faqIcon15,
      questionTitle: "Sonstiges",
      questionSubTitle: "z.B. smarte Steuerung von Sauna, Pool oder anderen Geräten",
      answer: [
          "Smarte Steuerung der Sauna (z.B. Saunaofen oder Beleuchtung)",
          "Smarte Steuerung der Pool-Anlage (z.B. Überdachung, Beleuchtung, Heizung)",
          "Smarte Steuerung nicht-intelligenter Geräte (z.B. alte Alarmanlage oder Lautsprecher)",
          "UV-, Temperatur- oder anderweitige Sensoren zur Automatisierung"
      ],
    }
  ]


  return (
    <div className={`modal-wrapper ${props.modalExtraClass}`}>
      <div className="modal-dialog">
          <OutsideClickHandler
              onOutsideClick={props.closeModal}
          >
        <div className="modal-content">
          <div className="modal-head">
            <h2>{props.modalTitle}</h2>
            <img src={crossIcon} alt="crossIcon" className="crossIcon" onClick={props.closeModal}/>
          </div>
          <div className="modal-body">
            <div className="funktionen-modal accordion-wrapper">
              <Accordion allowZeroExpanded preExpanded={[0]}>
                {
                  FunktionenDataList.map(({answer,questionSubTitle,questionTitle,questionIcon}, index)=>{
                    return(
                        <AccordionItem key={`question-${index}`} uuid={index}>
                          <AccordionItemHeading>
                            <AccordionItemButton>
                              <figure className="flex items-center">
                                <img src={questionIcon} alt="questionIcon"/>
                                <figcaption>
                                  <h5>{questionTitle}</h5>
                                  <p>{questionSubTitle}</p>
                                </figcaption>
                              </figure>
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <div className="question-list">
                              <ul className="list-none">
                                {
                                  answer.map((answer,index)=>{
                                    return(
                                      <li key={`answer-${index}`}>
                                        {answer}
                                      </li>
                                    )
                                  })
                                }
                              </ul>
                            </div>
                          </AccordionItemPanel>
                        </AccordionItem>
                    )
                  })
                }
              </Accordion>
            </div>
          </div>
        </div>
          </OutsideClickHandler>
      </div>
    </div>
  );
};
