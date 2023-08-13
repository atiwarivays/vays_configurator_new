import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FAILED, LOADING, SUCCEEDED } from "../constants/constants";
import {
  fetchInitialDataApi,
  findDataPair,
  findObjectByKeyValue,
  fetchConfiguratorSummaryAPI,
  saveDataToServerApi,
} from "../constants/api";
import {
  calculateBedienungPricingData,
  calculateFinalPrice,
  calculateFunktionenPricingData,
  calculateHerstellerPricing,
  calculateInstallationServicePricing,
  extractSelectedValuesFromCheckboxes,
  formatCheckboxData,
  formatDropdownData,
  formatPricingData,
  getBedienungPriceImpact,
  getDateToStringWithoutTime,
  getFunktionenPriceImpact,
  getInstallationsservicePriceImpact,
  getIntegration_vorhandener_systeme_priceimpact,
  get_heimautomatisierung_price_impact,
  get_installationsdauer_calculation,
  get_laufzeit_gewahrleistung_price_impact,
  get_laufzeit_wartungsservice_price_impact,
  modifyDataForServer,
  updateFunktionenSelectionsBasedOnIntentions,
} from "./data-formatters";
import { addMonths } from "date-fns";

const initialState = {
  saveDataToServerState: null,
  temp_trans_id: 0,
  redirect_url: null,
  checkout_url: null,
  quotation_id: null,
  redirect_quotation_url: null,
  firstName: null,
  lastName: null,
  email: null,
  phone: null,
  dataLoadingStatus: null,
  initialData: null,
  configuratorSummaryStatus: null,
  configuratorSummary: null,
  installationsort: null,
  bauvorhaben: null,
  bauphase: null,
  raume: null,
  hersteller: {
    options: [
      {
        value: 0,
        label: "Bosch",
      },
      {
        value: 1,
        label: "homematic",
      },
      {
        value: 2,
        label: "FIBARO",
      },
      {
        value: 3,
        label: "homey",
      },
    ],
    selectedOption: 0,
    pricingData: null,
  },
  intention: null,
  funktionen: [
    { id: 0, label: "Heizung", included: "gewählt", checked: true },
    { id: 1, label: "Beleuchtung", included: "+ 1.232,00€", checked: false },
    { id: 2, label: "Beschattung", included: "+ 1.232,00€", checked: false },
    { id: 3, label: "Energie", included: "+ 1.232,00€", checked: false },
    { id: 4, label: "Steckdosen", included: "+ 1.232,00€", checked: false },
    {
      id: 5,
      label: "Bewegungsmelder",
      included: "+ 1.232,00€",
      checked: false,
    },
    { id: 6, label: "Alarmsystem", included: "+ 1.532,00€", checked: false },
    { id: 7, label: "Kameras", included: "+ 1.532,00€", checked: false },
    { id: 8, label: "Rauchmelder", included: "+ 1.532,00€", checked: false },
    { id: 9, label: "Türstation", included: "+ 4.578,20€", checked: false },
    { id: 10, label: "Zugang", included: "+ 4.578,20€", checked: false },
    { id: 11, label: "Sound", included: "+ 4.578,20€", checked: false },
    { id: 12, label: "Garten", included: "+ 1.232,00€", checked: false },
    { id: 13, label: "Lüftung", included: "+ 1.232,00€", checked: false },
  ],
  bedienung: [
    { id: 0, label: "App", included: "inklusive", checked: true },
    { id: 1, label: "Fernbedienung", included: "+ 1.232,00€", checked: false },
    { id: 2, label: "Szenenschalter", included: "+ 1.232,00€", checked: false },
    {
      id: 3,
      label: "Sprachsteuerung",
      included: "+ 1.239,50€",
      checked: false,
    },
    { id: 4, label: "Bedienpanel", included: "+ 1.232,00€", checked: false },
  ],
  installationsservice: {
    options: [
      {
        value: 0,
        label: "Installation",
        included: "Inklusive",
      },
      {
        value: 1,
        label: "Keine Installation",
      },
    ],
    selectedOption: 0,
    pricingData: null,
  },

  installationDate: getDateToStringWithoutTime(addMonths(new Date(), 1)),
  heimautomatisierung: {
    options: [
      {
        value: 0,
        label: "3 Automatisierungen",
        included: "Inklusive",
      },
      {
        value: 1,
        label: "5 Automatisierungen",
        included: "+ 0,00€",
      },
      {
        value: 2,
        label: "Unbegrenzt Automatisierungen",
        included: "+ 0,00€",
      },
    ],
    selectedOption: 0,
    pricingData: null,
  },
  integration_vorhandener_systeme: {
    options: [
      {
        value: 0,
        label: "Keine Integration",
        included: "",
      },
      {
        value: 1,
        label: "3 Integrationen",
        included: "+ 0,00€",
      },
      {
        value: 2,
        label: "Unbegrenzt Integrationen",
        included: "+ 0,00€",
      },
    ],
    selectedOption: 0,
    pricingData: null,
  },
  fordermittelservice: {
    options: [
      {
        value: 0,
        label: "15% Förderung",
        included: "Inklusive",
      },
      {
        value: 1,
        label: "Keine Förderung",
      },
    ],
    selectedOption: 0,
  },

  laufzeit_wartungsservice: {
    options: [
      {
        value: 0,
        label: "0 Jahr",
      },
      {
        value: 1,
        label: "1 Jahr",
        included: "+ 0,00€",
      },
      {
        value: 2,
        label: "2 Jahre",
        included: "+ 0,00€",
      },
      {
        value: 3,
        label: "3 Jahre",
        included: "+ 0,00€",
      },
    ],
    selectedOption: 0,
    pricingData: null,
  },
  laufzeit_gewahrleistung: {
    options: [
      {
        value: 0,
        label: "2 Jahre",
      },
      {
        value: 1,
        label: "3 Jahre",
        included: "+ 0,00€",
      },
      {
        value: 2,
        label: "5 Jahre",
        included: "+ 0,00€",
      },
    ],
    selectedOption: 0,
    pricingData: null,
  },
  funktionen_PricingData: null,
  bedienung_PricingData: null,
  //Used for pricing calculation
  finalSelections: {
    installationsort: null,
    bauvorhaben: null,
    bauphase: null,
    raume: null,
    hersteller: {
      selectedValue: null,
      priceImpact: null,
      apiData: {
        data: [],
      },
    },
    intention: null,
    funktionen: {
      selectedValues: {},
      priceImpact: null,
      apiData: {
        data: [],
        no_of_devices: 0,
      },
    },
    bedienung: {
      selectedValues: {},
      priceImpact: null,
      apiData: {
        data: [],
        no_of_devices: 0,
      },
    },
    //Not storing apiData for installation service as it will be calculated by Odoo.
    installationsservice: {
      selectedValue: null,
      priceImpact: null,
    },
    installationDate: null,
    //Not storing apiData for installation service as it will be calculated by Odoo.
    heimautomatisierung: {
      selectedValue: null,
      priceImpact: null,
    },
    integration_vorhandener_systeme: {
      selectedValue: null,
      priceImpact: null,
    },
    fordermittelservice: null,
    laufzeit_wartungsservice: {
      selectedValue: null,
      priceImpact: null,
    },
    laufzeit_gewahrleistung: {
      selectedValue: null,
      priceImpact: null,
    },
    installationsdauer: 0,
    totalPrice: 0,
  },
};

export const fetchInitialData = createAsyncThunk("config/fetchInitialData", async () => {
  try {
    const response = await fetchInitialDataApi();
    return response;
  } catch (err) {
    throw new Error(err);
  }
});

export const fetchConfiguratorSummary = createAsyncThunk("config/fetchConfiguratorSummary", async ({ id1, id2 }) => {
  try {
    const response = await fetchConfiguratorSummaryAPI(id1, id2);
    return response;
  } catch (err) {
    throw new Error(err);
  }
});

export const saveDataToServer = createAsyncThunk("config/saveDataToServer", async (_, { getState }) => {
  const finalSelections = getState().config.finalSelections;
  const initialData = getState().config.initialData;
  const dataForServer = {
    temp_trans_id: getState().config.temp_trans_id,
    quotation_id: getState().config.quotation_id,
    redirect_quotation_url: getState().config.quotation_id,
    installationsort: findObjectByKeyValue(
      "installationsort",
      "options",
      finalSelections.installationsort,
      initialData
    ),
    bauvorhaben: findObjectByKeyValue("bauvorhaben", "options", finalSelections.bauvorhaben, initialData),
    bauphase: findObjectByKeyValue("bauphase", "options", finalSelections.bauphase, initialData),
    raume: finalSelections.raume,
    intention: finalSelections.intention,
    system_hersteller: finalSelections.hersteller.apiData,
    funktionen: finalSelections.funktionen.apiData,
    bedienung: finalSelections.bedienung.apiData,
    installationsservice:
      finalSelections.installationsservice.selectedValue === "Installation"
        ? JSON.parse(JSON.stringify(initialData.installationsservice[0].productarray))
        : finalSelections.installationsservice.selectedValue,
    installation_wunschtermin: finalSelections.installationDate,
    heimautomatisierung: findDataPair(
      "Installation Services",
      finalSelections.heimautomatisierung.selectedValue,
      initialData.heimautomatisierung
    ),
    integration_vorhandener_systeme: findDataPair(
      "Installation Services",
      finalSelections.integration_vorhandener_systeme.selectedValue,
      initialData.integration_vorhandener_systeme
    ),
    fordermittelservice: findObjectByKeyValue(
      "fördermittelservice",
      "options",
      finalSelections.fordermittelservice,
      initialData
    ),
    laufzeit_wartungsservice: findDataPair(
      "Wartungsservice",
      finalSelections.laufzeit_wartungsservice.selectedValue,
      initialData
    ),
    laufzeit_gewahrleistung: findDataPair(
      "Gewährleistung",
      finalSelections.laufzeit_gewahrleistung.selectedValue,
      initialData
    ),

    gesamtpreis: finalSelections.totalPrice,
    firstName: getState().config.firstName,
    lastName: getState().config.lastName,
    email: getState().config.email,
    phone: getState().config.phone,
  };

  //Updating quantities (total bedeinung devices + funktionen devices)
  if(finalSelections.installationsservice.selectedValue === "Installation"){
    dataForServer.installationsservice[1].data[1].productdetail[0].product_uom_qty = finalSelections.funktionen.apiData.no_of_devices + finalSelections.bedienung.apiData.no_of_devices;
    dataForServer.installationsservice[1].data[2].productdetail[0].product_uom_qty = finalSelections.funktionen.apiData.no_of_devices + finalSelections.bedienung.apiData.no_of_devices;
  }
  const newDataForServer = modifyDataForServer(dataForServer);
  console.log("Final Selections, please check price impacts in it: ", finalSelections);

  try {
    const response = await saveDataToServerApi(newDataForServer);
    return response;
  } catch (err) {
    throw new Error(err);
  }
});

const konfigurationSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    resetsaveDataToServerStateStatus: (state) => {
      state.saveDataToServerState = null;
    },
    updateUserData: (state, action) => {
      state.firstName = action.payload.vorname;
      state.lastName = action.payload.lastname;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
    },
    updateSelectedBauphase: (state, action) => {
      state.bauphase.selectedOption = action.payload;
      state.finalSelections.bauphase = state.bauphase.options[state.bauphase.selectedOption].label;
    },
    updateSelectedInstallationsort: (state, action) => {
      state.installationsort.selectedOption = action.payload;
      state.finalSelections.installationsort =
        state.installationsort.options[state.installationsort.selectedOption].label;
    },
    updateSelectedRaume: (state, action) => {
      state.raume.selectedOption = action.payload;
      state.finalSelections.raume = state.raume.options[state.raume.selectedOption].value + 1;
      state.finalSelections.funktionen.priceImpact = getFunktionenPriceImpact(
        state.finalSelections.funktionen.selectedValues,
        state.finalSelections.hersteller.selectedValue,
        state.funktionen_PricingData,
        state.finalSelections.raume,
        state.finalSelections.funktionen.apiData,
        state.funktionen,
        state.initialData
      );
      state.finalSelections.bedienung.priceImpact = getBedienungPriceImpact(
        state.finalSelections.bedienung.selectedValues,
        state.finalSelections.hersteller.selectedValue,
        state.bedienung_PricingData,
        state.finalSelections.raume,
        state.bedienung,
        state.finalSelections.bedienung.apiData,
        state.initialData
      );

      state.finalSelections.installationsservice.priceImpact = getInstallationsservicePriceImpact(
        state.finalSelections.installationsservice.selectedValue,
        state.installationsservice.pricingData,
        state.finalSelections.bedienung.apiData.no_of_devices,
        state.finalSelections.funktionen.apiData.no_of_devices
      );

      state.finalSelections.installationsdauer = get_installationsdauer_calculation(
        state.finalSelections.bedienung.apiData.no_of_devices,
        state.finalSelections.funktionen.apiData.no_of_devices
      );

      state.finalSelections.totalPrice = calculateFinalPrice(state.finalSelections);
    },
    updateSelectedBauvorhaben: (state, action) => {
      state.bauvorhaben.selectedOption = action.payload;
      state.finalSelections.bauvorhaben = state.bauvorhaben.options[state.bauvorhaben.selectedOption].label;
      state.finalSelections.totalPrice = calculateFinalPrice(state.finalSelections);
    },
    updateIntention: (state, action) => {
      state.intention.options.map((i) => {
        if (i.id === action.payload) {
          i.checked = !i.checked;
        }
      });
      state.finalSelections.intention = extractSelectedValuesFromCheckboxes(state.intention.options);

      updateFunktionenSelectionsBasedOnIntentions(state.intention, state.funktionen);
      state.finalSelections.funktionen.selectedValues = extractSelectedValuesFromCheckboxes(state.funktionen);
      state.finalSelections.funktionen.priceImpact = getFunktionenPriceImpact(
        state.finalSelections.funktionen.selectedValues,
        state.finalSelections.hersteller.selectedValue,
        state.funktionen_PricingData,
        state.finalSelections.raume,
        state.finalSelections.funktionen.apiData,
        state.funktionen,
        state.initialData
      );
      state.finalSelections.installationsservice.priceImpact = getInstallationsservicePriceImpact(
        state.finalSelections.installationsservice.selectedValue,
        state.installationsservice.pricingData,
        state.finalSelections.bedienung.apiData.no_of_devices,
        state.finalSelections.funktionen.apiData.no_of_devices
      );

      state.finalSelections.installationsdauer = get_installationsdauer_calculation(
        state.finalSelections.bedienung.apiData.no_of_devices,
        state.finalSelections.funktionen.apiData.no_of_devices
      );

      state.finalSelections.totalPrice = calculateFinalPrice(state.finalSelections);
    },
    updateSelectedHersteller: (state, action) => {
      state.hersteller.selectedOption = action.payload;
      state.finalSelections.hersteller.selectedValue = state.hersteller.options[state.hersteller.selectedOption].label;
      state.finalSelections.hersteller.priceImpact =
        state.hersteller.pricingData[state.finalSelections.hersteller.selectedValue];

      //For sending data to API
      state.finalSelections.hersteller.apiData = findDataPair(
        ("Zentrale", state.finalSelections.hersteller.selectedValue),
        state.finalSelections.hersteller.selectedValue,
        state.initialData
      );

      state.finalSelections.funktionen.priceImpact = getFunktionenPriceImpact(
        state.finalSelections.funktionen.selectedValues,
        state.finalSelections.hersteller.selectedValue,
        state.funktionen_PricingData,
        state.finalSelections.raume,
        state.finalSelections.funktionen.apiData,
        state.funktionen,
        state.initialData
      );

      state.finalSelections.bedienung.priceImpact = getBedienungPriceImpact(
        state.finalSelections.bedienung.selectedValues,
        state.finalSelections.hersteller.selectedValue,
        state.bedienung_PricingData,
        state.finalSelections.raume,
        state.bedienung,
        state.finalSelections.bedienung.apiData,
        state.initialData
      );

      state.finalSelections.installationsservice.priceImpact = getInstallationsservicePriceImpact(
        state.finalSelections.installationsservice.selectedValue,
        state.installationsservice.pricingData,
        state.finalSelections.bedienung.apiData.no_of_devices,
        state.finalSelections.funktionen.apiData.no_of_devices
      );

      state.finalSelections.installationsdauer = get_installationsdauer_calculation(
        state.finalSelections.bedienung.apiData.no_of_devices,
        state.finalSelections.funktionen.apiData.no_of_devices
      );

      state.finalSelections.totalPrice = calculateFinalPrice(state.finalSelections);
    },
    updateSingleFunktion: (state, action) => {
      state.funktionen.map((i) => {
        if (i.id === +action.payload) {
          i.checked = !i.checked;
        }
      });

      state.finalSelections.funktionen.selectedValues = extractSelectedValuesFromCheckboxes(state.funktionen);
      state.finalSelections.funktionen.priceImpact = getFunktionenPriceImpact(
        state.finalSelections.funktionen.selectedValues,
        state.finalSelections.hersteller.selectedValue,
        state.funktionen_PricingData,
        state.finalSelections.raume,
        state.finalSelections.funktionen.apiData,
        state.funktionen,
        state.initialData
      );
      state.finalSelections.installationsservice.priceImpact = getInstallationsservicePriceImpact(
        state.finalSelections.installationsservice.selectedValue,
        state.installationsservice.pricingData,
        state.finalSelections.bedienung.apiData.no_of_devices,
        state.finalSelections.funktionen.apiData.no_of_devices
      );

      state.finalSelections.installationsdauer = get_installationsdauer_calculation(
        state.finalSelections.bedienung.apiData.no_of_devices,
        state.finalSelections.funktionen.apiData.no_of_devices
      );

      state.finalSelections.totalPrice = calculateFinalPrice(state.finalSelections);
    },
    updateMultipleFunktionen: (state, action) => {
      state.funktionen.map((i) => {
        if (action.payload.includes(i.id)) {
          i.checked = true;
        }
      });
      state.finalSelections.funktionen.selectedValues = extractSelectedValuesFromCheckboxes(state.funktionen);
      state.finalSelections.funktionen.priceImpact = getFunktionenPriceImpact(
        state.finalSelections.funktionen.selectedValues,
        state.finalSelections.hersteller.selectedValue,
        state.funktionen_PricingData,
        state.finalSelections.raume,
        state.finalSelections.funktionen.apiData,
        state.funktionen,
        state.initialData
      );
      state.finalSelections.installationsservice.priceImpact = getInstallationsservicePriceImpact(
        state.finalSelections.installationsservice.selectedValue,
        state.installationsservice.pricingData,
        state.finalSelections.bedienung.apiData.no_of_devices,
        state.finalSelections.funktionen.apiData.no_of_devices
      );

      state.finalSelections.installationsdauer = get_installationsdauer_calculation(
        state.finalSelections.bedienung.apiData.no_of_devices,
        state.finalSelections.funktionen.apiData.no_of_devices
      );

      state.finalSelections.totalPrice = calculateFinalPrice(state.finalSelections);
    },
    updateSingleBedienung: (state, action) => {
      state.bedienung.map((i) => {
        if (i.id === +action.payload) {
          i.checked = !i.checked;
        }
      });
      state.finalSelections.bedienung.selectedValues = extractSelectedValuesFromCheckboxes(state.bedienung);
      state.finalSelections.bedienung.priceImpact = getBedienungPriceImpact(
        state.finalSelections.bedienung.selectedValues,
        state.finalSelections.hersteller.selectedValue,
        state.bedienung_PricingData,
        state.finalSelections.raume,
        state.bedienung,
        state.finalSelections.bedienung.apiData,
        state.initialData
      );

      state.finalSelections.installationsdauer = get_installationsdauer_calculation(
        state.finalSelections.bedienung.apiData.no_of_devices,
        state.finalSelections.funktionen.apiData.no_of_devices
      );

      state.finalSelections.installationsservice.priceImpact = getInstallationsservicePriceImpact(
        state.finalSelections.installationsservice.selectedValue,
        state.installationsservice.pricingData,
        state.finalSelections.bedienung.apiData.no_of_devices,
        state.finalSelections.funktionen.apiData.no_of_devices
      );
      state.finalSelections.totalPrice = calculateFinalPrice(state.finalSelections);
    },
    updateMultipleBedienung: (state, action) => {
      state.bedienung.map((i) => {
        if (action.payload.includes(i.id)) {
          i.checked = true;
        }
      });
      state.finalSelections.bedienung.selectedValues = extractSelectedValuesFromCheckboxes(state.bedienung);
      state.finalSelections.bedienung.priceImpact = getBedienungPriceImpact(
        state.finalSelections.bedienung.selectedValues,
        state.finalSelections.hersteller.selectedValue,
        state.bedienung_PricingData,
        state.finalSelections.raume,
        state.bedienung,
        state.finalSelections.bedienung.apiData,
        state.initialData
      );

      state.finalSelections.installationsdauer = get_installationsdauer_calculation(
        state.finalSelections.bedienung.apiData.no_of_devices,
        state.finalSelections.funktionen.apiData.no_of_devices
      );

      state.finalSelections.installationsservice.priceImpact = getInstallationsservicePriceImpact(
        state.finalSelections.installationsservice.selectedValue,
        state.installationsservice.pricingData,
        state.finalSelections.bedienung.apiData.no_of_devices,
        state.finalSelections.funktionen.apiData.no_of_devices
      );
      state.finalSelections.totalPrice = calculateFinalPrice(state.finalSelections);
    },
    updateSelectedInstallationsservice: (state, action) => {
      state.installationsservice.selectedOption = action.payload;
      state.finalSelections.installationsservice.selectedValue =
        state.installationsservice.options[state.installationsservice.selectedOption].label;

      state.finalSelections.installationsservice.priceImpact = getInstallationsservicePriceImpact(
        state.finalSelections.installationsservice.selectedValue,
        state.installationsservice.pricingData,
        state.finalSelections.bedienung.apiData.no_of_devices,
        state.finalSelections.funktionen.apiData.no_of_devices
      );

      state.finalSelections.totalPrice = calculateFinalPrice(state.finalSelections);
    },
    updateInstallationDate: (state, action) => {
      state.installationDate = action.payload;
    },
    updateHeimautomatisierung: (state, action) => {
      state.heimautomatisierung.selectedOption = action.payload;

      state.finalSelections.heimautomatisierung.selectedValue =
        state.heimautomatisierung.options[state.heimautomatisierung.selectedOption].label;

      state.finalSelections.heimautomatisierung.priceImpact = get_heimautomatisierung_price_impact(
        state.heimautomatisierung.pricingData,
        state.finalSelections.heimautomatisierung.selectedValue,
        state.heimautomatisierung.options
      );
      state.finalSelections.totalPrice = calculateFinalPrice(state.finalSelections);
    },
    updateIntegrationVorhandenerSysteme: (state, action) => {
      state.integration_vorhandener_systeme.selectedOption = action.payload;
      state.finalSelections.integration_vorhandener_systeme.selectedValue =
        state.integration_vorhandener_systeme.options[state.integration_vorhandener_systeme.selectedOption].label;
      state.finalSelections.integration_vorhandener_systeme.priceImpact =
        getIntegration_vorhandener_systeme_priceimpact(
          state.finalSelections.integration_vorhandener_systeme.selectedValue,
          state.integration_vorhandener_systeme.pricingData,
          state.integration_vorhandener_systeme.options
        );
      state.finalSelections.totalPrice = calculateFinalPrice(state.finalSelections);
    },
    updateFördermittelService: (state, action) => {
      state.fordermittelservice.selectedOption = action.payload;
      state.finalSelections.fordermittelservice =
        state.fordermittelservice.options[state.fordermittelservice.selectedOption].label;

      state.finalSelections.totalPrice = calculateFinalPrice(state.finalSelections);
    },
    updateLaufzeitWartungsservice: (state, action) => {
      state.laufzeit_wartungsservice.selectedOption = action.payload;
      state.finalSelections.laufzeit_wartungsservice.selectedValue =
        state.laufzeit_wartungsservice.options[state.laufzeit_wartungsservice.selectedOption].label;

      state.finalSelections.laufzeit_wartungsservice.priceImpact = get_laufzeit_wartungsservice_price_impact(
        state.finalSelections.laufzeit_wartungsservice.selectedValue,
        state.laufzeit_wartungsservice.pricingData,
        state.laufzeit_wartungsservice.options
      );

      if (action.payload !== 0) {
        state.finalSelections.laufzeit_gewahrleistung.priceImpact = 0;
        state.laufzeit_gewahrleistung.selectedOption = 0;
        state.finalSelections.laufzeit_gewahrleistung.selectedValue =
          state.laufzeit_gewahrleistung.options[state.laufzeit_gewahrleistung.selectedOption].label;
      }
      state.finalSelections.totalPrice = calculateFinalPrice(state.finalSelections);
    },
    update_laufzeit_gewährleistung: (state, action) => {
      state.laufzeit_gewahrleistung.selectedOption = action.payload;
      state.finalSelections.laufzeit_gewahrleistung.selectedValue =
        state.laufzeit_gewahrleistung.options[state.laufzeit_gewahrleistung.selectedOption].label;

      state.finalSelections.laufzeit_gewahrleistung.priceImpact = get_laufzeit_gewahrleistung_price_impact(
        state.finalSelections.laufzeit_gewahrleistung.selectedValue,
        state.laufzeit_gewahrleistung.pricingData,
        state.laufzeit_gewahrleistung.options
      );
      state.finalSelections.totalPrice = calculateFinalPrice(state.finalSelections);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchInitialData.pending, (state) => {
        state.dataLoadingStatus = LOADING;
      })
      .addCase(fetchInitialData.fulfilled, (state, action) => {
        const initialData = action.payload;
        state.initialData = initialData;
        state.bauphase = formatDropdownData(initialData.bauphase);
        state.bauvorhaben = formatDropdownData(initialData.bauvorhaben);
        state.installationsort = formatDropdownData(initialData.installationsort);
        state.intention = formatCheckboxData(initialData.intention);
        state.raume = formatDropdownData(initialData.raume);
        state.funktionen_PricingData = calculateFunktionenPricingData(
          initialData.funktionen[0].productarray,
          initialData
        );
        state.bedienung_PricingData = calculateBedienungPricingData(initialData.bedienung[0].productarray);
        state.hersteller.pricingData = calculateHerstellerPricing(initialData);
        state.installationsservice.pricingData = calculateInstallationServicePricing(
          initialData.installationsservice[0].productarray
        );
        state.heimautomatisierung.pricingData = formatPricingData(initialData.heimautomatisierung[0].productarray);
        state.integration_vorhandener_systeme.pricingData = formatPricingData(
          initialData.integration_vorhandener_systeme[0].productarray
        );
        state.laufzeit_wartungsservice.pricingData = formatPricingData(
          initialData.laufzeit_wartungsservice[0].productarray
        );
        state.laufzeit_gewahrleistung.pricingData = formatPricingData(
          initialData.laufzeit_gewährleistung[0].productarray
        );

        //Initial Pricing Calculation
        state.finalSelections.installationsort =
          state.installationsort.options[state.installationsort.selectedOption].label;
        state.finalSelections.bauvorhaben = state.bauvorhaben.options[state.bauvorhaben.selectedOption].label;
        state.finalSelections.bauphase = state.bauphase.options[state.bauphase.selectedOption].label;
        state.finalSelections.raume = state.raume.options[state.raume.selectedOption].value + 1;
        state.finalSelections.hersteller.selectedValue =
          state.hersteller.options[state.hersteller.selectedOption].label;
        state.finalSelections.hersteller.priceImpact =
          state.hersteller.pricingData[state.finalSelections.hersteller.selectedValue];

        //For sending data to API
        state.finalSelections.hersteller.apiData = findDataPair(
          ("Zentrale", state.finalSelections.hersteller.selectedValue),
          state.finalSelections.hersteller.selectedValue,
          state.initialData
        );

        state.finalSelections.intention = extractSelectedValuesFromCheckboxes(state.intention.options);
        state.finalSelections.funktionen.selectedValues = extractSelectedValuesFromCheckboxes(state.funktionen);
        state.finalSelections.funktionen.priceImpact = getFunktionenPriceImpact(
          state.finalSelections.funktionen.selectedValues,
          state.finalSelections.hersteller.selectedValue,
          state.funktionen_PricingData,
          state.finalSelections.raume,
          state.finalSelections.funktionen.apiData,
          state.funktionen,
          state.initialData
        );
        state.finalSelections.bedienung.selectedValues = extractSelectedValuesFromCheckboxes(state.bedienung);
        state.finalSelections.bedienung.priceImpact = getBedienungPriceImpact(
          state.finalSelections.bedienung.selectedValues,
          state.finalSelections.hersteller.selectedValue,
          state.bedienung_PricingData,
          state.finalSelections.raume,
          state.bedienung,
          state.finalSelections.bedienung.apiData,
          state.initialData
        );

        state.finalSelections.installationsservice.selectedValue =
          state.installationsservice.options[state.installationsservice.selectedOption].label;

        state.finalSelections.installationsservice.priceImpact = getInstallationsservicePriceImpact(
          state.finalSelections.installationsservice.selectedValue,
          state.installationsservice.pricingData,
          state.finalSelections.bedienung.apiData.no_of_devices,
          state.finalSelections.funktionen.apiData.no_of_devices
        );

        state.finalSelections.installationDate = state.installationDate;

        state.finalSelections.heimautomatisierung.selectedValue =
          state.heimautomatisierung.options[state.heimautomatisierung.selectedOption].label;

        state.finalSelections.heimautomatisierung.priceImpact = get_heimautomatisierung_price_impact(
          state.heimautomatisierung.pricingData,
          state.finalSelections.heimautomatisierung.selectedValue,
          state.heimautomatisierung.options
        );

        state.finalSelections.integration_vorhandener_systeme.selectedValue =
          state.integration_vorhandener_systeme.options[state.integration_vorhandener_systeme.selectedOption].label;
        state.finalSelections.integration_vorhandener_systeme.priceImpact =
          getIntegration_vorhandener_systeme_priceimpact(
            state.finalSelections.integration_vorhandener_systeme.selectedValue,
            state.integration_vorhandener_systeme.pricingData,
            state.integration_vorhandener_systeme.options
          );

        state.finalSelections.fordermittelservice =
          state.fordermittelservice.options[state.fordermittelservice.selectedOption].label;

        state.finalSelections.laufzeit_wartungsservice.selectedValue =
          state.laufzeit_wartungsservice.options[state.laufzeit_wartungsservice.selectedOption].label;

        state.finalSelections.laufzeit_wartungsservice.priceImpact = get_laufzeit_wartungsservice_price_impact(
          state.finalSelections.laufzeit_wartungsservice.selectedValue,
          state.laufzeit_wartungsservice.pricingData,
          state.laufzeit_wartungsservice.options
        );

        state.finalSelections.laufzeit_gewahrleistung.selectedValue =
          state.laufzeit_gewahrleistung.options[state.laufzeit_gewahrleistung.selectedOption].label;

        state.finalSelections.laufzeit_gewahrleistung.priceImpact = get_laufzeit_gewahrleistung_price_impact(
          state.finalSelections.laufzeit_gewahrleistung.selectedValue,
          state.laufzeit_gewahrleistung.pricingData,
          state.laufzeit_gewahrleistung.options
        );

        state.finalSelections.installationsdauer = get_installationsdauer_calculation(
          state.finalSelections.bedienung.apiData.no_of_devices,
          state.finalSelections.funktionen.apiData.no_of_devices
        );

        state.finalSelections.totalPrice = calculateFinalPrice(state.finalSelections);

        //All Done
        state.dataLoadingStatus = SUCCEEDED;
      })
      .addCase(fetchInitialData.rejected, (state) => {
        state.dataLoadingStatus = FAILED;
      })
      .addCase(saveDataToServer.pending, (state) => {
        state.saveDataToServerState = LOADING;
      })
      .addCase(saveDataToServer.fulfilled, (state, action) => {
        state.redirect_url = action.payload.redirect_url;
        state.checkout_url = action.payload.checkout_url;
        state.temp_trans_id = action.payload.temp_trans_id;
        state.quotation_id = action.payload.quotation_id;
        state.redirect_quotation_url = action.payload.redirect_quotation_url;
        state.saveDataToServerState = SUCCEEDED;
      })
      .addCase(saveDataToServer.rejected, (state) => {
        state.saveDataToServerState = FAILED;
      })
      .addCase(fetchConfiguratorSummary.pending, (state) => {
        state.configuratorSummaryStatus = LOADING;
      })
      .addCase(fetchConfiguratorSummary.fulfilled, (state, action) => {
        const configuratorSummary = action.payload;
        state.configuratorSummary = configuratorSummary;
        state.temp_trans_id = configuratorSummary.temp_trans_id;
        state.checkout_url = configuratorSummary.redirect_url;
        state.quotation_id = configuratorSummary.quotation_id;
        state.redirect_quotation_url = configuratorSummary.redirect_quotation_url;
        state.firstName = configuratorSummary.firstName;
        state.lastName = configuratorSummary.lastName;
        state.phone = configuratorSummary.phone;
        state.email = configuratorSummary.email;
        state.configuratorSummaryStatus = SUCCEEDED;
      })
      .addCase(fetchConfiguratorSummary.rejected, (state) => {
        state.configuratorSummaryStatus = FAILED;
      });
  },
});

//exporting selectors

export const getInstallationsort = (state) => state.config.installationsort;
export const getBauvorhaben = (state) => state.config.bauvorhaben;
export const getBauphase = (state) => state.config.bauphase;
export const getRaume = (state) => state.config.raume;
export const getDataLoadingStatus = (state) => state.config.dataLoadingStatus;
export const getIntention = (state) => state.config.intention;
export const getHersteller = (state) => state.config.hersteller;
export const getFunktionen = (state) => state.config.funktionen;
export const getBedienung = (state) => state.config.bedienung;
export const getInstallationsservice = (state) => state.config.installationsservice;
export const getInstallationDate = (state) => state.config.installationDate;
export const getHeimautomatisierung = (state) => state.config.heimautomatisierung;
export const getIntegrationVorhandenerSysteme = (state) => state.config.integration_vorhandener_systeme;
export const getFördermittelService = (state) => state.config.fordermittelservice;
export const getLaufzeitWartungsservice = (state) => state.config.laufzeit_wartungsservice;
export const get_laufzeit_gewährleistung = (state) => state.config.laufzeit_gewahrleistung;
export const getFunktionenPricingData = (state) => state.config.funktionen_PricingData;
export const getBedienungPricingData = (state) => state.config.bedienung_PricingData;
export const getInstallationsdauer = (state) => state.config.finalSelections.installationsdauer;
export const getFinalPrice = (state) => state.config.finalSelections.totalPrice;
export const getSaveDataToServerState = (state) => state.config.saveDataToServerState;
export const getRedirectUrl = (state) => state.config.redirect_url;
export const getCheckoutUrl = (state) => state.config.checkout_url;
export const getUserEmail = (state) => state.config.email;
export const getUserFirstName = (state) => state.config.firstName;
export const getUserLastName = (state) => state.config.lastName;
export const getUserPhone = (state) => state.config.phone;
export const getRedirectQuotationUrl = (state) => state.config.redirect_quotation_url;

export const getFunktionenActiveIndexes = (state) => {
  const activeIndexes = [];
  state.config.funktionen.map((i, index) => {
    if (i.checked && i.label !== "Zugang" && i.label !== "Garten") {
      activeIndexes.push(index);
    } else if (i.checked && i.label === "Zugang") {
      activeIndexes.push(10, 14);
    } else if (i.checked && i.label === "Garten") {
      activeIndexes.push(12, 15);
    }
  });
  return activeIndexes;
};
export const getConfiguratorSummaryStatus = (state) => state.config.configuratorSummaryStatus;
export const getBedienungActiveIndexes = (state) => {
  const activeIndexes = [];
  state.config.bedienung.map((i, index) => {
    if (i.checked && i.label === "Bedienpanel") {
      activeIndexes.push(1);
    } else if (i.checked && i.label === "Sprachsteuerung") {
      activeIndexes.push(4);
    } else if (i.checked && i.label === "Fernbedienung") {
      activeIndexes.push(3);
    } else if (i.checked) {
      activeIndexes.push(index);
    }
  });
  return activeIndexes;
};

//TODO: Remove this selector
export const getInitialData = (state) => state.config.initialData;
export const getFinalData = (state) => state.config.finalSelections;
export const getConfiguratorSummaryData = (state) => state.config.configuratorSummary;

export const konfigurationActions = konfigurationSlice.actions;
export default konfigurationSlice.reducer;
