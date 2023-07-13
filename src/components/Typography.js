import { ConfigurationModal } from "./modals/ConfigurationModal";
import "./typography.scss";
import { useState } from "react";
import { DetailedModal } from "./modals/DetailedModal";
import sideImageOne from "../assets/images/modal-image.jpg";
import { IndividualConfigurationModal } from "./modals/IndividualConfigurationModal";
import { SmartHomeModal } from "./modals/smart-home-modal/SmartHomeModal";
import { Link } from "react-router-dom";

export default function Typography() {
  const [openSaveConfigurationModal, setOpenSaveConfigurationModal] = useState(false);
  const [openDetailedModal, setOpenDetailedModal] = useState(false);
  const [openIndividualConfigurationModal, setOpenIndividualConfigurationModal] = useState(false);
  const [openSmartHomeModal, setOpenSmartHomeModal] = useState(false);

  return (
    <>
      <div className="typography-wrapper">
        <div className="container">
          <ul className="list-none flex items-start flex-wrap">
            <li>
              <button
                className="submit-button"
                onClick={() => {
                  setOpenSaveConfigurationModal(true);
                }}
              >
                Save Configuration Modal
              </button>
            </li>
            <li>
              <button
                className="submit-button"
                onClick={() => {
                  setOpenDetailedModal(true);
                }}
              >
                Personal Advice Modal
              </button>
            </li>
            <li>
              <button
                className="submit-button"
                onClick={() => {
                  setOpenIndividualConfigurationModal(true);
                }}
              >
                Individual Configuration
              </button>
            </li>
            <li>
              <button
                className="submit-button"
                onClick={() => {
                  setOpenSmartHomeModal(true);
                }}
              >
                Open Smart Home
              </button>
            </li>
          </ul>
        </div>
      </div>

      {openSmartHomeModal === true && (
        <SmartHomeModal
          modalExtraClass="smart-home-wrapper"
          modalTitle="Smart Home Bereiche"
          button_text="Auswählen"
          closeModal={() => {
            setOpenSmartHomeModal(!openSmartHomeModal);
          }}
        />
      )}

      {openIndividualConfigurationModal === true && (
        <IndividualConfigurationModal
          modalExtraClass="individual-configuration"
          modalTitle="Individuelle Konfiguration anfragen"
          button_text="Jetzt anfragen"
          modalDescription={[
            <p>
              Bitte geben Sie Ihre Kontaktdaten ein, damit wir eine individuelle Konfiguration für Sie erstellen können.
            </p>,
          ]}
          closeModal={() => {
            setOpenIndividualConfigurationModal(!openIndividualConfigurationModal);
          }}
        />
      )}

      {openDetailedModal === true && (
        <DetailedModal
          modalExtraClass="detailed-modal-wrapper"
          subtitle={[<span>Kostenlos und unverbindlich</span>]}
          title={[<h2>Persönliche Fachberatung</h2>]}
          modalDescription={[<p>Ihr Smart Home Experte meldet sich gleich telefonisch bei Ihnen.</p>]}
          button_text="Anruf anfordern"
          button_area={true}
          modalSideImage={sideImageOne}
          closeModal={() => {
            setOpenDetailedModal(!openDetailedModal);
          }}
        />
      )}

      {openSaveConfigurationModal === true && (
        <ConfigurationModal
          modalTitle="Ihre Konfiguration speichern?"
          button_text="Speichern"
          modalDescription={[
            <p>Möchten Sie Ihre Konfiguration abspeichern bevor Sie gehen? Wir senden Ihnen diese dann per Email.</p>,
          ]}
          bottomLineIntro={[
            <p>
              Indem Sie auf “Konfiguration prüfen lassen” klicken, akzeptieren Sie unsere{" "}
              <Link to="https://vays.de/datenschutz/" target="_blank">
                Datenschutzbedingungen
              </Link>
              .
            </p>,
          ]}
          closeModal={() => {
            setOpenSaveConfigurationModal(!openSaveConfigurationModal);
          }}
        />
      )}
    </>
  );
}
