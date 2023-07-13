import { initialState } from "../states/states";
import {
  SET_BAUPHASE_VALUES,
  SET_BAUVORHABEN_VALUES,
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INSTALLATIONSORT_VALUES:
      return {
        ...state,
        installationsortValues: action.payload,
      };

    case SET_BAUVORHABEN_VALUES:
      return {
        ...state,
        bauvorhabenValues: action.payload,
      };

    case SET_BAUPHASE_VALUES:
      return {
        ...state,
        bauphaseValues: action.payload,
      };

    case SET_RAUME_VALUES:
      return {
        ...state,
        raumeValues: action.payload,
      };

    case SET_HERSTELLER_VALUES:
      return {
        ...state,
        herstellerValues: action.payload,
      };

    case SET_INSTALLATION_SERVICE_VALUES:
      return {
        ...state,
        installationServiceValues: action.payload,
      };

    case SET_HEIMAUTOMATISIERUNG_VALUES:
      return {
        ...state,
        heimautomatisierungValues: action.payload,
      };

    case SET_VORHANDENER_VALUES:
      return {
        ...state,
        vorhandenerValues: action.payload,
      };

    case SET_FORDERMITTEL_SERVICE_VALUES:
      return {
        ...state,
        fordermittelserviceValues: action.payload,
      };

    case SET_WARTUNG_SERVICE_VALUES:
      return {
        ...state,
        wartungsServiceValues: action.payload,
      };

    case SET_GEWAHRLEISTUNG_VALUES:
      return {
        ...state,
        gewahrlewistungValues: action.payload,
      };

    case TOGGLE_INTENTION:
      return {
        ...state,
        intentions: state.intentions.map((intention) =>
          intention.id === action.payload
            ? { ...intention, checked: !intention.checked }
            : intention
        ),
      };

    case TOGGLE_BEDIENUNG_SELECTION:
      const newSelection = state.bedienungSelection.map((item) =>
        item.id === action.payload ? { ...item, checked: !item.checked } : item
      );
      return { ...state, bedienungSelection: newSelection };

    case TOGGLE_FUNCTION_SELECTION:
      const newSelection1 = state.functionSelection.map((item) =>
        item.id === action.payload ? { ...item, checked: !item.checked } : item
      );
      return { ...state, functionSelection: newSelection1 };
    default:
      return state;
  }
};

export default reducer;
