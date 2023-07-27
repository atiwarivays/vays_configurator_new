import React, { useState } from "react";
import Select from "react-dropdown-select";
import listIcon1 from "../../../../assets/images/icon1.svg";
import listIcon2 from "../../../../assets/images/icon2.svg";
import listIcon3 from "../../../../assets/images/icon3.svg";
import MultiDatePicker from "react-multi-date-picker";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-scroll";
import downArrow from "../../../../assets/images/down-arrow-1.svg";

import { priceIncludedList, wartungList, german_language } from "../../../../utils/constants/constants";
import {
  getBauvorhaben,
  getFördermittelService,
  getHeimautomatisierung,
  getInstallationDate,
  getInstallationsservice,
  getIntegrationVorhandenerSysteme,
  getLaufzeitWartungsservice,
  get_laufzeit_gewährleistung,
  konfigurationActions,
} from "../../../../utils/store-2/konfiguration-slice";

const InstallationProcess = (props) => {
  const dispatch = useDispatch();
  const currentDate = new Date();
  const installationDate = useSelector(getInstallationDate);
  const setInstallationDate = (date) => {
    dispatch(konfigurationActions.updateInstallationDate(date.format("DD MMM YYYY")));
  };

  const installationService = useSelector(getInstallationsservice);
  const heimautomatisierung = useSelector(getHeimautomatisierung);
  const integrationVorhandenerSysteme = useSelector(getIntegrationVorhandenerSysteme);
  const fordermittelService = useSelector(getFördermittelService);
  const bauvorhaben = useSelector(getBauvorhaben);
  const laufzeitWartungsservice = useSelector(getLaufzeitWartungsservice);
  const laufzeit_gewährleistung = useSelector(get_laufzeit_gewährleistung);

  const handleSelectChange = (name) => (options) => {
    switch (name) {
      case "installationservice":
        {
          dispatch(konfigurationActions.updateSelectedInstallationsservice(options[0].value));
          if (options[0].value === 1) {
            dispatch(konfigurationActions.updateHeimautomatisierung(0));
            dispatch(konfigurationActions.updateIntegrationVorhandenerSysteme(0));
            dispatch(konfigurationActions.updateFördermittelService(1));
          } else {
            dispatch(konfigurationActions.updateFördermittelService(0));
          }
        }
        break;
      case "heimautomatisierung":
        dispatch(konfigurationActions.updateHeimautomatisierung(options[0].value));
        break;
      case "vorhandener":
        dispatch(konfigurationActions.updateIntegrationVorhandenerSysteme(options[0].value));
        break;
      case "fordermittelservice":
        dispatch(konfigurationActions.updateFördermittelService(options[0].value));
        break;
      case "wartungService":
        dispatch(konfigurationActions.updateLaufzeitWartungsservice(options[0].value));
        break;
      case "gewahrlewistung":
        dispatch(konfigurationActions.update_laufzeit_gewährleistung(options[0].value));
        break;
      default:
        break;
    }
  };

  const garantienList = [
    {
      listIcon: listIcon1,
      title: "Festpreisgarantie",
      description: "Sie kennen alle Kosten von Anfang an. Keine versteckten Kosten.",
    },
    {
      listIcon: listIcon2,
      title: "Best-Leistungsgarantie",
      description: "Kostenfreie Stornierung, wenn Sie am Markt bessere Leistung finden.",
    },
    {
      listIcon: listIcon3,
      title: "30 Tage “Geld zurück”",
      description: "Sind Sie nicht zufrieden, erhalten Sie bedingungslos Ihr Geld zurück.",
    },
  ];

  //For default values
  const [wartungDefaultValue] = useState(laufzeitWartungsservice.options[laufzeitWartungsservice.selectedOption].label);
  const [gewährleistungDefaultValue] = useState(
    laufzeit_gewährleistung.options[laufzeit_gewährleistung.selectedOption].label
  );
  const [installationserviceDefaultValue] = useState(
    installationService.options[installationService.selectedOption].label
  );
  const [heimautomatisierungDefaultValue] = useState(
    heimautomatisierung.options[heimautomatisierung.selectedOption].label
  );
  const [fordermittelServiceDefaultValue] = useState(
    fordermittelService.options[fordermittelService.selectedOption].label
  );
  const [integrationVorhandenerSystemeDefaultValue] = useState(
    integrationVorhandenerSysteme.options[integrationVorhandenerSysteme.selectedOption].label
  );

  return (
    <>
      <h2 className="sidebar-title">Installation</h2>
      <aside className="side-widgets installation-wrapper">
        <ul className="list-none flex column-direction installation_list">
          <li>
            <label htmlFor="">Im Preis inbegriffen</label>
            <ul className="list-none flex column-direction list-style-one">
              {priceIncludedList.map((list, index) => {
                return <li key={`list-${index}`}>{list}</li>;
              })}
            </ul>
          </li>
          <li>
            <label htmlFor="">Installationsservice</label>
            <Select
              options={installationService.options.map((item) => ({
                label: (
                  <p>
                    {item.label}
                    <small className="ml-auto">{item.included}</small>
                  </p>
                ),
                value: item.value,
              }))}
              onChange={handleSelectChange("installationservice")}
              values={[
                {
                  label: installationserviceDefaultValue,
                  value: 0,
                },
              ]}
            />
          </li>
          <li className="content-justify-center items-center">
            <button onClick={props.openModal} className="simple-btn">
              Details zur Installation
            </button>
          </li>
        </ul>
        {installationService.selectedOption === 0 && (
          <ul className="list-none flex column-direction">
            <li>
              <label htmlFor="">Installation Wunschtermin</label>
              <MultiDatePicker
                value={new Date(installationDate)}
                onChange={setInstallationDate}
                minDate={currentDate.setDate(currentDate.getDate() + 30)}
                locale={german_language}
                weekStartDayIndex={1}
              />
            </li>
            <li className="content-justify-center items-center">
              <button onClick={props.wunschterminModal} className="simple-btn">
                Details zum Wunschtermin
              </button>
            </li>

            <li>
              <label htmlFor="">Heimautomatisierung</label>
              <Select
                options={heimautomatisierung.options.map((item) => ({
                  label: (
                    <div className="heim-container">
                      <p
                        className={item.label === "Unbegrenzt Automatisierungen" ? "heim-name-unbegrenzt" : "heim-name"}
                      >
                        {item.label}
                      </p>
                      <p className="price">{item.included}</p>
                    </div>
                  ),
                  value: item.value,
                }))}
                onChange={handleSelectChange("heimautomatisierung")}
                values={[{ label: heimautomatisierungDefaultValue, value: 0 }]}
              />
            </li>

            <li className="content-justify-center items-center w-100">
              <button onClick={props.automatisierungModal} className="simple-btn">
                Beispiele Automatisierung
              </button>
            </li>
            <li>
              <label htmlFor="">Integration vorhandener Systeme</label>
              <Select
                options={integrationVorhandenerSysteme.options.map((item) => ({
                  label: (
                    <div className="heim-container">
                      <p
                        className={item.label === "Unbegrenzt Integrationen" ? "heim-name-Integrationen" : "heim-name"}
                      >
                        {item.label}
                      </p>
                      <p className="price">{item.included}</p>
                    </div>
                  ),
                  value: item.value,
                }))}
                onChange={handleSelectChange("vorhandener")}
                values={[{ label: integrationVorhandenerSystemeDefaultValue, value: 0 }]}
              />
            </li>
            <li className="content-justify-center items-center">
              <button onClick={props.integrationenModal} className="simple-btn">
                Integrationen wählen
              </button>
            </li>
          </ul>
        )}
      </aside>

      {bauvorhaben.selectedOption !== 3 && installationService.selectedOption === 0 && (
        <>
          <h2 className="sidebar-title">Fördermittel</h2>
          <aside className="side-widgets installation-wrapper">
            <ul className="list-none flex column-direction">
              <li>
                <label htmlFor="">Fördermittelservice</label>
                <Select
                  options={fordermittelService.options.map((item) => ({
                    label: (
                      <p>
                        {item.label}
                        <small className="ml-auto">{item.included}</small>
                      </p>
                    ),
                    value: item.value,
                  }))}
                  onChange={handleSelectChange("fordermittelservice")}
                  values={[{ label: fordermittelServiceDefaultValue, value: 0 }]}
                />
              </li>
              <li className="content-justify-center items-center">
                <button onClick={props.fordermittelModal} className="simple-btn">
                  Details zur Förderung
                </button>
              </li>
            </ul>
          </aside>
        </>
      )}
      <h2 className="sidebar-title">Wartung</h2>
      <aside className="side-widgets installation-wrapper">
        <ul className="list-none flex column-direction installation_list">
          <li>
            <label htmlFor="">Im Wartungsservice enthalten</label>
            <ul className="list-none flex column-direction list-style-one">
              {wartungList.map((list, index) => {
                return <li key={`list-${index}`}>{list}</li>;
              })}
            </ul>
          </li>
          <li>
            <label htmlFor="">Laufzeit Wartungsservice</label>
            <Select
              options={laufzeitWartungsservice.options.map((item) => ({
                label: (
                  <p>
                    {item.label}
                    <small className="ml-auto">{item.included}</small>
                  </p>
                ),
                value: item.value,
              }))}
              onChange={handleSelectChange("wartungService")}
              values={[{ label: wartungDefaultValue, value: 0 }]}
            />
          </li>
          <li className="content-justify-center items-center">
            <button onClick={props.wartungsserviceModal} className="simple-btn">
              Details zum Wartungsservice
            </button>
          </li>
        </ul>
      </aside>

      {laufzeitWartungsservice.selectedOption === 0 && (
        <>
          <h2 className="sidebar-title">Gewährleistung</h2>
          <aside className="side-widgets installation-wrapper">
            <ul className="list-none flex column-direction">
              <li>
                <label htmlFor="">Laufzeit Gewährleistung</label>
                <Select
                  options={laufzeit_gewährleistung.options.map((item) => ({
                    label: (
                      <p>
                        {item.label}
                        <small className="ml-auto">{item.included}</small>
                      </p>
                    ),
                    value: item.value,
                  }))}
                  onChange={handleSelectChange("gewahrlewistung")}
                  values={[{ label: gewährleistungDefaultValue, value: 0 }]}
                />
              </li>
              <li className="content-justify-center items-center">
                <button onClick={props.gewahrleistungModal} className="simple-btn">
                  Details zur Gewährleistung
                </button>
              </li>
            </ul>
          </aside>
        </>
      )}

      <h2 className="sidebar-title">Garantien</h2>
      <aside className="side-widgets text-list-one">
        <ul className="list-none flex column-direction garantien-list">
          {garantienList.map(({ title, listIcon, description }, index) => {
            return (
              <li key={`lis-${index}`} className="flex items-start">
                <figure>
                  <img src={listIcon} alt="listIcon" />
                </figure>
                <section>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </section>
              </li>
            );
          })}
          <li className="flex content-justify-center items-center">
            <button onClick={props.garantienModal} className="simple-btn">
              Details zu Garantien
            </button>
          </li>
        </ul>
      </aside>
      <div className="down-arrow">
        <a href="#">
          <img src={downArrow} alt="downArrow" />
        </a>
      </div>
    </>
  );
};
export default InstallationProcess;
