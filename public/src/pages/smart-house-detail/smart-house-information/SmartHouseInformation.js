import SmartSidebar from "./smart-sidebar/SmartSidebar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { Link } from "react-router-dom";
import ProgressbarCount from "../../../components/ProgressbarCount";
import { ConfigurationModal } from "../../../components/modals/ConfigurationModal";
import { useEffect, useState } from "react";
import FaqModal from "../../../components/modals/FaqModal";
import FunctionImageComponent from "../../home/functions-control/FunctionImageComponent";
import ServiceImageComponent from "../../home/service-control/ServiceImageComponent";

export default function SmartHouseInformation({ finalDataObject }) {
  const [openExpertAdviceModal, setOpenExpertAdviceModal] = useState(false);
  const [openFaqModal, setOpenFaqModal] = useState(false);
  useEffect(() => {
    if (openExpertAdviceModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openExpertAdviceModal]);
  useEffect(() => {
    if (openFaqModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openFaqModal]);

  const sliderComponentsList = [
    { slideComponent: <FunctionImageComponent /> },
    { slideComponent: <ServiceImageComponent /> },
  ];
  return (
    <>
      <div className="slide-wrapper smart_house smart_house_detail flex items-start">
        <Link to="#" className="active"></Link>
        <div className="content-side">
          <div className="image-wrapper flex column-direction">
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
              {sliderComponentsList.map(({ slideComponent }, index) => (
                <SwiperSlide key={index}>{slideComponent}</SwiperSlide>
              ))}
            </Swiper>
            <ProgressbarCount />
          </div>
        </div>
        <div className="sidebar-options">
          <SmartSidebar
            finalDataObject={finalDataObject}
            openModal={() => {
              setOpenExpertAdviceModal(!openExpertAdviceModal);
            }}
            faqOpenModal={() => {
              setOpenFaqModal(!openFaqModal);
            }}
          />
        </div>
      </div>
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
        />
      )}
      {openFaqModal === true && (
        <FaqModal
          modalExtraClass="faq-wrapper"
          modalTitle="Häufige Fragen"
          closeModal={() => {
            setOpenFaqModal(!openFaqModal);
          }}
        />
      )}
    </>
  );
}
