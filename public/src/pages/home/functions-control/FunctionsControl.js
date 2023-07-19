import progressIcon1 from "../../../assets/images/progressIcon1.svg";
import progressIcon2 from "../../../assets/images/progressIcon2.svg";
import progressIcon3 from "../../../assets/images/progressIcon3.svg";
import progressIcon4 from "../../../assets/images/progressIcon4.svg";
import progressIcon5 from "../../../assets/images/progressIcon5.svg";
import progressIcon6 from "../../../assets/images/progressIcon6.svg";
import progressIcon7 from "../../../assets/images/progressIcon7.svg";
import FunctionForm from "./functions-form/FunctionForm";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import ProgressbarCount from "../../../components/ProgressbarCount";
import { FunktionenModal } from "../../../components/modals/funktionen-modal/FunktionenModal";
import { useSelector } from "react-redux";
import { getFunktionen } from "../../../utils/store-2/konfiguration-slice";
import FunctionImageComponent from "./FunctionImageComponent";

const FunctionsControl = () => {
  const [openFunktionen, setOpenFunktionen] = useState(false);
  const [isDivVisible, setDivVisible] = useState(true);
  const [isDivVisible2, setDivVisible2] = useState(true);
  const functionSelection = useSelector(getFunktionen);
  const checkedItemsArray = functionSelection.filter((item) => item.checked);
  const checkedItems = checkedItemsArray.map((item) => item.label);

  let sum = 0;
  let sum1 = 0;
  let sum2 = 0;
  let circularValue = 0;
  let circularValue1 = 0;
  let circularValue2 = 0;
  let circularValue3 = 0;
  let circularValue4 = 0;
  let circularValue5 = 0;

  if (checkedItems.includes("Heizung")) {
    sum += 3;
    sum1 += 1;
    circularValue += 0.3;
    circularValue1 += 0.1;
    circularValue3 += 1;
    circularValue5 += 0.4;
  }

  if (checkedItems.includes("Beleuchtung")) {
    sum += 1;
    sum1 += 1;
    sum2 += 1;
    circularValue += 0.1;
    circularValue1 += 0.1;
    circularValue2 += 0.1;
  }

  if (checkedItems.includes("Beschattung")) {
    sum1 += 1;
    sum2 += 1;
    circularValue1 += 0.1;
    circularValue2 += 0.1;
  }

  if (checkedItems.includes("Energie")) {
    sum += 3;
    sum1 += 1;
    circularValue += 0.3;
    circularValue1 += 0.1;
    circularValue4 += 0.5;
    circularValue5 += 0.3;
  }

  if (checkedItems.includes("Steckdosen")) {
    sum += 3;
    sum1 += 1;
    circularValue += 0.3;
    circularValue1 += 0.1;
    circularValue4 += 0.5;
    circularValue5 += 0.3;
  }

  if (checkedItems.includes("Kameras")) {
    sum1 += 1;
    sum2 += 2;
    circularValue1 += 0.1;
    circularValue2 += 0.2;
  }

  if (checkedItems.includes("Alarmsystem")) {
    sum1 += 1;
    sum2 += 2;
    circularValue1 += 0.1;
    circularValue2 += 0.2;
  }

  if (checkedItems.includes("Rauchmelder")) {
    sum1 += 1;
    sum2 += 2;
    circularValue1 += 0.1;
    circularValue2 += 0.2;
  }

  if (checkedItems.includes("Türstation")) {
    sum1 += 1;
    sum2 += 1;
    circularValue1 += 0.1;
    circularValue2 += 0.1;
  }

  if (checkedItems.includes("Zugang")) {
    sum1 += 1;
    sum2 += 1;
    circularValue1 += 0.1;
    circularValue2 += 0.1;
  }

  const progressItems = [
    {
      icon: progressIcon1,
      value: circularValue,
      maxValue: 1,
      label: "Effizienz",
      subTitle: sum,
    },

    {
      icon: progressIcon2,
      value: circularValue1,
      maxValue: 1,
      label: "Komfort",
      subTitle: sum1,
    },
    {
      icon: progressIcon3,
      value: circularValue2,
      maxValue: 1,
      label: "Sicherheit",
      subTitle: sum2,
    },
    {
      icon: progressIcon4,
      value: circularValue1,
      maxValue: 1,
      label: "Wertsteigerung",
      subTitle: sum1,
    },
  ];

  const progressItems2 = [
    {
      icon: progressIcon5,
      percentage: "-35%",
      subtext: "bis zu",
      value: circularValue3,
      label: "Heizkosten",
    },
    {
      icon: progressIcon6,
      percentage: "-50%",
      subtext: "bis zu",
      value: circularValue4,
      label: "Stromkosten",
    },
    {
      icon: progressIcon7,
      percentage: "-40%",
      subtext: "bis zu",
      value: circularValue5,
      label: "CO2 Emmisionen",
    },
  ];

  useEffect(() => {
    if (openFunktionen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openFunktionen]);


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
      <div className="slide-wrapper function_control flex items-start" id="two">
        {isDivVisible && <Link activeClass="active" className="abc" smooth spy offset={-400} to="two"></Link>}
        {isDivVisible2 && <Link activeClass="active" className="abd" smooth spy offset={-150} to="two"></Link>}
        <div className="content-side">
          <div className="image-wrapper flex column-direction">
            <FunctionImageComponent />
            <div className="progressbar-group flex">
              <section className="without_subtitle">
                <div className="titles flex items-center content-justify-between">
                  <h3>Ihre Ausstattung im Vergleich</h3>
                  {/*<NavLink to="/">Mehr Info</NavLink>*/}
                </div>
                <ul className="flex list-none">
                  {progressItems.map((item) => (
                    <li key={item.label}>
                      <small>
                        <img src={item.icon} alt={item.label} />
                        {item.subTitle}/10
                      </small>
                      <CircularProgressbar value={item.value} maxValue={item.maxValue} text={`${item.value * 100}%`} />
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <div className="titles flex items-center content-justify-between">
                  <h3>Ihre Ersparnis</h3>
                  {/*<NavLink to="/">Mehr Info</NavLink>*/}
                </div>
                <ul className="flex list-none">
                  {progressItems2.map((item, index) => (
                    <li key={index}>
                      <small>
                        <img src={item.icon} alt={`progressIcon${index + 5}`} />
                        {item.percentage}
                        <sub>{item.subtext}</sub>
                      </small>
                      <CircularProgressbar value={item.value} maxValue={1} text={`${item.value * 100}%`} />
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
        <div className="sidebar-options">
          <FunctionForm
            openModal={() => {
              setOpenFunktionen(!openFunktionen);
            }}
            functionSelection={functionSelection}
          />
        </div>
        <ProgressbarCount />
      </div>
      {openFunktionen === true && (
        <FunktionenModal
          modalExtraClass="funktionen-modal-wrapper"
          modalTitle="Smart Home Funktionalitäten"
          button_text="Mehr Vorteile von Smart Home"
          closeModal={() => {
            setOpenFunktionen(!openFunktionen);
          }}
        />
      )}
    </>
  );
};
export default FunctionsControl;
