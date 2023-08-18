import "./systemIntegratedModal.scss";
import crossIcon from "../../../assets/images/close.svg";
import networkIcon1 from "../../../assets/images/networkIcon1.webp";
import networkIcon2 from "../../../assets/images/networkIcon2.webp";
import networkIcon3 from "../../../assets/images/networkIcon3.webp";
import networkIcon4 from "../../../assets/images/networkIcon4.webp";
import networkIcon5 from "../../../assets/images/networkIcon5.webp";
import networkIcon6 from "../../../assets/images/networkIcon6.webp";
import networkIcon7 from "../../../assets/images/networkIcon7.webp";
import networkIcon8 from "../../../assets/images/networkIcon8.webp";
import networkIcon9 from "../../../assets/images/networkIcon9.webp";
import networkIcon10 from "../../../assets/images/networkIcon10.webp";
import networkIcon11 from "../../../assets/images/networkIcon11.webp";
import networkIcon12 from "../../../assets/images/networkIcon12.webp";
import networkIcon13 from "../../../assets/images/networkIcon13.webp";
import networkIcon14 from "../../../assets/images/networkIcon14.webp";
import networkIcon15 from "../../../assets/images/networkIcon15.webp";
import networkIcon16 from "../../../assets/images/networkIcon16.webp";
import networkIcon17 from "../../../assets/images/networkIcon17.webp";
import networkIcon18 from "../../../assets/images/networkIcon18.webp";
import iconMinus from "../../../assets/images/iconMinus.svg";
import iconPlus from "../../../assets/images/iconPlus.svg";
import { useState, setState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

const SystemIntegratedModal = (props) => {
  let [count, setCount] = useState(0);
  let [checkboxCount, setCheckbox] = useState(0);

  const IntegratedDataList = [
    {
      listIcon: networkIcon1,
      name: "Alexa",
    },
    {
      listIcon: networkIcon2,
      name: "Siri",
    },
    {
      listIcon: networkIcon3,
      name: "Google Home",
    },
  ];
  const HerstellerDataList = [
    {
      listIcon: networkIcon4,
    },
    {
      listIcon: networkIcon5,
    },
    {
      listIcon: networkIcon6,
    },
    {
      listIcon: networkIcon7,
    },
    {
      listIcon: networkIcon8,
    },
    {
      listIcon: networkIcon9,
    },
    {
      listIcon: networkIcon10,
    },
    {
      listIcon: networkIcon11,
    },
    {
      listIcon: networkIcon12,
    },
    {
      listIcon: networkIcon13,
    },
    {
      listIcon: networkIcon14,
    },
    {
      listIcon: networkIcon15,
    },
    {
      listIcon: networkIcon16,
    },
    {
      listIcon: networkIcon17,
    },
    {
      listIcon: networkIcon18,
    },
  ];
  //  var click = [];
   var click = JSON.parse(localStorage.getItem('clickId'));

  // var localClickId = (click.length > 0 ) ? JSON.parse(localStorage.getItem('checkboxCount')) : '';
  // alert(localClickId);
  if(Array.isArray(click)){
    var localClickId = click
  }else{
    var localClickId = [];
  }
  const [clickId, setNames] = useState(localClickId);

  function countcheckbox(e){
    setNames([...clickId, e.currentTarget.id]);
    // setNames.push(e.currentTarget.id);
    //  this.state.clickId.concat(e.currentTarget.id)
    // alert(e.target.value);
    // console.log(e.currentTarget.id);
    if (e.target.checked) {
      checkboxCount = checkboxCount + 1;
      setCheckbox(checkboxCount); 
    }else{
      checkboxCount = checkboxCount - 1;
      setCheckbox(checkboxCount); 
    }   
  }
  localStorage.setItem('checkboxCount', JSON.stringify(checkboxCount));
  localStorage.setItem('clickId', JSON.stringify(clickId));
  // alert(checkboxCount);
   console.log(clickId);
  function incrementCount() {
    count = count + 1;
    setCount(count);
    checkboxCount = checkboxCount + 1;
    setCheckbox(checkboxCount); 
  }
  function decrementCount() {
    count = count - 1;
    setCount(count);
    checkboxCount = checkboxCount - 1;
    setCheckbox(checkboxCount); 
  }
  var checkbox = '';
  return (
    <div className={`modal-wrapper ${props.modalExtraClass}`}>
      <div className="modal-dialog">
        <OutsideClickHandler onOutsideClick={props.closeModal}>
          <div className="modal-content">
            <div className="modal-head">
              <h2>{props.modalTitle}</h2>
              <img
                src={crossIcon}
                alt="crossIcon"
                className="crossIcon"
                onClick={props.closeModal}
              />
            </div>
            <div className="modal-body">
              <div className="system-integrated-modal">
                <p>
                  Wählen Sie nachfolgend Ihre bestehenden Systeme und
                  Hersteller, die integriert werden sollen. Bitte beachten Sie,
                  dass die Machbarkeit jeglicher Integrationen zunächst geprüft
                  wird. Gerne können Sie die Machbarkeit von uns im Vorfeld
                  einschätzen lassen.{" "}
                </p>
                <h3>Sprachsteuerungen</h3>
                <ul className="list-none flex flex-wrap">
                  {IntegratedDataList.map(({ listIcon, name }, index) => {
                    return (
                      <li key={`list-${index}`}>
                        <section>
                        {/* {clickId.map(( clickId ) => {
                          console.log('==='+clickId)
                          
                          if(clickId === `systeme-list-${index}`){
                             checkbox = '';
                          }else{
                             checkbox = '';
                          }
                        })} */}
                          <input type="checkbox" className="checkbox_icon" id={`systeme-list-${index}`} onChange={countcheckbox} />
                          <label htmlFor={`systeme-list-${index}`}>
                            <img src={listIcon} alt="networkIcon1" />
                            <span>{name}</span>
                          </label>
                        </section>
                      </li>
                    );
                  })}
                </ul>
                <h3>Hersteller</h3>
                <ul className="list-none flex flex-wrap">
                  {HerstellerDataList.map(({ listIcon }, index) => {
                    return (
                      <li key={`list-${index}`}>
                        <section>
                          <input
                            type="checkbox"
                            id={`hersteller-list-${index}`}
                            onChange={countcheckbox}
                          />
                          <label htmlFor={`hersteller-list-${index}`}>
                            <img src={listIcon} alt="networkIcon1" />
                          </label>
                        </section>
                      </li>
                    );
                  })}
                </ul>
                <h4>Nicht genannte Hersteller</h4>
                <div className="flex items-center increment-wrap">
                  <button onClick={decrementCount}>
                    <img src={iconMinus} alt="iconMinus" />
                  </button>
                  <span>{count}</span>
                  <button onClick={incrementCount}>
                    <img src={iconPlus} alt="iconPlus" />
                  </button>
                </div>
                <div className="flex content-justify-center">
                  <button className="submit-button cancel" onClick={props.closeModal}>
                    {props.button_text}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </OutsideClickHandler>
      </div>
    </div>
  );
};
export default SystemIntegratedModal;
