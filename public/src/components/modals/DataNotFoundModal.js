import { Link } from "react-router-dom";
import "./modals.scss";

export const DataNotFoundModal = (props) => {
  return (
    <div className={`modal-wrapper ${props.modalExtraClass}`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-head">
            <h2>{props.modalTitle}</h2>
          </div>
          <div className="modal-body">
            <div className="flex content-justify-center">
              <p>{props.modalDescription}</p>
            </div>
            <div className="flex content-justify-center">
              <Link to="/">
                <button className="submit-button cancel">{props.button_text}</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
