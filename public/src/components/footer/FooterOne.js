import { Link } from "react-router-dom";
import FooterPrice from "./FooterPrice";
import { ConfigurationModal } from "../modals/ConfigurationModal";
import { useEffect, useState } from "react";

export default function FooterOne() {
  const [openConfigurationModal, setOpenConfigurationModal] = useState(false);

  useEffect(() => {
    if (openConfigurationModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openConfigurationModal]);
  return (
    <>
      <footer id="footer">
        <div className="container flex items-center">
          <FooterPrice />
          <div className="button-wrapper ml-auto">
            <button
              onClick={() => {
                setOpenConfigurationModal(true);
              }}
              className="submit-button transparent"
            >
              Konfiguration speichern
            </button>

            <button
              onClick={() => {
                setOpenConfigurationModal(true);
              }}
              className="submit-button second-btn"
            >
              Weiter zur Übersicht
            </button>
          </div>
        </div>
      </footer>
      {openConfigurationModal === true && (
        <ConfigurationModal
          modalTitle="Konfiguration speichern"
          button_text="Speichern"
          bottomLineIntro={[
            <p>
              Indem Sie auf “Speichern” klicken, akzeptieren Sie unsere{" "}
              <Link to="https://vays.de/datenschutz/" target="_blank">
                Datenschutzbedingungen
              </Link>
              .
            </p>,
          ]}
          closeModal={() => {
            setOpenConfigurationModal(!openConfigurationModal);
          }}
        />
      )}
    </>
  );
}
