import Select from "react-dropdown-select";
import { useDispatch, useSelector } from "react-redux";
import {
  getHersteller,
  konfigurationActions,
} from "../../../../utils/store-2/konfiguration-slice";

const ZentraleForm = ({ openModal }) => {
  const dispatch = useDispatch();
  const herstellerValues = useSelector(getHersteller);

  const handleHerstellerChange = (options) => {
    dispatch(konfigurationActions.updateSelectedHersteller(options[0].value));
  };

  return (
    <>
      <h2 className="sidebar-title">System</h2>
      <aside className="side-widgets">
        <ul className="list-none flex column-direction">
          <li>
            <label htmlFor="">Hersteller</label>
            <Select
              options={herstellerValues.options}
              onChange={handleHerstellerChange}
              values={[
                herstellerValues.options[herstellerValues.selectedOption],
              ]}
            />
          </li>
          <li className="content-justify-center items-center">
            <button className="simple-btn" onClick={openModal}>
              Systeme vergleichen
            </button>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default ZentraleForm;
