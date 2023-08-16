import { useSelector, useDispatch } from "react-redux";
import bedienungcontrolOptions from "../../../utils/constants/constants-images";
import { getBedienungActiveIndexes, konfigurationActions } from "../../../utils/store-2/konfiguration-slice";

const ServiceImageComponent = () => {
  const activeIndexes = useSelector(getBedienungActiveIndexes);
  const getClassName = (index) => {
    // console.log(index);
    if (activeIndexes.includes(index)) return "active";
    else return "inactive";
  };
  const dispatch = useDispatch();
  const changeIconCls = event => {
    let spanId = event.currentTarget.id;
    const spanArr = spanId.split("_");
    var ids = spanArr[1];
    var id = spanArr[1];
    if(ids == 1){
      id = 4;
    }
    if(ids == 3){
      id = 1;
    }
    if(ids == 4){
      id = 3;
    }
    if(event.currentTarget.classList.contains('inactive')){
      event.currentTarget.classList.remove('inactive');
      event.currentTarget.classList.add('active')
      dispatch(konfigurationActions.updateSingleBedienung(id));
    }
      else{
      event.currentTarget.classList.remove('active');
      event.currentTarget.classList.add('inactive');
      dispatch(konfigurationActions.updateSingleBedienung(id));
    }
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
              id={`span_${index}`}
              onClick={changeIconCls} 
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
