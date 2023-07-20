import { useSelector } from "react-redux";
import bedienungcontrolOptions from "../../../utils/constants/constants-images";
import { getBedienungActiveIndexes } from "../../../utils/store-2/konfiguration-slice";

const ServiceImageComponent = () => {
  const activeIndexes = useSelector(getBedienungActiveIndexes);
  const getClassName = (index) => {
    if (activeIndexes.includes(index)) return "active";
    else return "inactive";
  };
  return (
    <figure>
      <div className="scale-image img_two"></div>
      <figcaption>
        {bedienungcontrolOptions.map(({ icon }, index) => {
          return (
            <span
              className={`${getClassName(
                index
              )} control-options services-list opo-${index + 1}`}
              key={index}
            >
              <img src={icon} alt="icon" />
            </span>
          );
        })}
      </figcaption>
    </figure>
  );
};
export default ServiceImageComponent;
