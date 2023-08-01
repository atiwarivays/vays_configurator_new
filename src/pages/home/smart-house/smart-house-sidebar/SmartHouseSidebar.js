import trustpilotScreeShot from "../../../../assets/images/trustpilotScreeShot.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { useSelector } from "react-redux";
import {
  getInstallationDate,
  getInstallationsdauer,
  getInstallationsservice,
} from "../../../../utils/store-2/konfiguration-slice";
import React from "react";

const SmartHouseSidebar = (props) => {
  const installationServiceValues = useSelector(getInstallationsservice);
  const installationsdauer = useSelector(getInstallationsdauer);
  const installationDate = useSelector(getInstallationDate);

  return (
    <>
      <>
        <h2 className="sidebar-title">Ihre Smart Home Konfiguration</h2>
        <aside className="side-widgets smart-house">
          <section>
            <h6>Ihr Wunschtermin</h6>
            <span>{installationDate}</span>
            {installationServiceValues.options[installationServiceValues.selectedOption].label === "Installation" && (
              <>
                <h6>Geschätzte Installationstage</h6>
                <span>ca. {installationsdauer} Tage</span>
              </>
            )}
            <button onClick={props.warenkorbModal} className="submit-button">
              Weiter zur Übersicht
            </button>
            <button onClick={props.expertAdviceModal} className="submit-button transparent">
              Persönliche Fachberatung
            </button>
            <button onClick={props.openModal} className="transparent-button link">
              Häufig gestellte Fragen
            </button>
          </section>
        </aside>
      </>

      <h2 className="sidebar-title">Bewertungen</h2>
      <aside className="side-widgets trustpilot">
        <img src={trustpilotScreeShot} alt="trustpilotScreeShot" />
        <div className="trustpilot-list">
          <h6>96% von 97 Bewertungen empfehlen uns.</h6>
          <ul className="list-none">
            <li>
              Zuverlässigkeit
              <div className="progressbar-points">
                <span className="base">
                  <span className="base-bar" style={{ width: "95%" }}></span>
                  <span className="base-points"></span>
                </span>
                4.8
              </div>
            </li>
            <li>
              Servicegrad
              <div className="progressbar-points">
                <span className="base">
                  <span className="base-bar" style={{ width: "90%" }}></span>
                  <span className="base-points"></span>
                </span>
                4.7
              </div>
            </li>
            <li>
              Funktionalität
              <div className="progressbar-points">
                <span className="base">
                  <span className="base-bar" style={{ width: "90%" }}></span>
                  <span className="base-points"></span>
                </span>
                4.7
              </div>
            </li>
          </ul>
        </div>
        <div className="side-swiper-slide">
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            <SwiperSlide>
              <div className="frame-image">
                <iframe
                  width="400"
                  height="185"
                  src="https://www.youtube.com/embed/O9FJSC5i9KE"
                  title="Erfahrungsbericht über VAYS von Tim Kroll"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </SwiperSlide>
            {/* <SwiperSlide>
              <div className="frame-image">
                <iframe
                  width="400"
                  height="185"
                  src="https://www.youtube.com/embed/O9FJSC5i9KE"
                  title="Erfahrungsbericht über VAYS   von Familie Jansen"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </SwiperSlide> */}
          </Swiper>
        </div>
      </aside>
    </>
  );
};
export default SmartHouseSidebar;
