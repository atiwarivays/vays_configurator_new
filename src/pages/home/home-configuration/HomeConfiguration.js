import imageSlideOne from "../../../assets/images/homeimg1.webp";
import ConfigurationForm from "./configuration-form/ConfigurationForm";
import IntentionForm from "./intention-form/IntentionForm";
import ZentraleForm from "./zentrale-form/ZentraleForm";
import { Link } from "react-scroll";
import { IntentionModal } from "../../../components/modals/intention-modal/IntentionModal";
import { useEffect, useState } from "react";
import { SystemeModal } from "../../../components/modals/tab-systeme-modal/SystemeModal";

const HomeConfiguration = () => {
  const [isDivVisible, setDivVisible] = useState(true);
  const [isDivVisible2, setDivVisible2] = useState(true);
  const [openIntention, setOpenIntention] = useState(false);
  const [openTabSystemeModal, setOpenTabSystemeModal] = useState(false);
  useEffect(() => {
    if (openIntention) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openIntention]);
  useEffect(() => {
    if (openTabSystemeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openTabSystemeModal]);


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
        className="slide-wrapper home_confirmation flex items-start"
        id="one"
      >
        {isDivVisible && <Link activeClass="active" className="abc" smooth spy offset={-350} to="one"></Link>}
        {isDivVisible2 && <Link activeClass="active" className="abd" smooth spy offset={-150} to="one"></Link>}
        <div className="content-side">
          <div className="image-wrapper flex column-direction">
            <figure>
              <img src={imageSlideOne} alt="imageSlideOne" />
            </figure>
          </div>
        </div>
        <div className="sidebar-options">
          <ConfigurationForm />
          {/* <IntentionForm
            openModal={() => {
              setOpenIntention(!openIntention);
            }}
          /> */}
          <ZentraleForm
            openModal={() => {
              setOpenTabSystemeModal(!openTabSystemeModal);
            }}
          />
        </div>
      </div>
      {openIntention === true && (
        <IntentionModal
          modalExtraClass="intention-modal-wrapper"
          modalTitle="Die Vorteile von Smart Home"
          button_text="Mehr Vorteile von Smart Home"
          closeModal={() => {
            setOpenIntention(!openIntention);
          }}
        />
      )}
      {openTabSystemeModal === true && (
        <SystemeModal
          modalExtraClass="tab-systeme-modal-wrapper"
          modalTitle="Systeme vergleichen"
          closeModal={() => {
            setOpenTabSystemeModal(!openTabSystemeModal);
          }}
        />
      )}
    </>
  );
};
export default HomeConfiguration;
