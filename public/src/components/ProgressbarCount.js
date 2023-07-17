import { useSelector } from "react-redux";
import iIcon from "../assets/images/iIcon.svg";
import { getFunktionen } from "../utils/store-2/konfiguration-slice";

export default function ProgressbarCount() {
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
      value: circularValue,
      label: "Effizienz",
      subTitle: sum,
    },

    {
      value: circularValue1,
      label: "Komfort",
      subTitle: sum1,
    },
    {
      value: circularValue2,
      label: "Sicherheit",
      subTitle: sum2,
    },
    {
      value: circularValue1,
      label: "Wertsteigerung",
      subTitle: sum1,
    },
  ];

  const progressItems2 = [
    {
      value: circularValue3,
      label: "Heizkosten",
    },
    {
      value: circularValue4,
      label: "Stromkosten",
    },
    {
      value: circularValue5,
      label: "CO2 Emmisionen",
    },
  ];

  return (
    <div className="progressbar-counter">
      <ul className="list-none flex">
        <li>
          <section>
            <h5>Ihre Ausstattung im Vergleich</h5>
            <ul className="list-none flex flex-wrap">
              {progressItems.map((item, index) => (
                <li key={index}>
                  <h6>{item.label}</h6>
                  <span className="ml-auto">
                    <span className="slider">
                      <small style={{ width: `${item.subTitle * 10}%` }} />
                    </span>
                    {item.subTitle}/10
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </li>
        <li>
          <section>
            <h5 className="flex content-justify-between">Ihre Ersparnis</h5>
            <ul className="list-none flex flex-wrap">
              {progressItems2.map((item, index) => (
                <li key={index}>
                  <h6>{item.label}</h6>
                  <span className="ml-auto">
                    <span className="slider">
                      <small style={{ width: `${item.value * 100}%` }} />
                    </span>
                    {item.value * 10}/10
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </li>
      </ul>
    </div>
  );
}
