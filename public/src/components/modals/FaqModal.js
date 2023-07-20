import crossIcon from "../../assets/images/close.svg";
import down from "../../assets/images/download.svg";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { Link } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";

const FaqModal = (props) => {
  return (
    <div className={`modal-wrapper ${props.modalExtraClass}`}>
      <div className="modal-dialog">
        <OutsideClickHandler onOutsideClick={props.closeModal}>
          <div className="modal-content">
            <div className="modal-head">
              <h2>{props.modalTitle}</h2>
              <img
                src={crossIcon}
                alt="crossIcon"
                className=" crossIcon"
                onClick={props.closeModal}
              />
            </div>
            <div className="modal-body">
              <div className="accordion-wrapper simple-faq">
                <Accordion allowZeroExpanded preExpanded={["a"]}>
                  <AccordionItem uuid="a">
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        Was passiert, nachdem Sie uns beauftragt haben?
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <div className="question-list">
                        <ul className="list-none">
                          <li>
                            <strong>1. Vorbereitung der Installation</strong>
                            <p>
                              Nach Beauftragung beginnt Ihr technischer
                              Projektleiter mit den Vorbereitungen und Ihr
                              Installateur prüft die örtlichen Gegebenheiten.
                              Gerne können Sie hier im Vorfeld bereits die
                              nötigen Vorbereitungen einsehen:{" "}
                              <Link to="#">
                                Installationshinweise herunterladen
                                <img src={down} alt="download" />
                              </Link>
                            </p>
                          </li>
                          <li>
                            <strong>2. Montage und Installation</strong>
                            <p>
                              Ihr Installateurteam verdrahtet, montiert und
                              programmiert die Smart Home Komponenten und
                              richtet Automatisierungen in der Zentrale ein.
                            </p>
                          </li>
                          <li>
                            <strong>3. Inbetriebnahme und Einweisung</strong>
                            <p>
                              Im Anschluss wird Ihr Installateur Ihr System in
                              Betrieb nehmen und Sie in einer ausführlichen
                              Führung in das System einweisen.{" "}
                            </p>
                          </li>
                          <li>
                            <strong>4. Willkommen in Ihrem Smart Home</strong>
                            <p>
                              Wir wünschen Ihnen viel Freude mit Ihrem neuen
                              Smart Home. Bei auftretenden Problemen, Fragen
                              oder Gewährleistungsfällen können Sie sich
                              selbstverständlich jederzeit bei uns melden.
                            </p>
                          </li>
                        </ul>
                      </div>
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        Welche Vorbereitungen für die Installation müssen
                        gegeben sein?
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <div className="question-list">
                        <ul className="list-none">
                          <li>
                            <p>
                              Nach Beauftragung wird sich Ihr zugewiesener
                              Projektmanager zur Vorbereitung der Installation
                              bei Ihnen melden und Sie durch die notwendigen
                              bauseiten Rahmenbedingungen führen. Diese können
                              Sie hier im Vorfeld einsehen:{" "}
                              <Link to="#">
                                Installationshinweise herunterladen
                                <img src={down} alt="download" />
                              </Link>
                            </p>
                          </li>
                        </ul>
                      </div>
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        Kann ich meine Bestellung ändern und/oder erweitern?
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <div className="question-list">
                        <ul className="list-none">
                          <li>
                            <p>
                              Selbstverständlich können Sie Ihre Bestellung bis
                              zu 2 Wochen vor dem geplanten Installationstermin
                              ändern und/oder erweitern. Sprechen Sie hierzu
                              einfach Ihren Ansprechpartner an.
                            </p>
                          </li>
                        </ul>
                      </div>
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        Kann ich meine Bestellung stornieren?
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <div className="question-list">
                        <ul className="list-none">
                          <li>
                            <p>
                              Selbstverständlich, können Sie Ihre Bestellung
                              stornieren. Jenachdem wie kurzfristig Sie vor der
                              bereits terminlich fixierten Installation
                              stornieren möchten, können die
                              Stornierungsbedingungen abweichen. Sehen Sie daher
                              unsere AGBs ein: www.vays.de/agb
                            </p>
                          </li>
                        </ul>
                      </div>
                    </AccordionItemPanel>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </OutsideClickHandler>
      </div>
    </div>
  );
};
export default FaqModal;
