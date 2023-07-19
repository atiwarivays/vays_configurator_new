import installationImage from "../../../assets/images/installation-bg.webp";

import InstallationProcess from "./installation-process/InstallationProcess";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-scroll";
import { DetailedModal } from "../../../components/modals/DetailedModal";
import installationsideImage from "../../../assets/images/installationsideImage.webp";

import { useEffect, useState } from "react";
import AutomatisierungSliderModal from "../../../components/modals/AutomatisierungSliderModal";
import SystemIntegratedModal from "../../../components/modals/system-integrated-modal/SystemIntegratedModal";
import fordermitImage from "../../../assets/images/fordermit.webp";
import wunschterminImage from "../../../assets/images/wunschtermin.webp";

import WartungsserviceListData from "../../../components/modals/WartungsserviceListData.json";
import wartungsserviceImage from "../../../assets/images/wartungsservice.webp";
import gewahrleistungImage from "../../../assets/images/gewahrleistung.webp";
import garantienImage from "../../../assets/images/garantien.webp";
import FaqModal from "../../../components/modals/FaqModal";

const Installation = () => {
  const [isDivVisible, setDivVisible] = useState(true);
  const [isDivVisible2, setDivVisible2] = useState(true);
  const [openModal, setOpenModal] = useState({
    faqModal: false,
    detailedInstallationModal: false,
    automatisierungModal: false,
    systemIntegrated: false,
    fordermittelModal: false,
    wunschterminModal: false,
    detailedWithListModal: false,
    gewahrleistungModal: false,
    garantienModal: false,
  });

  const closeModal = (modalName) => {
    setOpenModal({
      ...openModal,
      [modalName]: false,
    });
  };

  useEffect(() => {
    if (
      openModal.detailedInstallationModal ||
      openModal.automatisierungModal ||
      openModal.systemIntegrated ||
      openModal.fordermittelModal ||
      openModal.wunschterminModal ||
      openModal.detailedWithListModal ||
      openModal.gewahrleistungModal ||
      openModal.garantienModal ||
      openModal.faqModal
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [
    openModal.detailedInstallationModal,
    openModal.automatisierungModal,
    openModal.systemIntegrated,
    openModal.fordermittelModal,
    openModal.wunschterminModal,
    openModal.detailedWithListModal,
    openModal.gewahrleistungModal,
    openModal.garantienModal,
    openModal.faqModal,
  ]);


  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth <= 2550) {
        setDivVisible(false);
      } else {
        setDivVisible(true);
      }
      if (window.innerWidth >= 2551) {
        setDivVisible2(false);
      } else {
        setDivVisible2(true);
      }
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <>
      <div
        className="slide-wrapper installation_control control_options flex items-start"
        id="four"
      >
        {isDivVisible && <Link activeClass="active" className="abc" smooth spy offset={-400} to="four"></Link>}
        {isDivVisible2 && <Link activeClass="active" className="abd" smooth spy offset={-150} to="four"></Link>}
        <div className="content-side">
          <div className="image-wrapper flex column-direction">
            <figure>
              <img src={installationImage} alt="installationImage" />
            </figure>
          </div>
        </div>
        <div className="sidebar-options">
          <InstallationProcess
            openModal={() => {
              setOpenModal((prevState) => ({
                ...prevState,
                detailedInstallationModal: !prevState.detailedInstallationModal,
              }));
            }}
            automatisierungModal={() => {
              setOpenModal((prevState) => ({
                ...prevState,
                automatisierungModal: !prevState.automatisierungModal,
              }));
            }}
            integrationenModal={() => {
              setOpenModal((prevState) => ({
                ...prevState,
                systemIntegrated: !prevState.systemIntegrated,
              }));
            }}
            fordermittelModal={() => {
              setOpenModal((prevState) => ({
                ...prevState,
                fordermittelModal: !prevState.fordermittelModal,
              }));
            }}
            wunschterminModal={() => {
              setOpenModal((prevState) => ({
                ...prevState,
                wunschterminModal: !prevState.wunschterminModal,
              }));
            }}
            wartungsserviceModal={() => {
              setOpenModal((prevState) => ({
                ...prevState,
                detailedWithListModal: !prevState.detailedWithListModal,
              }));
            }}
            gewahrleistungModal={() => {
              setOpenModal((prevState) => ({
                ...prevState,
                gewahrleistungModal: !prevState.gewahrleistungModal,
              }));
            }}
            garantienModal={() => {
              setOpenModal((prevState) => ({
                ...prevState,
                garantienModal: !prevState.garantienModal,
              }));
            }}
          />
        </div>
      </div>
      {openModal.faqModal === true && (
        <FaqModal
          modalExtraClass="faq-wrapper"
          modalTitle="Häufige Fragen"
          closeModal={() => closeModal("faqModal")}
        />
      )}
      {openModal.detailedInstallationModal === true && (
        <DetailedModal
          modalExtraClass="detailed-modal-wrapper single-detail"
          subtitle={false}
          title={[<h2>Installation</h2>]}
          modalDescription={[
            <p>
              Die professionelle Montage, Installation, Programmierung und
              Einweisung wird von einem regionalen Team an zertifizierten Smart
              Home Elektroinstallateuren bei Ihnen vor Ort ausgeführt.
            </p>,
            <p>
              Nach Beauftragung prüft Ihr persönlicher Elektromeister und
              Projektleiter mit Ihnen die Konfiguration. Anschließend werden die
              bauseitigen Gegebenheiten vor Ort vor Beginn der Arbeiten nochmals
              intensiv geprüft.
            </p>,
            <p>
              Weiterführende Hinweise zur Installation, sowie zu den nächsten
              Schritten können Sie im Bereich{" "}
              <a
                href="javascript:void(0)"
                onClick={() => {
                  setOpenModal({
                    ...openModal,
                    faqModal: true,
                    detailedInstallationModal: false,
                  });
                }}
              >
                Häufige Fragen
              </a>{" "}
              einsehen.
            </p>,
          ]}
          button_text="Anruf anfordern"
          button_area={false}
          modalSideImage={installationsideImage}
          closeModal={() => closeModal("detailedInstallationModal")}
        />
      )}

      {openModal.automatisierungModal === true && (
        <AutomatisierungSliderModal
          modalExtraClass="automatisierung-modal-wrapper"
          closeModal={() => closeModal("automatisierungModal")}
        />
      )}

      {openModal.systemIntegrated && (
        <SystemIntegratedModal
          modalExtraClass="system-integrated-wrapper"
          modalTitle="Wählen Sie bestehenden Systeme"
          button_text="Auswählen"
          closeModal={() => closeModal("systemIntegrated")}
        />
      )}

      {openModal.fordermittelModal === true && (
        <DetailedModal
          modalExtraClass="detailed-modal-wrapper"
          subtitle={false}
          title={[<h2>Fördermittel</h2>]}
          modalDescription={[
            <p>
              Das Bundesamt für Wirtschaft und Ausfuhrkontrolle (BAFA) und die
              Kreditanstalt für Wiederaufbau (KfW) bezuschussen Ihre Smart Home
              Investition mit <b>15% Förderung.</b> Unsere Fördermittelexperten
              beraten Sie gerne, unterstützen Sie bei der Beantragung und
              übernehmen die gesamte Kommunikation mit der Förderstelle.
            </p>,
            <p>
              Die Förderung gilt nur für Bestandsgebäude (älter als 10 Jahre)
              und bedingt die Installation durch einen Fachbetrieb. Es werden
              pro Wohneinheit jährlich nur max. 60.000€ Fördervolumen
              bereitgestellt.
            </p>,
          ]}
          button_text="Anruf anfordern"
          button_area={false}
          modalSideImage={fordermitImage}
          modalImageClass="fordermittel-img"
          closeModal={() => closeModal("fordermittelModal")}
        />
      )}

      {openModal.wunschterminModal === true && (
          <DetailedModal
              modalExtraClass="detailed-modal-wrapper"
              subtitle={false}
              title={[<h2>Wunschtermin</h2>]}
              modalDescription={[
                <p>
                  Wir versprechen Ihnen den schnellstmöglichen Einbau Ihres Smart Home Systems. Dafür benötigen wir lediglich ca. 4 Wochen Vorlaufszeit zur genauen Projektierung, Lieferung und Vorbereitung der Installateure.
                </p>,
                <p>
                  Wir geben immer unser Bestes, Ihren Wunschtermin zu ermöglichen, bitten jedoch um Verständnis, dass dies nicht in jedem Falle garantiert werden kann.
                </p>,
              ]}
              modalSideImage={wunschterminImage}
              modalImageClass="fordermittel-img"
              closeModal={() => closeModal("wunschterminModal")}
          />
      )}


      {openModal.detailedWithListModal === true && (
        <DetailedModal
          modalExtraClass="detailed-modal-wrapper"
          subtitle={false}
          title={[<h2>Wartungsservice</h2>]}
          beforeListTitle={[<small>Ihr Rundum-Sorglos-Service.</small>]}
          WartungsserviceList={true}
          WartungsserviceListData={WartungsserviceListData}
          button_text="Anruf anfordern"
          button_area={false}
          modalSideImage={wartungsserviceImage}
          closeModal={() => closeModal("detailedWithListModal")}
        />
      )}
      {openModal.gewahrleistungModal === true && (
        <DetailedModal
          modalExtraClass="detailed-modal-wrapper"
          subtitle={false}
          title={[<h2>Gewährleistung</h2>]}
          modalDescription={[
            <p>
              Üblicherweise erhalten Sie von den Smart Home Herstellern selbst
              lediglich die gesetzliche Hersteller-Gewährleistung für 2 Jahre.
            </p>,
            <p>
              Darüber hinaus können Sie Ihre Gewährleistung mit uns auf 3 Jahre
              oder 5 Jahre, sowie mit dem Wartungsservice sogar auf unbegrenzte
              Zeit verlängern.{" "}
            </p>,
          ]}
          button_text="Anruf anfordern"
          button_area={false}
          modalSideImage={gewahrleistungImage}
          closeModal={() => closeModal("gewahrleistungModal")}
        />
      )}
      {openModal.garantienModal === true && (
        <DetailedModal
          modalExtraClass="detailed-modal-wrapper"
          subtitle={false}
          title={[<h2>Garantien</h2>]}
          modalDescription={[
            <p>
              Wir sind stolz darauf, Ihnen die besten Garantien am Markt
              aussprechen zu können.
            </p>,
            <p>
              Diese können wir Ihnen aussprechen, da wir in unseren Smart Home
              Konfigurationen ausschließlich sorgfältig aufeinander abgestimmte
              Komponenten von geprüften Smart Home Herstellern verwenden und
              unsere Systeme zudem ausschließlich von zertifizierten Experten
              verbaut werden.
            </p>,
          ]}
          button_text="Anruf anfordern"
          button_area={false}
          modalSideImage={garantienImage}
          closeModal={() => closeModal("garantienModal")}
        />
      )}
    </>
  );
};
export default Installation;
