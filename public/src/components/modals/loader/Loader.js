import loaderGif from "../../../assets/images/loader2.gif";
import "./loader.scss";

export default function Loader() {
  return (
    <div className="loader_wrapper">
      <img src={loaderGif} alt="loaderGif" />
    </div>
  );
}
