import { useSelector } from "react-redux";
import { getFinalPrice, getFinalData } from "../../utils/store-2/konfiguration-slice";
import { formatGermanPrice } from "../../utils/constants/api";

export default function FooterPrice() {
  const totalPrice = useSelector(getFinalPrice);
  const finalData = useSelector(getFinalData)
  // let priceTotal = formatGermanPrice(totalPrice.totalPrice * .15);
  let priceTotal = formatGermanPrice(totalPrice * .15);
  // let priceTotal = formatGermanPrice(totalPrice);
  console.log(totalPrice.fordermittelservice);
  console.log(finalData.fordermittelservice);
  return (
    <div className="price-wrapper flex items-start">
      <h2>
        Gesamtpreis
        {finalData.fordermittelservice == '15% Förderung' ? (<small style={{font:"12px", color:"var(--gray-color)"}}>inkl. MwSt zzgl. ca. {priceTotal } Fördermittelerstattung</small>) : (<small>inkl. MwSt</small>) }
      </h2>
      <span>
        <small className="discount">{formatGermanPrice(totalPrice * 1.25)}</small>
        {formatGermanPrice(totalPrice)} 
        <small className="mobile">inkl. MwSt, zzgl. {priceTotal} Fördermittelerstattung </small>
      </span>
    </div>
  );
}