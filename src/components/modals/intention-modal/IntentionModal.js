import "./intentionModal.scss";
import crossIcon from "../../../assets/images/close.svg";
import intentionIcon1 from "../../../assets/images/intention-icon1.svg";
import intentionIcon2 from "../../../assets/images/intention-icon2.svg";
import intentionIcon3 from "../../../assets/images/intention-icon3.svg";
import intentionIcon4 from "../../../assets/images/intention-icon4.svg";
import intentionIcon5 from "../../../assets/images/intention-icon5.svg";
import intentionIcon6 from "../../../assets/images/intention-icon6.svg";
import OutsideClickHandler from "react-outside-click-handler";

export const IntentionModal = (props) => {
  const IntentionDataList = [
    {
      listIcon: intentionIcon1,
      title: "Heizkosten \nsparen",
      description: "Durch smarte Heizungssteuerung sparen Sie bis zu 30% Heizkosten.",
    },
    {
      listIcon: intentionIcon2,
      title: "Stromkosten \nsparen",
      description: "Sparen Sie mit smartem Energie-management bis zu 50% Stromkosten.",
    },
    {
      listIcon: intentionIcon3,
      title: "Wohnkomfort \nsteigern",
      description: "Mit Automatisierung sparen Sie täglich viele manuelle Handgriffe ein.",
    },
    {
      listIcon: intentionIcon4,
      title: "Mehr \nSicherheit",
      description: "Mit einem smarten Sicherheitssystem fühlen Sie sich immer rundherum sicher.",
    },
    {
      listIcon: intentionIcon5,
      title: "Wertsteigerung \nder Immobilie",
      description: "Durch innovative Standards steigern Sie den Immobilien-wert bis zu 20%.",
    },
    {
      listIcon: intentionIcon6,
      title: "Barrierefreiheit \nim Alter",
      description: "Ihr Smart Home automatisiert tägliche Routine-aufgaben für Sie.",
    }
  ]


  return (
    <div className={`modal-wrapper ${props.modalExtraClass}`}>
      <div className="modal-dialog">
        <OutsideClickHandler
          onOutsideClick={props.closeModal}
        >
          <div className="modal-content">
            <div className="modal-head">
              <h2>{props.modalTitle}</h2>
              <img src={crossIcon} alt="crossIcon" className="crossIcon" onClick={props.closeModal} />
            </div>
            <div className="modal-body">
              <div className="intention-modal">
                <ul className="list-none flex flex-wrap">
                  {
                    IntentionDataList.map(({ listIcon, title, description }, index) => {
                      return (
                        <li key={`list-${index}`}>
                          <section>
                            <img src={listIcon} alt="listIcon" />
                            <h3>{title}</h3>
                            <p>{description}</p>
                          </section>
                        </li>
                      )
                    })
                  }
                </ul>
                {/* <div className="flex content-justify-center">
                <button className="submit-button transparent cancel">{props.button_text}</button>
              </div> */}
              </div>
            </div>
          </div>
        </OutsideClickHandler>
      </div>
    </div>
  );
};
