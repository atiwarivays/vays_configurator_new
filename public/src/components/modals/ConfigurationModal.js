import "./modals.scss";
import crossIcon from "../../assets/images/close.svg";
import TextInput from "./TextInput";
import OutsideClickHandler from "react-outside-click-handler";
import useInput from "../../hooks/use-input";
import {
  FAILED,
  INVALID_EMAIL_MESSAGE,
  INVALID_FIRST_NAME_MESSAGE,
  INVALID_LAST_NAME_MESSAGE,
  INVALID_PHONE_NUMBER_MESSAGE,
  LOADING,
  SAVE_DATA_FAILED_MESSAGE,
  SUCCEEDED,
} from "../../lib/messages";
import { useDispatch, useSelector } from "react-redux";
import {
  getRedirectQuotationUrl,
  getRedirectUrl,
  getSaveDataToServerState,
  getUserEmail,
  getUserFirstName,
  getUserLastName,
  getUserPhone,
  konfigurationActions,
  saveDataToServer,
} from "../../utils/store-2/konfiguration-slice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const ConfigurationModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const saveDataState = useSelector(getSaveDataToServerState);
  const redirectUrl = useSelector(getRedirectUrl);
  const userFirstName = useSelector(getUserFirstName);
  const userLastName = useSelector(getUserLastName);
  const userEmail = useSelector(getUserEmail);
  const userPhone = useSelector(getUserPhone);
  const redirectQuotationUrl = useSelector(getRedirectQuotationUrl);

  const {
    value: enteredVorname,
    hasError: vorNameHasError,
    valueIsValid: vorNameIsValid,
    valueChangeHandler: vorNameChangeHandler,
    inputBlurHandler: vorNameBlurHandler,
  } = useInput((value) => value.trim().length > 0, userFirstName === null ? "" : userFirstName);

  const {
    value: enteredNachname,
    hasError: nachNameHasError,
    valueIsValid: nachNameIsValid,
    valueChangeHandler: nachNameChangeHandler,
    inputBlurHandler: nachNameBlurHandler,
  } = useInput((value) => value.trim().length > 0, userLastName === null ? "" : userLastName);

  const {
    value: enteredEmail,
    hasError: emailHasError,
    valueIsValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), userEmail === null ? "" : userEmail);

  const {
    value: enteredNumber,
    hasError: numberHasError,
    valueChangeHandler: numberChangeHandler,
    valueIsValid: numberIsValid,
    inputBlurHandler: numberBlurHandler,
  } = useInput((value) => /^(\+\d{1,3})?\d{1,16}$/.test(value), userPhone === null ? "" : userPhone);

  const numericInputHandler = (event) => {
    const sanitizedValue = event.target.value.replace(/\D/g, "");
    const hasPlusSign = sanitizedValue.startsWith("+");
    const formattedValue = hasPlusSign ? "+" + sanitizedValue.substring(1) : sanitizedValue;
    const newEvent = {
      ...event,
      target: {
        ...event.target,
        value: formattedValue,
      },
    };
    numberChangeHandler(newEvent);
  };

  const formIsValid = numberIsValid && emailIsValid && nachNameIsValid && vorNameIsValid;

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (formIsValid) {
      const userData = {
        vorname: enteredVorname,
        lastname: enteredNachname,
        email: enteredEmail,
        phone: enteredNumber,
      };
      dispatch(konfigurationActions.updateUserData(userData));
      dispatch(saveDataToServer());
      if (pathname.includes("angebot")) {
        props.closeModal();
      }
    }
  };

  useEffect(() => {
    if (saveDataState === SUCCEEDED) {
      if (!pathname.includes("angebot")) {
        navigate(`angebot/${redirectUrl}/${redirectQuotationUrl}`);
        dispatch(konfigurationActions.resetsaveDataToServerStateStatus());
      }
    }
  }, [saveDataState]);

  return (
    <div className={`modal-wrapper ${props.modalExtraClass}`}>
      <div className="modal-dialog">
        <OutsideClickHandler onOutsideClick={props.closeModal}>
          <div className="modal-content">
            <div className="modal-head">
              <h2>{props.modalTitle}</h2>
              <img src={crossIcon} alt="crossIcon" className="crossIcon" onClick={props.closeModal} />
            </div>
            <div className="modal-body">
              <div className="modal-forms">
                {props.modalDescription}
                <ul className="list-none">
                  <li key="vorname">
                    <TextInput
                      label="Vorname"
                      value={enteredVorname ?? userFirstName ?? ""}
                      onBlur={vorNameBlurHandler}
                      onChange={vorNameChangeHandler}
                      error={vorNameHasError}
                      isValid={vorNameIsValid}
                      type="text"
                    />
                    {vorNameHasError && <span className="form-error-msg">{INVALID_FIRST_NAME_MESSAGE}</span>}
                  </li>
                  <li key="nachname">
                    <TextInput
                      label="Nachname"
                      value={enteredNachname ?? userLastName ?? ""}
                      onBlur={nachNameBlurHandler}
                      onChange={nachNameChangeHandler}
                      error={nachNameHasError}
                      isValid={nachNameIsValid}
                      type="text"
                    />
                    {nachNameHasError && <span className="form-error-msg">{INVALID_LAST_NAME_MESSAGE}</span>}
                  </li>
                  <li key="email">
                    <TextInput
                      label="E-Mail"
                      value={enteredEmail ?? userEmail ?? ""}
                      onBlur={emailBlurHandler}
                      onChange={emailChangeHandler}
                      error={emailHasError}
                      isValid={emailIsValid}
                      type="email"
                    />
                    {emailHasError && <span className="form-error-msg">{INVALID_EMAIL_MESSAGE}</span>}
                  </li>
                  <li key="number">
                    <TextInput
                      label="Handynummer"
                      type="tel"
                      minLength={1}
                      maxLength={16}
                      value={enteredNumber ?? userPhone ?? ""}
                      onBlur={numberBlurHandler}
                      onChange={numberChangeHandler}
                      isValid={numberIsValid}
                      error={numberHasError}
                      onInput={numericInputHandler}
                    />
                    {numberHasError && <span className="form-error-msg">{INVALID_PHONE_NUMBER_MESSAGE}</span>}
                  </li>
                  <li key="bottomLineIntro">{props.bottomLineIntro}</li>
                </ul>
                <div className="flex content-justify-center">
                  <button
                    onClick={formSubmitHandler}
                    className={`submit-button cancel ${saveDataState === LOADING && "loader-btn disabled"}`}
                  >
                    {props.button_text}
                  </button>
                </div>
                {saveDataState === FAILED && <span className="form-error-msg">{SAVE_DATA_FAILED_MESSAGE}</span>}
              </div>
            </div>
          </div>
        </OutsideClickHandler>
      </div>
    </div>
  );
};
