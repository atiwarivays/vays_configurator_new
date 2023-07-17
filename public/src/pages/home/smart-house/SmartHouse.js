import SmartHouseSidebar from "./smart-house-sidebar/SmartHouseSidebar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { Link } from "react-scroll";
import ProgressbarCount from "../../../components/ProgressbarCount";
import FaqModal from "../../../components/modals/FaqModal";
import { useEffect, useState } from "react";
import { ConfigurationModal } from "../../../components/modals/ConfigurationModal";
import FunctionImageComponent from "../functions-control/FunctionImageComponent";
import ServiceImageComponent from "../service-control/ServiceImageComponent";

const SmartHouse = () => {
  const [openFaqModal, setOpenFaqModal] = useState(false);
  const [openExpertAdviceModal, setOpenExpertAdviceModal] = useState(false);
  const [openConfigurationModal, setOpenConfigurationModal] = useState(false);
  const [isDivVisible, setDivVisible] = useState(true);
  const [isDivVisible2, setDivVisible2] = useState(true);
  useEffect(() => {
    if (openFaqModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openFaqModal]);
  useEffect(() => {
    if (openExpertAdviceModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openExpertAdviceModal]);
  useEffect(() => {
    if (openConfigurationModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openConfigurationModal]);

  const sliderComponentsList = [
    { slideComponent: <FunctionImageComponent /> },
    { slideComponent: <ServiceImageComponent /> },
  ];


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
      <div className="slide-wrapper smart_house flex items-start" id="five">
        {isDivVisible && <Link activeClass="active" className="abc" smooth spy offset={-600} to="five"></Link>}
        {isDivVisible2 && <Link activeClass="active" className="abd" smooth spy offset={-150} to="five"></Link>}
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
          <SmartHouseSidebar
            openModal={() => {
              setOpenFaqModal(!openFaqModal);
            }}
            expertAdviceModal={() => {
              setOpenExpertAdviceModal(!openExpertAdviceModal);
            }}
            warenkorbModal={() => {
              setOpenConfigurationModal(!openConfigurationModal);
            }}
          />
        </div>
      </div>
      {openFaqModal === true && (
        <FaqModal
          modalExtraClass="faq-wrapper"
          modalTitle="Häufige Fragen"
          closeModal={() => {
            setOpenFaqModal(!openFaqModal);
          }}
        />
      )}
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
      {openConfigurationModal === true && (
        <ConfigurationModal
          modalTitle="Konfiguration speichern"
          button_text="Speichern"
          bottomLineIntro={[
            <p>
              Indem Sie auf “Speichern” klicken, akzeptieren Sie unsere <Link to="/">Datenschutzbedingungen</Link>.
            </p>,
          ]}
          closeModal={() => {
            setOpenConfigurationModal(!openConfigurationModal);
          }}
        />
      )}
    </>
  );
};
export default SmartHouse;
