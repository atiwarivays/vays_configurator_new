import { useDispatch, useSelector } from "react-redux";
import { getBedienung, konfigurationActions } from "../../../../utils/store-2/konfiguration-slice";
import { Link } from "react-scroll";
import downArrow from "../../../../assets/images/down-arrow-1.svg";

const ServiceForm = ({ openModal }) => {
  const dispatch = useDispatch();
  const bedienungSelection = useSelector(getBedienung);

  //Making a copy because otherwis we cannot sort the data as this array is read only.
  //const sortedBedienung = JSON.parse(JSON.stringify(bedienungSelection));
  // sortedBedienung.sort((a, b) =>
  //   Number(
  //     a.included.replace(/[^\d,-]/g, "").replace(",", ".") -
  //       Number(b.included.replace(/[^\d,-]/g, "").replace(",", "."))
  //   )
  // );

  return (
    <>
      <h2 className="sidebar-title">Bedienung</h2>
      <aside className="side-widgets intention-wrapper">
        <ul className="list-none flex column-direction">
          {bedienungSelection.map(({ id, label, included, checked }) => {
            return (
              <li key={`service-check-${id}`}>
                <label htmlFor={`service-check-${id}`} className={`check-box`}>
                  <input
                    type="checkbox"
                    id={`service-check-${id}`}
                    checked={checked}
                    onChange={(e) => {
                      dispatch(konfigurationActions.updateSingleBedienung(id));
                    }}
                  />
                  <span>
                    {label} <strong>{included}</strong>
                  </span>
                </label>
              </li>
            );
          })}
          <li className="content-justify-center items-center">
            <button className="simple-btn" onClick={openModal}>
              Details zur Bedienung
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
export default ServiceForm;
