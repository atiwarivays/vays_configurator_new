import { useSelector } from "react-redux";
import { getFinalPrice } from "../../utils/store-2/konfiguration-slice";
import { formatGermanPrice } from "../../utils/constants/api";

export default function FooterPrice() {
  const totalPrice = useSelector(getFinalPrice);
  return (
    <div className="price-wrapper flex items-start">
      <h2>
        Gesamtpreis
        <small>inkl. MwSt, zzgl. ca. {formatGermanPrice(totalPrice * .15)} Fördermittelerstattung</small>
      </h2>
      <span>
        <small className="discount">{formatGermanPrice(totalPrice * 1.25)}</small>
        {formatGermanPrice(totalPrice)} <small className="mobile">inkl. MwSt, zzgl. {formatGermanPrice(totalPrice * .15)} Fördermittelerstattung </small>
      </span>
    </div>
  );
}
