import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import React, { useRef } from "react";
import {
  getFinalData,
  getHersteller,
  getInitialData,
  konfigurationActions,
} from "../../../../utils/store-2/konfiguration-slice";
import { findDataPair, findObjectByKeyValue } from "../../../../utils/constants/api";
import { Link } from "react-scroll";
import downArrow from "../../../../assets/images/down-arrow-1.svg";

const FunctionForm = ({ openModal, functionSelection }) => {
  const dispatch = useDispatch();

  // const finalData = useSelector(getFinalData);
  // console.log(finalData);
  // const initialData = useSelector(getInitialData);
  // console.log(initialData);
  // //Installationsort
  // console.log(findObjectByKeyValue("installationsort", "options", "Haus", initialData));
  // //heimautomatisierung
  // console.log(findDataPair("Installation Services", "5 Automatisierungen", initialData.heimautomatisierung));
  // //integration_vorhandener_systeme
  // console.log(findDataPair("Installation Services", "3 Integrationen", initialData.integration_vorhandener_systeme));
  //fördermittelservice
  //console.log(findObjectByKeyValue("fördermittelservice", "options", "15% Förderung", initialData));
  //laufzeit_wartungsservice
  // console.log(findDataPair("Wartungsservice", "1 Jahr", initialData));
  // //laufzeit_gewährleistung
  // console.log(findDataPair("Gewährleistung", "3 Jahre", initialData));
  // //bauvorhaben
  // console.log(findObjectByKeyValue("bauvorhaben", "options", "Nachrüstung", initialData));
  // //bauphase
  // console.log(findObjectByKeyValue("bauphase", "options", "Bezugsfertig", initialData));

  const herstellerValues = useSelector(getHersteller);

  functionSelection = functionSelection.filter(
    (option) =>
      !(
        (option.label === "Energie" || option.label === "Lüftung") &&
        (herstellerValues.selectedOption === 0 || herstellerValues.selectedOption == 1)
      )
  );

  const checkedLabels = functionSelection.filter((item) => item.checked).map((item) => item.label);

  const [data, setData] = useState({
    functions: [],
  });

  const [checkList, setCheckList] = useState(false);
  const showCheckList = () => {
    setCheckList(!checkList);
  };

  const handleChange = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    dispatch(konfigurationActions.updateSingleFunktion(e.target.id));
    const { functions } = data;
    // Case 1 : The user checks the box
    if (checked) {
      setData({
        functions: [...functions, value],
      });
    }
    // Case 2  : The user unchecks the box
    else {
      setData({
        functions: functions.filter((e) => e !== value),
      });
    }
  };
  return (
    <>
      <h2 className="sidebar-title">Funktionen</h2>
      <aside className="side-widgets intention-wrapper">
        <ul className="list-none flex column-direction intention-wrap">
          <li onClick={() => showCheckList()} className={`mobile_list ${checkList === true ? "show_list" : ""}`}>
            {!checkList
              ? checkedLabels.map((data, index) => {
                return (
                  <span key={index} className="info-tag">
                    {data}
                    {index !== checkedLabels.length - 1 && ","}
                  </span>
                );
              })
              : data.functions?.map((data, index) => {
                return (
                  <span key={index} className="info-tag">
                    {data}
                  </span>
                );
              })}
            <i className="fa fa-angle-down" />
          </li>
          {functionSelection.map(({ id, label, included, checked }, index) => {
            return (
              <li key={index}>
                <label htmlFor={id} className={`check-box`} onChange={handleChange}>
                  <input type="checkbox" value={label} checked={checked} name="functions" id={id} onChange={() => { }} />
                  <span>
                    {label} <strong>{included}</strong>
                  </span>
                </label>
              </li>
            );
          })}
          <li>
            <label htmlFor={`control-check-x`} className={`check-box`}>
              <input type="checkbox" name="functions" id={`control-check-x`} />
              <span>
                Sonstiges <strong>auf Anfrage</strong>
              </span>
            </label>
          </li>
        </ul>
        <div className="flex content-justify-center items-center">
          <button className="simple-btn" onClick={openModal}>
            Funktionen vergleichen
          </button>
        </div>
      </aside>
      <div className="down-arrow">
        <a href="#">
          <img src={downArrow} alt="downArrow" />
        </a>
      </div>
    </>
  );
};
export default FunctionForm;
