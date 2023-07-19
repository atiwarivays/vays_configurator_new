import "./footer.scss";
import { Link } from "react-router-dom";
import chatIcon from "../../assets/images/chat_icon.svg";
import { useState } from "react";

export default function Footer() {
  const [collapsedShow, setCollapsedShow] = useState(false);
  const collapsedBtn = () => {
    setCollapsedShow(!collapsedShow);
  };
  return (
    <>
      <div className={`mobile-collapsed-wrapper ${collapsedShow === true ? "active" : ""}`}>
        <button className="collapsed-btn fa fa-angle-down" onClick={() => collapsedBtn()}></button>
        <section className="box-title">
          <h4>50.000.00 €</h4>
          <span>Gesamtpreis inkl MwSt.</span>
        </section>
        <section className="data_wrapper">
          <ul className="list-none">
            <li>
              <span>
                Konfiguration zzgl. <br />
                Installation <br />
                (inkl. 19% MwSt.)
              </span>
              <h2>50.000.00 €</h2>
            </li>
            <li>
              <span>Mtl. Rate</span>
              <h3>ab 900,00 €</h3>
            </li>
            <li>
              <label htmlFor="foter" className="check-box">
                <input type="checkbox" id="foter" />
                <span>Alle Preise als Raten anzeigen</span>
              </label>
            </li>
            <li className="column-direction">
              <section className="w-100 flex content-justify-between">
                <h3>Installation</h3>
                <span>Mai 2022</span>
              </section>
              <section className="w-100 flex content-justify-between">
                <h3>Installation</h3>
                <span>Mai 2022</span>
              </section>
            </li>
            <li>
              <Link to="/">
                Konfiguration speichern <i className="fa fa-angle-right"></i>
              </Link>
            </li>
            <li>
              <Link to="/">
                PDF speichern <i className="fa fa-angle-right"></i>
              </Link>
            </li>
            <li className="column-direction content-justify-start items-start">
              <Link to="/">
                Konfiguration prüfen lassen <i className="fa fa-angle-right"></i>
              </Link>
              <small>Nicht sicher? Lassen Sie Ihre Konfiguration von einem Fachmann überprüfen.</small>
            </li>
          </ul>
        </section>
        <section className="flex items-center button-wrap">
          <Link to="/" className="submit-button transparent">
            Jetzt beauftragen
          </Link>
          <Link to="/">
            <img src={chatIcon} alt="chatIcon" />
          </Link>
        </section>
      </div>
    </>
  );
}
