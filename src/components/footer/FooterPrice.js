import { useSelector } from "react-redux";
import { getFinalPrice } from "../../utils/store-2/konfiguration-slice";
import { formatGermanPrice } from "../../utils/constants/api";

export default function FooterPrice() {
  const totalPrice = useSelector(getFinalPrice);
  let priceTotal = formatGermanPrice(totalPrice.totalPrice * .15);
  console.log(totalPrice.fordermittelservice);
  return (
    <div className="price-wrapper flex items-start">
      <h2>
        Gesamtpreis
        <small>inkl. MwSt, 
        {totalPrice.fordermittelservice == '15% Förderung' ? (<span style={{font:"25px", color:"var(--gray-color)"}}> zzgl. ca. {priceTotal } Fördermittelerstattung</span>) : '' }
        </small>
      </h2>
      <span>
        <small className="discount">{formatGermanPrice(totalPrice.totalPrice * 1.25)}</small>
        {formatGermanPrice(totalPrice.totalPrice)} <small className="mobile">inkl. MwSt, zzgl. {formatGermanPrice(totalPrice.totalPrice * .15)} Fördermittelerstattung </small>
      </span>
    </div>
  );
}
