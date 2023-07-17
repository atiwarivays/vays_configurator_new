import "./modals.scss";
import crossIcon from "../../assets/images/close.svg";
import TextInput from "./TextInput";
import { CircularProgressbar } from "react-circular-progressbar";
import OutsideClickHandler from "react-outside-click-handler";

export const DetailedModal = (props) => {
  const value = 0.36;

  return (
    <div className={`modal-wrapper ${props.modalExtraClass}`}>
      <div className="modal-dialog">
        <OutsideClickHandler onOutsideClick={props.closeModal}>
          <div className="modal-content">
            <div className="modal-body">
              <img
                src={crossIcon}
                alt="crossIcon"
                className="crossIcon"
                onClick={props.closeModal}
              />
              <div className="detailed-modal flex">
                <figure>
                  <img
                    className={`${props.modalImageClass}`}
                    src={props.modalSideImage}
                    alt="modalSideImage"
                  />
                </figure>
                <section>
                  {props.subtitle}
                  {props.title}
                  {props.modalDescription}
                  {props.beforeListTitle}
                  {props.WartungsserviceList === true && (
                    <ul className="list-none detailed-modal-list">
                      {props.WartungsserviceListData?.map(
                        ({ title, description }, index) => {
                          return (
                            <li>
                              <h6>{title}</h6>
                              <p>{description}</p>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  )}
                  {props.button_area === true && (
                    <>
                      <div className="circular-widget">
                        <small>1:30</small>
                        <CircularProgressbar
                          value={0.2}
                          maxValue={1}
                          text={`${value * 100}%`}
                        />
                      </div>
                      <ul className="list-none">
                        <li>
                          <TextInput label="Handynummer" type="number" />
                        </li>
                      </ul>
                      <div className="flex content-justify-center">
                        <button className="submit-button cancel">
                          {props.button_text}
                        </button>
                      </div>
                    </>
                  )}
                </section>
              </div>
            </div>
          </div>
        </OutsideClickHandler>
      </div>
    </div>
  );
};
