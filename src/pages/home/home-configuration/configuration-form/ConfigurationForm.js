import Select from "react-dropdown-select";
import { useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  getBauphase,
  getBauvorhaben,
  getInstallationsort,
  getRaume,
  konfigurationActions,
} from "../../../../utils/store-2/konfiguration-slice";
import { Link } from "react-scroll";
import downArrow from "../../../../assets/images/down-arrow-1.svg";

const ConfigurationForm = () => {
  const dispatch = useDispatch();
  const bauphaseValues = useSelector(getBauphase);
  const installationsortValues = useSelector(getInstallationsort);
  const raumeValues = useSelector(getRaume);
  const bauvorhabenValues = useSelector(getBauvorhaben);

  const handleSelectChange = (name) => (options) => {
    switch (name) {
      case "installationsort":
        dispatch(
          konfigurationActions.updateSelectedInstallationsort(options[0].value)
        );
        break;
      case "bauvorhaben":
        dispatch(
          konfigurationActions.updateSelectedBauvorhaben(options[0].value)
        );
        break;
      case "bauphase":
        dispatch(konfigurationActions.updateSelectedBauphase(options[0].value));
        break;
      case "raume":
        dispatch(konfigurationActions.updateSelectedRaume(options[0].value));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <h1 className="sidebar-title mt-50">Ihre Smart Home Konfiguration</h1>
      <aside className="side-widgets">
        <ul className="list-none flex column-direction">
          <li>
            <label htmlFor="">Objekt</label>
            <Select
              options={installationsortValues.options}
              onChange={handleSelectChange("installationsort")}
              values={[
                installationsortValues.options[
                installationsortValues.selectedOption
                ],
              ]}
            />
          </li>
          <li>
            <label htmlFor="">Projekt</label>
            <Select
              options={bauvorhabenValues.options}
              onChange={handleSelectChange("bauvorhaben")}
              values={[
                bauvorhabenValues.options[bauvorhabenValues.selectedOption],
              ]}
            />
          </li>
          <li>
            <label htmlFor="">Phase</label>
            <Select
              options={bauphaseValues.options}
              onChange={handleSelectChange("bauphase")}
              values={[bauphaseValues.options[bauphaseValues.selectedOption]]}
            />
          </li>
          <li>
            <label htmlFor="">
              Räume <small>(inkl. Flur und Bäder)</small>
            </label>
            <Select
              options={raumeValues.options}
              onChange={handleSelectChange("raume")}
              values={[raumeValues.options[raumeValues.selectedOption]]}
            />
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
export default ConfigurationForm;
