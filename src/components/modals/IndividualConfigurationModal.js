import "./modals.scss";
import crossIcon from "../../assets/images/close.svg";
import upload from "../../assets/images/upload.svg";
import camIcon from "../../assets/images/cam.svg";
import TextInput from "./TextInput";
import { Link } from "react-router-dom";
import { useState } from "react";

export const IndividualConfigurationModal = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className={`modal-wrapper ${props.modalExtraClass}`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-head">
            <h2>{props.modalTitle}</h2>
            <img src={crossIcon} alt="crossIcon" className="crossIcon" onClick={props.closeModal} />
          </div>
          <div className="modal-body">
            <div className="modal-forms">
              {props.modalDescription}
              <ul className="list-none">
                <li>
                  <TextInput label="Vorname" type="text" />
                </li>
                <li>
                  <TextInput label="Nachname" type="text" />
                </li>
                <li>
                  <TextInput label="Firma" type="text" />
                </li>
                <li>
                  <TextInput label="E-Mail" type="email" />
                </li>
                <li className="w-60">
                  <TextInput label="Handynummer" type="number" />
                </li>
                <li className="w-40">
                  <TextInput label="PLZ" type="number" />
                </li>
                <li>
                  <h5>Grundriss</h5>
                  <p>
                    Laden Sie Ihren Elektroplan, Grundrisse und Fotos und Videos vom Objekt hoch, damit wir Ihr Konzept
                    so genau wie möglich planen können.
                  </p>
                </li>
                <li>
                  <div className="file-upload">
                    <input
                      type="file"
                      name="fileUpload"
                      onChange={(event) => {
                        setSelectedImage(event.target.files[0]);
                      }}
                    />
                    {selectedImage && (
                      <>
                        <h6>{selectedImage.name}</h6>
                        <small>{selectedImage.size}</small>
                      </>
                    )}
                    {!selectedImage && (
                      <>
                        <section className="desktop">
                          <img src={upload} alt="upload" />
                          <h6>Ziehen Sie die Datei hier hin</h6>
                        </section>
                        <section className="mobile">
                          <span>
                            <small>
                              Datei auswählen <i className="fa fa-angle-right"></i>
                            </small>
                          </span>
                        </section>
                        <small>pdf jpg png doc</small>
                      </>
                    )}
                    <span className="desktop">
                      Oder Datei <small>auswählen</small>
                    </span>
                    <span className="mobile">
                      <img src={camIcon} alt="cam" />{" "}
                      <small>
                        Fotografieren <i className="fa fa-angle-right"></i>
                      </small>
                    </span>
                  </div>
                </li>
                <li>
                  <p>
                    Indem Sie auf “Speichern” klicken, akzeptieren Sie unsere{" "}
                    <Link to="https://vays.de/datenschutz/" target="_blank">
                      Datenschutzbedingungen
                    </Link>
                    .
                  </p>
                </li>
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
