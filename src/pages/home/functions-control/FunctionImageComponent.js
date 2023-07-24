import icon1 from "../../../assets/images/1.svg";
import icon2 from "../../../assets/images/2.svg";
import icon3 from "../../../assets/images/3.svg";
import icon4 from "../../../assets/images/4.svg";
import icon5 from "../../../assets/images/5.svg";
import icon6 from "../../../assets/images/6.svg";
import icon7 from "../../../assets/images/7.svg";
import icon8 from "../../../assets/images/8.svg";
import icon9 from "../../../assets/images/9.svg";
import icon10 from "../../../assets/images/10.svg";
import icon11 from "../../../assets/images/11.svg";
import icon12 from "../../../assets/images/12.svg";
import icon13 from "../../../assets/images/13.svg";
import icon14 from "../../../assets/images/14.svg";
import icon15 from "../../../assets/images/11.1.svg";
import icon16 from "../../../assets/images/13.1.svg";
import { getFunktionenActiveIndexes, getHersteller , konfigurationActions} from "../../../utils/store-2/konfiguration-slice";
import { useSelector, useDispatch } from "react-redux";

const FunctionImageComponent = () => {
  const activeIndexes = useSelector(getFunktionenActiveIndexes);
  const herstellerValues = useSelector(getHersteller);

  const controlOptions = [
    { id: 0, icon: icon1 },
    { id: 1, icon: icon2 },
    { id: 2, icon: icon3 },
    { id: 3, icon: icon4 },
    { id: 4, icon: icon5 },
    { id: 5, icon: icon6 },
    { id: 6, icon: icon7 },
    { id: 7, icon: icon8 },
    { id: 8, icon: icon9 },
    { id: 9, icon: icon10 },
    { id: 10, icon: icon11 },
    { id: 11, icon: icon12 },
    { id: 12, icon: icon13 },
    { id: 13, icon: icon14 },
    { id: 14, icon: icon15 },
    { id: 15, icon: icon16 },
  ];

  const filteredControlOptions = controlOptions.filter((option) => {
    return !(
      (herstellerValues.selectedOption === 0 || herstellerValues.selectedOption === 1) &&
      (option.id === 3 || option.id === 13)
    );
  });

  const getClassName = (index) => {
    if (activeIndexes.includes(index)) return "active";
    else return "inactive";
  };
  const dispatch = useDispatch();
  const changeIconClass = event => {
    let spanId = event.currentTarget.id;
    const spanArr = spanId.split("_");
    // alert(spanArr[1]);
    //  alert(event.currentTarget.id+'-=='+spanArr[1]);
    if(event.currentTarget.classList.contains('inactive')){
      event.currentTarget.classList.remove('inactive');
      event.currentTarget.classList.add('active')
      
      dispatch(konfigurationActions.updateSingleFunktion(spanArr[1]));
    }
      else{
      event.currentTarget.classList.remove('active');
      event.currentTarget.classList.add('inactive');
       dispatch(konfigurationActions.updateSingleFunktion(spanArr[1]));
    }
};
  return (
    <figure>
      <div className="scale-image img_one" />
      <figcaption>
        {filteredControlOptions.map(({ icon, id }, index) => {
          return (
            <span className={`${getClassName(id)} control-options opo-${id + 1}`} key={index} 
            id={`span_${id}`} 
            onClick={changeIconClass} 
            >
              <img src={icon} alt="icon" />
            </span>
          );
        })}
      </figcaption>
    </figure>
  );
};
export default FunctionImageComponent;
