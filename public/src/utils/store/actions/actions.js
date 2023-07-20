import {
  SET_BAUPHASE_VALUES,
  SET_BAUVORHABEN_VALUES,
  SET_BEDIENUNG_VALUES,
  SET_FORDERMITTEL_SERVICE_VALUES,
  SET_GEWAHRLEISTUNG_VALUES,
  SET_HEIMAUTOMATISIERUNG_VALUES,
  SET_HERSTELLER_VALUES,
  SET_INSTALLATIONSORT_VALUES,
  SET_INSTALLATION_SERVICE_VALUES,
  SET_RAUME_VALUES,
  SET_VORHANDENER_VALUES,
  SET_WARTUNG_SERVICE_VALUES,
  TOGGLE_BEDIENUNG_SELECTION,
  TOGGLE_FUNCTION_SELECTION,
  TOGGLE_INTENTION,
} from "../types/types";

export const setInstallationsortValues = (values) => ({
  type: SET_INSTALLATIONSORT_VALUES,
  payload: values,
});

export const setBauvorhabenValues = (values) => ({
  type: SET_BAUVORHABEN_VALUES,
  payload: values,
});

export const setBauphaseValues = (values) => ({
  type: SET_BAUPHASE_VALUES,
  payload: values,
});

export const setRaumeValues = (values) => ({
  type: SET_RAUME_VALUES,
  payload: values,
});

export const setHerstellerValues = (values) => ({
  type: SET_HERSTELLER_VALUES,
  payload: values,
});

export const setBedienungValues = (values) => ({
  type: SET_BEDIENUNG_VALUES,
  payload: values,
});

export const setInstallationServiceValues = (values) => ({
  type: SET_INSTALLATION_SERVICE_VALUES,
  payload: values,
});

export const setHeimautomatisierungValues = (values) => ({
  type: SET_HEIMAUTOMATISIERUNG_VALUES,
  payload: values,
});

export const setVorhandenerValues = (values) => ({
  type: SET_VORHANDENER_VALUES,
  payload: values,
});

export const setFordermittelserviceValues = (values) => ({
  type: SET_FORDERMITTEL_SERVICE_VALUES,
  payload: values,
});

export const setWartungServiceValues = (values) => ({
  type: SET_WARTUNG_SERVICE_VALUES,
  payload: values,
});

export const setGewahrleistungValues = (values) => ({
  type: SET_GEWAHRLEISTUNG_VALUES,
  payload: values,
});

export const setToggleIntention = (id) => ({
  type: TOGGLE_INTENTION,
  payload: id,
});

export const setToggleBedienungSelection = (id) => ({
  type: TOGGLE_BEDIENUNG_SELECTION,
  payload: id,
});

export const setToggleFunctionSelection = (id) => ({
  type: TOGGLE_FUNCTION_SELECTION,
  payload: id,
});
