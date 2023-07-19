import "./home.scss";
import HomeConfiguration from "./home-configuration/HomeConfiguration";
import FunctionsControl from "./functions-control/FunctionsControl";
import ServiceControl from "./service-control/ServiceControl";
import Installation from "./installation/Installation";
import SmartHouse from "./smart-house/SmartHouse";
import { useEffect } from "react";
import FooterOne from "../../components/footer/FooterOne";
import { useSelector } from "react-redux";
import { getDataLoadingStatus, getFinalData } from "../../utils/store-2/konfiguration-slice";
import { SUCCEEDED } from "../../utils/constants/constants";
import Loader from "../../components/modals/loader/Loader";

const Home = () => {
  const dataLoadingStatus = useSelector(getDataLoadingStatus);
  //const finalData = useSelector(getFinalData);
  //console.log(finalData);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="main-wrapper flex column-direction">
        <div className="container">
          {dataLoadingStatus === SUCCEEDED ? (
            <>
              <HomeConfiguration />
              <FunctionsControl />
              <ServiceControl />
              <Installation />
              <SmartHouse />
              <FooterOne />
            </>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </>
  );
};
export default Home;
