import "./smartHomeModal.scss";
import crossIcon from "../../../assets/images/close.svg";
import smartIcon1 from "../../../assets/images/sm1.png";
import smartIcon2 from "../../../assets/images/sm2.png";
import smartIcon3 from "../../../assets/images/sm3.png";
import smartIcon4 from "../../../assets/images/sm4.png";
import smartIcon5 from "../../../assets/images/sm5.png";
import smartIcon6 from "../../../assets/images/sm6.png";
import smartIcon7 from "../../../assets/images/sm7.png";
import smartIcon8 from "../../../assets/images/sm8.png";
import smartIcon9 from "../../../assets/images/sm9.png";
import smartIcon10 from "../../../assets/images/sm10.png";
import smartIcon11 from "../../../assets/images/sm11.png";
import smartIcon12 from "../../../assets/images/sm12.png";
import smartIcon13 from "../../../assets/images/sm13.png";
import smartIcon14 from "../../../assets/images/sm14.png";
import info from "../../../assets/images/info.svg";
import check from "../../../assets/images/check.jpg";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export const SmartHomeModal = (props) => {
  const smartDataList = [
    {
      listIcon : smartIcon1,
      listTitle: "Licht",
      listDescription: "z.B. Innen-, Außen- und Ambientebeleuch-tung",
      tooltip: "Mit einer smarten Lichtsteuerung können Sie Ihre Deckenbeleuchtung, Außenbeleuchtung oder Ambientebeleuchtung, in Form von Steh- oder Tischlampen ein- und ausschalten, dimmen oder farbige Stimmungsbeleuchtung erzeugen."
    },
    {
      listIcon : smartIcon2,
      listTitle: "Heizung",
      listDescription: "z.B. Fußbodenheizung- oder Heizkörper-steuerung",
      tooltip: "Mit einer smarten Lichtsteuerung können Sie Ihre Deckenbeleuchtung, Außenbeleuchtung oder Ambientebeleuchtung, in Form von Steh- oder Tischlampen ein- und ausschalten, dimmen oder farbige Stimmungsbeleuchtung erzeugen."
    },
    {
      listIcon : smartIcon3,
      listTitle: "Beschattung",
      listDescription: "z.B. Rollladen-, Jalousien-, oder Markisensteuerung",
      tooltip: "Mit einer smarten Lichtsteuerung können Sie Ihre Deckenbeleuchtung, Außenbeleuchtung oder Ambientebeleuchtung, in Form von Steh- oder Tischlampen ein- und ausschalten, dimmen oder farbige Stimmungsbeleuchtung erzeugen."
    },
    {
      listIcon : smartIcon4,
      listTitle: "Steckdosen",
      listDescription: "z.B. Intelligentes Energiemanagement mit smarten Steck-dosen",
      tooltip: "Mit einer smarten Lichtsteuerung können Sie Ihre Deckenbeleuchtung, Außenbeleuchtung oder Ambientebeleuchtung, in Form von Steh- oder Tischlampen ein- und ausschalten, dimmen oder farbige Stimmungsbeleuchtung erzeugen."
    },
    {
      listIcon : smartIcon5,
      listTitle: "Sicherheit",
      listDescription: "z.B. Rauchmelder, Kameras, Fensterkontakte oder Alarmsirenen",
      tooltip: "Mit einer smarten Lichtsteuerung können Sie Ihre Deckenbeleuchtung, Außenbeleuchtung oder Ambientebeleuchtung, in Form von Steh- oder Tischlampen ein- und ausschalten, dimmen oder farbige Stimmungsbeleuchtung erzeugen."
    },
    {
      listIcon : smartIcon6,
      listTitle: "Zugang",
      listDescription: "z.B. Videogegensprech-anlage, Haustür- oder Garagentorsteuerung",
      tooltip: "Mit einer smarten Lichtsteuerung können Sie Ihre Deckenbeleuchtung, Außenbeleuchtung oder Ambientebeleuchtung, in Form von Steh- oder Tischlampen ein- und ausschalten, dimmen oder farbige Stimmungsbeleuchtung erzeugen."
    },
    {
      listIcon : smartIcon7,
      listTitle: "Sound",
      listDescription: "z.B. Multiroom-Sound, Garten-Soundanlage und Heimkino",
      tooltip: "Mit einer smarten Lichtsteuerung können Sie Ihre Deckenbeleuchtung, Außenbeleuchtung oder Ambientebeleuchtung, in Form von Steh- oder Tischlampen ein- und ausschalten, dimmen oder farbige Stimmungsbeleuchtung erzeugen."
    },
    {
      listIcon : smartIcon8,
      listTitle: "Energie-management",
      listDescription: "z.B. Smart Metering und Energiemess-Steckdosen",
      tooltip: "Mit einer smarten Lichtsteuerung können Sie Ihre Deckenbeleuchtung, Außenbeleuchtung oder Ambientebeleuchtung, in Form von Steh- oder Tischlampen ein- und ausschalten, dimmen oder farbige Stimmungsbeleuchtung erzeugen."
    },
    {
      listIcon : smartIcon9,
      listTitle: "Solaranlage",
      listDescription: "z.B. Smarte Steuerung Ihrer Solaranlage",
      tooltip: "Mit einer smarten Lichtsteuerung können Sie Ihre Deckenbeleuchtung, Außenbeleuchtung oder Ambientebeleuchtung, in Form von Steh- oder Tischlampen ein- und ausschalten, dimmen oder farbige Stimmungsbeleuchtung erzeugen."
    },
    {
      listIcon : smartIcon10,
      listTitle: "E-Ladestation",
      listDescription: "z.B. Nachhaltige Mobilität unterstützt durch Ihr Smart Home",
      tooltip: "Mit einer smarten Lichtsteuerung können Sie Ihre Deckenbeleuchtung, Außenbeleuchtung oder Ambientebeleuchtung, in Form von Steh- oder Tischlampen ein- und ausschalten, dimmen oder farbige Stimmungsbeleuchtung erzeugen."
    },
    {
      listIcon : smartIcon11,
      listTitle: "Lüftung",
      listDescription: "z.B. Smarte zentrale oder dezentrale Steuerung Ihrer Lüftung",
      tooltip: "Mit einer smarten Lichtsteuerung können Sie Ihre Deckenbeleuchtung, Außenbeleuchtung oder Ambientebeleuchtung, in Form von Steh- oder Tischlampen ein- und ausschalten, dimmen oder farbige Stimmungsbeleuchtung erzeugen."
    },
    {
      listIcon : smartIcon12,
      listTitle: "Garten",
      listDescription: "z.B. Wetterstation, Mähroboter oder smarte Bewässerung",
      tooltip: "Mit einer smarten Lichtsteuerung können Sie Ihre Deckenbeleuchtung, Außenbeleuchtung oder Ambientebeleuchtung, in Form von Steh- oder Tischlampen ein- und ausschalten, dimmen oder farbige Stimmungsbeleuchtung erzeugen."
    },
    {
      listIcon : smartIcon13,
      listTitle: "Pool",
      listDescription: "z.B. Smarte Steuerung der Temperatur oder Beleuchtung Ihrer Pool-Anlage",
      tooltip: "Mit einer smarten Lichtsteuerung können Sie Ihre Deckenbeleuchtung, Außenbeleuchtung oder Ambientebeleuchtung, in Form von Steh- oder Tischlampen ein- und ausschalten, dimmen oder farbige Stimmungsbeleuchtung erzeugen."
    },
    {
      listIcon : smartIcon14,
      listTitle: "Sauna",
      listDescription: "z.B. Smarte Steuerung der Beleuchtung oder Beheizung Ihrer Sauna",
      tooltip: "Mit einer smarten Lichtsteuerung können Sie Ihre Deckenbeleuchtung, Außenbeleuchtung oder Ambientebeleuchtung, in Form von Steh- oder Tischlampen ein- und ausschalten, dimmen oder farbige Stimmungsbeleuchtung erzeugen."
    }
  ]

  return (
    <div className={`modal-wrapper ${props.modalExtraClass}`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-head">
            <h2>{props.modalTitle}</h2>
            <img src={crossIcon} alt="crossIcon" className="crossIcon" onClick={props.closeModal}/>
          </div>
          <div className="modal-body">
            <div className="modal-smart-area">
              <ul className="list-none flex flex-wrap">
                {
                  smartDataList.map(({listIcon,listTitle,listDescription,tooltip}, index)=>{
                    return(
                        <li key={`list-${index}`}>
                          <div className="smart-content flex">
                            <img className="check" src={check} alt="check"/>
                            <figure>
                              <img src={listIcon} alt="listIcon"/>
                            </figure>
                            <section>
                              <h6>{listTitle} <img src={info} id={`list-${index}`} alt="info"/></h6>
                              <p>{listDescription}</p>
                            </section>
                          </div>
                          <ReactTooltip
                              anchorId={`list-${index}`}
                              place="bottom"
                              variant="info"
                              content={tooltip}
                          />
                        </li>
                    )
                  })
                }
              </ul>
              <div className="flex content-justify-center">
                <button className="submit-button cancel">{props.button_text}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
