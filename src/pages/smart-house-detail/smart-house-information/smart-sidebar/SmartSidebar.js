import { Link } from "react-router-dom";
import trustpilotScreeShot from "../../../../assets/images/trustpilotScreeShot.jpg";
import download from "../../../../assets/images/download.svg";
import btnLoader from "../../../../assets/images/loader2.gif"
import pay from "../../../../assets/images/pay.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import React from "react";
import { formatGermanPrice } from "../../../../utils/constants/api";
import { useState } from "react";

export default function SmartSidebar({
  finalDataObject,
  openModal,
  faqOpenModal,
}) {
  //  console.log(finalDataObject);
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <Link to={"/"} className="collapse-btn">
        <i className="fa fa-angle-up"></i> Konfiguration ändern
      </Link>
      <h2 className="sidebar-title">Ihre Smart Home Konfiguration</h2>
      <aside className="side-widgets smart-house">
        <section>
          <Link
            className={`pdf-down ${isLoading ? "loader-btn pdf-loader disabled" : ''}`}
            to={finalDataObject.quotation_pdf_url}
            onClick={() => {
              setLoading(true);
              setTimeout(function () {
                setLoading(false);
              }, 14000);
            }}
          >
            {isLoading ? (<div class="pdf-loader-text"><p>Bitte warten Sie. Ihr Angebot wird generiert</p></div>) :
              (<p>PDF herunterladen <img src={download} alt="download" /></p>)}
          </Link>
          {finalDataObject.installationsservice === "Installation" && (
            <>
              <h6>Ihr Wunschtermin</h6>
              <span>{finalDataObject.installationDate}</span>
              <h6>Geschätzte Installationstage</h6>
              <span>ca. {finalDataObject.installationsdauer} Tage</span>
            </>
          )}

          <ul className="scroll-list flex column-direction list-none">
            <li>
              Objekt <span>{finalDataObject.installationsort}</span>
            </li>
            <li>
              Projekt <span>{finalDataObject.bauvorhaben}</span>
            </li>
            <li>
              Phase <span>{finalDataObject.bauphase}</span>
            </li>
            <li>
              Raume <span>{finalDataObject.raume}</span>
            </li>
            {/* <li>
              Intention
              <span>
                {finalDataObject.intentions.map((data, index) => (
                  <React.Fragment key={index}>
                    {data}
                    <br />
                  </React.Fragment>
                ))}
              </span>
            </li> */}
            <li>
              System <span>{finalDataObject.hersteller}</span>
            </li>
            <li>
              Funktionen
              <span>
                {finalDataObject.funktionen.map((data, index) => (
                  <React.Fragment key={index}>
                    {data}
                    <br />
                  </React.Fragment>
                ))}
              </span>
            </li>
            <li>
              Bedienung
              <span>
                {finalDataObject.bedienung.map((data, index) => (
                  <React.Fragment key={index}>
                    {data}
                    <br />
                  </React.Fragment>
                ))}
              </span>
            </li>
            <li>
              Installationsservice
              <span>{finalDataObject.installationsservice}</span>
            </li>

            {finalDataObject.installationsservice === "Installation" && (
              <>
                <li>
                  Heimautomatisierung
                  <span>{finalDataObject.heimautomatisierung}</span>
                </li>
                <li>
                  Integration vorhandener systeme
                  <span>{finalDataObject.integration_vorhandener_systeme}</span>
                </li>
                <li>
                  Fördermittel{" "}
                  <span>{finalDataObject.fordermittelservice}</span>
                </li>
              </>
            )}

            {finalDataObject.laufzeit_wartungsservice !== "0 Jahr" && (
              <li>
                Laufzeit Wartungsservice
                <span>{finalDataObject.laufzeit_wartungsservice}</span>
              </li>
            )}

            {finalDataObject.laufzeit_wartungsservice === "0 Jahr" && (
              <li>
                Gewährleistung
                <span>
                  {finalDataObject.laufzeit_gewahrleistung
                    ? finalDataObject.laufzeit_gewahrleistung
                    : "2 Jahre"}
                </span>
              </li>
            )}
          </ul>
        </section>
        <div className="button-box flex column-direction items-center content-justify-center">
          <div>
            <h4>
              Gesamtpreis
              <span>
                {formatGermanPrice(finalDataObject.totalPrice)}{" "}
                <small>inkl. MwSt</small>
              </span>
            </h4>
            <Link to={finalDataObject.checkout_url} target="_blank">
              <button className="submit-button">Zur Kasse</button>
            </Link>
            <button onClick={openModal} className="submit-button transparent">
              Bestellung prüfen lassen
            </button>
            <button onClick={faqOpenModal} className="transparent-button link">
              Häufig gestellte Fragen
            </button>
          </div>
        </div>
        <figure className="">
          <img src={pay} alt="pay" />
        </figure>
      </aside >
      <h2 className="sidebar-title">Bewertungen</h2>
      <aside className="side-widgets trustpilot">
        <img src={trustpilotScreeShot} alt="trustpilotScreeShot" />
        <div className="trustpilot-list">
          <h6>96% von 97 Bewertungen empfehlen uns.</h6>
          <ul className="list-none">
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
          </ul>
        </div>
        <div className="side-swiper-slide">
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            <SwiperSlide>
              <div className="frame-image">
                <iframe
                  width="400"
                  height="185"
                  src="https://www.youtube.com/embed/CaCeAsEUHSY"
                  title="Nominiert für Bestes Startup"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </aside>
    </>
  );
}
