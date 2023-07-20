import ServiceForm from "./service-form/ServiceForm";
import "react-circular-progressbar/dist/styles.css";
import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { DetailedSliderModal } from "../../../components/modals/DetailedSliderModal";
import ServiceImageComponent from "./ServiceImageComponent";

const ServiceControl = () => {
  const [activeIndexes, setActiveIndexes] = useState([0]);
  const [openDetailedSlideModal, setOpenDetailedSlideModal] = useState(false);
  const [isDivVisible, setDivVisible] = useState(true);
  const [isDivVisible2, setDivVisible2] = useState(true);

  useEffect(() => {
    if (openDetailedSlideModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openDetailedSlideModal]);


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
        className="slide-wrapper service_control flex items-start"
        id="three"
      >
        {isDivVisible && <Link activeClass="active" className="abc" smooth spy offset={-400} to="three"></Link>}
        {isDivVisible2 && <Link activeClass="active" className="abd" smooth spy offset={-150} to="three"></Link>}
        <div className="content-side">
          <div className="image-wrapper flex column-direction">
            <ServiceImageComponent activeIndexes={activeIndexes} />
          </div>
        </div>
        <div className="sidebar-options">
          <ServiceForm
            activeIndexes={activeIndexes}
            setActiveIndexes={setActiveIndexes}
            openModal={() => {
              setOpenDetailedSlideModal(!openDetailedSlideModal);
            }}
          />
        </div>
      </div>
      {openDetailedSlideModal === true && (
        <DetailedSliderModal
          modalExtraClass="detailed-modal-wrapper"
          button_text="Anruf anfordern"
          closeModal={() => {
            setOpenDetailedSlideModal(!openDetailedSlideModal);
          }}
        />
      )}
    </>
  );
};
export default ServiceControl;
