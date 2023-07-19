import { Link } from "react-router-dom";
import FooterPrice from "./FooterPrice";
import { ConfigurationModal } from "../modals/ConfigurationModal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCheckoutUrl } from "../../utils/store-2/konfiguration-slice";

export default function FooterTwo() {
  const checkout_url = useSelector(getCheckoutUrl);

  const [openExpertAdviceModal, setOpenExpertAdviceModal] = useState(false);
  useEffect(() => {
    if (openExpertAdviceModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openExpertAdviceModal]);
  return (
    <>
      <footer id="footer">
        <div className="container flex items-center">
          <FooterPrice />
          <div className="button-wrapper ml-auto">
            <button
              className="submit-button transparent"
              onClick={() => {
                setOpenExpertAdviceModal(true);
              }}
            >
              Bestellung prüfen lassen
            </button>
            <Link to={checkout_url} target="_blank" className="second-btn submit-button">
              Zur Kasse
            </Link>
          </div>
        </div>
      </footer>
      {openExpertAdviceModal === true && (
        <ConfigurationModal
          modalTitle="Kostenlose Fachberatung "
          button_text="Anruf anfordern"
          modalDescription={[<p>Ihr persönlicher Smart Home Experte meldet sich schnellstmöglich bei Ihnen.</p>]}
          bottomLineIntro={[
            <p>
              Indem Sie auf “Konfiguration prüfen lassen” klicken, akzeptieren Sie unsere{" "}
              <Link to="https://vays.de/datenschutz/" target="_blank">Datenschutzbedingungen</Link>.
            </p>,
          ]}
          closeModal={() => {
            setOpenExpertAdviceModal(!openExpertAdviceModal);
          }}
          setOpenExpertAdviceModal={setOpenExpertAdviceModal}
          openExpertAdviceModal={openExpertAdviceModal}
        />
      )}
    </>
  );
}
