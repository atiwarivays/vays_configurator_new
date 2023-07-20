import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getIntention,
  konfigurationActions,
} from "../../../../utils/store-2/konfiguration-slice";

const IntentionForm = (props) => {
  const dispatch = useDispatch();
  const intentions = useSelector(getIntention).options;
  const [checkList, setCheckList] = useState(false);
  const showCheckList = () => {
    setCheckList(!checkList);
  };

  const handleCheck = (id) => {
    dispatch(konfigurationActions.updateIntention(id));
  };

  //TODO: Check why it is done?
  // Generate string of checked items
  const checkedItems = intentions
    .filter((intention) => intention.checked)
    .map((intention) => intention.label)
    .join(", ");

  return (
    <>
      <h2 className="sidebar-title">Intention</h2>
      <aside className="side-widgets intention-wrapper">
        <ul className="list-none flex column-direction intention_list">
          <li
            onClick={() => showCheckList()}
            className={`mobile_list ${checkList === true ? "show_list" : ""}`}
          >
            <span className="info-tag">{checkedItems}</span>
            <i className="fa fa-angle-down"></i>
          </li>
          <li className="lab">
            <label htmlFor="">Was möchten Sie erreichen?</label>
          </li>
          {intentions.map((item) => {
            return (
              <li key={item.id}>
                <label htmlFor={`check-${item.id}`} className="check-box">
                  <input
                    type="checkbox"
                    id={`check-${item.id}`}
                    onChange={() => handleCheck(item.id)}
                    checked={item.checked}
                  />
                  <span>{item.label}</span>
                </label>
              </li>
            );
          })}
        </ul>
        <div className="content-justify-center flex items-center">
          <button className="simple-btn" onClick={props.openModal}>
            Details zu den Vorteilen
          </button>
        </div>
      </aside>
    </>
  );
};
export default IntentionForm;
