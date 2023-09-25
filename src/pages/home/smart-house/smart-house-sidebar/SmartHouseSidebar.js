import trustpilotScreeShot from "../../../../assets/images/trustpilotScreeShot.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import {
  INVALID_EMAIL_MESSAGE,
  INVALID_FIRST_NAME_MESSAGE,
  INVALID_LAST_NAME_MESSAGE,
  INVALID_PHONE_NUMBER_MESSAGE,
  SUCCEEDED,
} from "../../../../lib/messages";
import {
  getInstallationDate,
  getInstallationsdauer,
  getInstallationsservice,
  getUserEmail,
  getUserFirstName,
  getUserLastName,
  getUserPhone,
  konfigurationActions,
  saveDataToServer,
  getSaveDataToServerState,
  getRedirectQuotationUrl,
  getRedirectUrl
} from "../../../../utils/store-2/konfiguration-slice";
import React from "react";
import TextInput from "../../../../components/modals/TextInput";
import useInput from "../../../../hooks/use-input";
import { Link, useLocation,useNavigate } from "react-router-dom";
// import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SmartHouseSidebar = (props) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const saveDataState = useSelector(getSaveDataToServerState);
  const redirectUrl = useSelector(getRedirectUrl);
  const installationServiceValues = useSelector(getInstallationsservice);
  const installationsdauer = useSelector(getInstallationsdauer);
  const installationDate = useSelector(getInstallationDate);
  const userFirstName = useSelector(getUserFirstName);
  const userLastName = useSelector(getUserLastName);
  const userEmail = useSelector(getUserEmail);
  const navigate = useNavigate();
  const userPhone = useSelector(getUserPhone);
  const redirectQuotationUrl = useSelector(getRedirectQuotationUrl);

  const {
    value: enteredVorname,
    hasError: vorNameHasError,
    valueIsValid: vorNameIsValid,
    valueChangeHandler: vorNameChangeHandler,
    submitValueHandler: submitFormValueHandler,
    inputBlurHandler: vorNameBlurHandler,
  } = useInput(
    (value) => value.trim().length > 0,
    userFirstName === null ? "" : userFirstName,
    // console.log(value.trim()+'===tt')
  );

  const {
    value: enteredNachname,
    hasError: nachNameHasError,
    valueIsValid: nachNameIsValid,
    valueChangeHandler: nachNameChangeHandler,
    inputBlurHandler: nachNameBlurHandler,
  } = useInput(
    (value) => value.trim().length > 0,
    userLastName === null ? "" : userLastName
  );

  const {
    value: enteredEmail,
    hasError: emailHasError,
    valueIsValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(
    (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    userEmail === null ? "" : userEmail
  );

  const {
    value: enteredNumber,
    hasError: numberHasError,
    valueChangeHandler: numberChangeHandler,
    valueIsValid: numberIsValid,
    inputBlurHandler: numberBlurHandler,
  } = useInput(
    (value) => /^(\+\d{1,3})?\d{1,16}$/.test(value),
    userPhone === null ? "" : userPhone
  );

  const numericInputHandler = (event) => {
    const sanitizedValue = event.target.value.replace(/\D/g, "");
    const hasPlusSign = sanitizedValue.startsWith("+");
    const formattedValue = hasPlusSign
      ? "+" + sanitizedValue.substring(1)
      : sanitizedValue;
    const newEvent = {
      ...event,
      target: {
        ...event.target,
        value: formattedValue,
      },
    };
    numberChangeHandler(newEvent);
  };
//  const vorNameBlurHandler1 =(event) => {
//   console.log(event.target.value);
//   console.log('88888');
//  }
  const formIsValid =
    numberIsValid && emailIsValid && nachNameIsValid && vorNameIsValid;

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
      console.log("66666-==="+pathname.includes("angebot"))
      if (pathname.includes("angebot")) {
        console.log(55555)
        props.closeModal();
      }

     
    }
    else {
      if (vorNameIsValid == false) {
        var event = errorShowMsg();
        vorNameBlurHandler(event);
      }
      if (nachNameIsValid == false) {
        var event = errorShowMsg();
        nachNameBlurHandler(event);
      }
      if (emailIsValid == false) {
        var event = errorShowMsg();
        emailBlurHandler(event);
      }
      if (numberIsValid == false) {
        var event = errorShowMsg();
        numberBlurHandler(event);
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


  const errorShowMsg = () => {
    var check = '';
    const event = {
        target: {
          value: check,
        }
    };
    return event;
  }

  return (
    <>
      <>
        <h2 className="sidebar-title">Ihre Smart Home Konfiguration</h2>
        <aside className="side-widgets smart-house">
          <section>
            <h6>Ihr Wunschtermin</h6>
            <span>{installationDate}</span>
            {installationServiceValues.options[installationServiceValues.selectedOption].label === "Installation" && (
              <>
                <h6>Geschätzte Installationstage</h6>
                <span>ca. {installationsdauer} Tage</span>
              </>
            )}
            <ul className="list-none form-list">
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
                {vorNameHasError && (
                  <span className="form-error-msg">
                    {INVALID_FIRST_NAME_MESSAGE}
                  </span>
                )}
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
                {nachNameHasError && (
                  <span className="form-error-msg">
                    {INVALID_LAST_NAME_MESSAGE}
                  </span>
                )}
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
                {emailHasError && (
                  <span className="form-error-msg">
                    {INVALID_EMAIL_MESSAGE}
                  </span>
                )}
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
                {numberHasError && (
                  <span className="form-error-msg">
                    {INVALID_PHONE_NUMBER_MESSAGE}
                  </span>
                )}
              </li>
              <li key="bottomLineIntro">
                <p>
                  ''Weiter zum Angebot'' klicken, akzeptieren Sie unsere{" "}
                  <Link to="https://vays.de/datenschutz/" target="_blank">
                    Datenschutzbedingungen
                  </Link>
                  .
                </p>
              </li>
            </ul>
            <button onClick={formSubmitHandler} className="submit-button">
              Weiter zum Angebot
            </button>
            <button onClick={props.expertAdviceModal} className="submit-button transparent">
              Persönliche Fachberatung
            </button>
            <button onClick={props.openModal} className="transparent-button link">
              Häufig gestellte Fragen
            </button>
          </section>
        </aside>
      </>

      <h2 className="sidebar-title">Bewertungen</h2>
      <aside className="side-widgets trustpilot">
        <img src={trustpilotScreeShot} alt="trustpilotScreeShot" />
        <div className="trustpilot-list">
          <h6>96% von 97 Bewertungen empfehlen uns.</h6>
          <ul className="list-none">
            <li>
              Zuverlässigkeit
              <div className="progressbar-points">
                <span className="base">
                  <span className="base-bar" style={{ width: "95%" }}></span>
                  <span className="base-points"></span>
                </span>
                4.8
              </div>
            </li>
            <li>
              Servicegrad
              <div className="progressbar-points">
                <span className="base">
                  <span className="base-bar" style={{ width: "90%" }}></span>
                  <span className="base-points"></span>
                </span>
                4.7
              </div>
            </li>
            <li>
              Funktionalität
              <div className="progressbar-points">
                <span className="base">
                  <span className="base-bar" style={{ width: "90%" }}></span>
                  <span className="base-points"></span>
                </span>
                4.7
              </div>
            </li>
          </ul>
        </div>
        <div className="side-swiper-slide">
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            <SwiperSlide>
              <div className="frame-image">
                <iframe
                  width="400"
                  height="185"
                  src="https://www.youtube.com/embed/O9FJSC5i9KE"
                  title="Erfahrungsbericht über VAYS von Tim Kroll"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </SwiperSlide>
            {/* <SwiperSlide>
              <div className="frame-image">
                <iframe
                  width="400"
                  height="185"
                  src="https://www.youtube.com/embed/O9FJSC5i9KE"
                  title="Erfahrungsbericht über VAYS   von Familie Jansen"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </SwiperSlide> */}
          </Swiper>
        </div>
      </aside>
    </>
  );
};
export default SmartHouseSidebar;
