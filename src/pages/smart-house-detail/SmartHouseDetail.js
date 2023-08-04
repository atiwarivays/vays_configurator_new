import SmartHouseInformation from "./smart-house-information/SmartHouseInformation";
import { useEffect, useState } from "react";
import FooterTwo from "../../components/footer/FooterTwo";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchConfiguratorSummary,
  getBauphase,
  getBauvorhaben,
  getBedienung,
  getCheckoutUrl,
  getConfiguratorSummaryData,
  getConfiguratorSummaryStatus,
  getDataLoadingStatus,
  getFinalData,
  getFunktionen,
  getFördermittelService,
  getHeimautomatisierung,
  getHersteller,
  getInstallationDate,
  getInstallationsdauer,
  getInstallationsort,
  getInstallationsservice,
  getIntegrationVorhandenerSysteme,
  getIntention,
  getLaufzeitWartungsservice,
  get_laufzeit_gewährleistung,
  konfigurationActions,
} from "../../utils/store-2/konfiguration-slice";
import { SUCCEEDED } from "../../lib/messages";
import Loader from "../../components/modals/loader/Loader";
import { DataNotFoundModal } from "../../components/modals/DataNotFoundModal";
import { findIdByLabel, findValueByLabel } from "../../utils/constants/api";
// import obApi from '../../../public/index.html';

export default function SmartHouseDetail() {
  const { id1, id2 } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [storeUpdated, setStoreUpdated] = useState(false);


  // obApi('track', 'Lead');
  //Required to check if this page is being loaded by entering URL in the browser or coming on this from homepage.
  //const redirectUrl = useSelector(getRedirectUrl);
  const configuratorSummaryData = useSelector(getConfiguratorSummaryData);
  const configuratorSummaryStatus = useSelector(getConfiguratorSummaryStatus);
  const dataLoadingStatus = useSelector(getDataLoadingStatus);
  const installationSort = useSelector(getInstallationsort);
  const bauvorhaben = useSelector(getBauvorhaben);
  const bauphase = useSelector(getBauphase);
  const intentions = useSelector(getIntention);
  const hersteller = useSelector(getHersteller);
  const funktionen = useSelector(getFunktionen);
  const bedienung = useSelector(getBedienung);
  const installationsservice = useSelector(getInstallationsservice);
  const heimautomatisierung = useSelector(getHeimautomatisierung);
  const integration_vorhandener_systeme = useSelector(getIntegrationVorhandenerSysteme);
  const laufzeit_wartungsservice = useSelector(getLaufzeitWartungsservice);
  const laufzeit_gewährleistung = useSelector(get_laufzeit_gewährleistung);
  const fordermittelservice = useSelector(getFördermittelService);
  const finalData = useSelector(getFinalData);
  const installationsdauer = useSelector(getInstallationsdauer);
  const installationDate = useSelector(getInstallationDate);
  const checkout_url = useSelector(getCheckoutUrl);

  const finalDataObject = {
    installationDate: installationDate,
    installationsdauer: installationsdauer,
    checkout_url: checkout_url,
    installationsort: finalData.installationsort,
    bauvorhaben: finalData.bauvorhaben,
    bauphase: finalData.bauphase,
    raume: finalData.raume,
    intentions: finalData.intention,
    hersteller: finalData.hersteller.selectedValue,
    funktionen: finalData.funktionen.selectedValues,
    bedienung: finalData.bedienung.selectedValues,
    installationsservice: finalData.installationsservice.selectedValue,
    heimautomatisierung: finalData.heimautomatisierung.selectedValue,
    integration_vorhandener_systeme: finalData.integration_vorhandener_systeme.selectedValue,
    fordermittelservice: finalData.fordermittelservice,
    laufzeit_wartungsservice: finalData.laufzeit_wartungsservice.selectedValue,
    laufzeit_gewährleistung: finalData.laufzeit_gewahrleistung.selectedValue,
    totalPrice: finalData.totalPrice,
    quotation_pdf_url:
      configuratorSummaryData !== null && configuratorSummaryData.quotation_pdf_url !== null
        ? configuratorSummaryData.quotation_pdf_url
        : "#",
  };

  useEffect(() => {
    if (id1 === undefined || id2 === undefined) {
      navigate("/");
    } else if (dataLoadingStatus === SUCCEEDED) {
      dispatch(fetchConfiguratorSummary({ id1, id2 }));
    }
  }, [dataLoadingStatus]);

  //Will only be used when the angebot page is loaded directly, or reloaded.
  useEffect(() => {
    if (configuratorSummaryStatus === SUCCEEDED && configuratorSummaryData?.success === "false") {
      setOpenModal(true);
    } else if (configuratorSummaryStatus === SUCCEEDED) {

      //console.log(configuratorSummaryData);

      //Call all reducers here to update data in state
      dispatch(
        konfigurationActions.updateSelectedInstallationsort(
          findValueByLabel(installationSort.options, configuratorSummaryData.installationsort[0].options)
        )
      );
      dispatch(
        konfigurationActions.updateSelectedBauvorhaben(
          findValueByLabel(bauvorhaben.options, configuratorSummaryData.bauvorhaben[0].options)
        )
      );
      dispatch(
        konfigurationActions.updateSelectedBauphase(
          findValueByLabel(bauphase.options, configuratorSummaryData.bauphase[0].options)
        )
      );
      dispatch(konfigurationActions.updateSelectedRaume(configuratorSummaryData.raume - 1));

      //This dispatch is to uncheck the value of default Heizkosten sparen intention.
      dispatch(konfigurationActions.updateIntention(0));
      for (let i = 0; i < configuratorSummaryData.intention.length; i++) {
        //console.log(configuratorSummaryData.intention[i].options);
        // console.log(findIdByLabel(intentions.options, configuratorSummaryData.intention[i].options));
        dispatch(
          konfigurationActions.updateIntention(
            findIdByLabel(intentions.options, configuratorSummaryData.intention[i].options)
          )
        );
      }
      dispatch(
        konfigurationActions.updateSelectedHersteller(
          findValueByLabel(hersteller.options, configuratorSummaryData.system_hersteller[0].name)
        )
      );

      //Updating selected funcktionen
      const funktionsToSelect = [];
      for (let i = 0; i < configuratorSummaryData.funktionen.length; i++) {
        if (
          configuratorSummaryData.funktionen[i].name === "Sound-Heimkino" ||
          configuratorSummaryData.funktionen[i].name === "Sound-Lautsprecher"
        ) {
          funktionsToSelect.push(findIdByLabel(funktionen, "Sound"));
        } else if (
          configuratorSummaryData.funktionen[i].name === "Alarmsystem-Sirene" ||
          configuratorSummaryData.funktionen[i].name === "Alarmsystem-Tür-/Fensterkontakte"
        ) {
          funktionsToSelect.push(findIdByLabel(funktionen, "Alarmsystem"));
        } else if (configuratorSummaryData.funktionen[i].name === "Sicherheitskameras") {
          funktionsToSelect.push(findIdByLabel(funktionen, "Kameras"));
        } else {
          funktionsToSelect.push(findIdByLabel(funktionen, configuratorSummaryData.funktionen[i].name));
        }
      }
      dispatch(konfigurationActions.updateMultipleFunktionen(funktionsToSelect));

      //Updating selected Bedienung
      const bedienungToSelect = [];
      for (let i = 0; i < configuratorSummaryData.bedienung.length; i++) {
        bedienungToSelect.push(findIdByLabel(bedienung, configuratorSummaryData.bedienung[i].name));
      }
      dispatch(konfigurationActions.updateMultipleBedienung(bedienungToSelect));
            
      dispatch(
        konfigurationActions.updateSelectedInstallationsservice(
          configuratorSummaryData.installation_inklusive ? 0 : 1
        )
      );

      dispatch(konfigurationActions.updateInstallationDate(configuratorSummaryData.installation_wunschtermin));

      if (configuratorSummaryData.heimautomatisierung[0]) {
        dispatch(
          konfigurationActions.updateHeimautomatisierung(
            findValueByLabel(heimautomatisierung.options, configuratorSummaryData.heimautomatisierung[0].name)
          )
        );
      }

      if (configuratorSummaryData.integration_vorhandener_systeme[0]) {
        dispatch(
          konfigurationActions.updateIntegrationVorhandenerSysteme(
            findValueByLabel(
              integration_vorhandener_systeme.options,
              configuratorSummaryData.integration_vorhandener_systeme[0].name
            )
          )
        );
      }
      if (configuratorSummaryData.laufzeit_wartungsservice[0]) {
        dispatch(
          konfigurationActions.updateLaufzeitWartungsservice(
            findValueByLabel(laufzeit_wartungsservice.options, configuratorSummaryData.laufzeit_wartungsservice[0].name)
          )
        );
      }
      if (configuratorSummaryData.laufzeit_gewährleistung[0]) {
        dispatch(
          konfigurationActions.update_laufzeit_gewährleistung(
            findValueByLabel(laufzeit_gewährleistung.options, configuratorSummaryData.laufzeit_gewährleistung[0].name)
          )
        );
      }

      if (configuratorSummaryData.fördermittelservice[0]) {
        dispatch(
          konfigurationActions.updateFördermittelService(
            findValueByLabel(fordermittelservice.options, configuratorSummaryData.fördermittelservice[0].options)
          )
        );
      }
      setStoreUpdated(true);
    }
  }, [configuratorSummaryStatus]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="main-wrapper flex column-direction">
        <div className="container">
          {configuratorSummaryStatus === SUCCEEDED && dataLoadingStatus === SUCCEEDED && storeUpdated === true ? (
            <>
              <SmartHouseInformation finalDataObject={finalDataObject} />
              <FooterTwo />
            </>
          ) : (
            <Loader />
          )}
        </div>
      </div>

      {openModal === true && (
        <DataNotFoundModal
          modalTitle="Fehler!"
          button_text="Zurück zum Konfigurator"
          modalDescription="Für dieses Angebot wurden keine Daten gefunden."
        />
      )}
    </>
  );
}
