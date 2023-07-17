import "./modals.scss";
import crossIcon from "../../assets/images/close.svg";
import modalSideImage1 from "../../assets/images/sliderim1.webp";
import modalSideImage2 from "../../assets/images/sliderim2.webp";
import modalSideImage3 from "../../assets/images/sliderim3.webp";
import modalSideImage4 from "../../assets/images/sliderim4.webp";
import modalSideImage5 from "../../assets/images/sliderim5.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination,Navigation } from "swiper";
import "swiper/css/pagination";
import OutsideClickHandler from "react-outside-click-handler";

export const DetailedSliderModal = (props) => {
  const detailSlideData =[
    {
      sideImage: modalSideImage1,
      title: "Smartphone-App",
      subtitle: "Bedienung",
      description: [
      <p>Bei jeder unserer Konfiguration ist die Steuerung per Smartphone-App standardmäßig inkludiert. So können Sie Ihr Smart Home jederzeit, von unterwegs oder bequem vom Sofa aus steuern.</p>,
      ]
    },
    {
      sideImage: modalSideImage2,
      title: "Bedienpanel",
      subtitle: "Bedienung",
      description: [
      <p>Mit einem Bedienpanel steuern Sie Ihr gesamtes Smart Home von einem zentralen Ort Ihrer Wahl. Üblicherweise bietet sich hierfür die Wandmontage eines Tablets (z.B. iPad) im Wohnzimmer oder im Flur an. Sie können den Montageort selbstverständlich frei festlegen.</p>,
      ]
    },
    {
      sideImage: modalSideImage3,
      subtitle: "Bedienung",
      title: "Sprachsteuerung",
      description: [
      <p>Egal ob Siri, Alexa oder Google Assistant - mit unseren Konfigurationen können Sie Ihr Smart Home mit dem Sprachassistenten Ihrer Wahl steuern und sich somit mit Ihrer Stimme durch Ihr Smart Home navigieren.</p>,
      <p>Sagen Sie beispielsweise: “Alexa, dimme das Licht im Wohnzimmer”, um das Licht im Wohnzimmer zu steuern.</p>
      ]
    },
    {
      sideImage: modalSideImage4,
      subtitle: "Bedienung",
      title: "Szenenschalter",
      description: [
      <p>Mit sogenannten Multifunktionsschaltern (auch “Szenenschalter”) können Sie mehrere Heimautomatisierungen oder Szenen auf bestimmte Tasten des Schalters verteilen.</p>,
          <p>Beispielsweise könnte eine Taste für die Steuerung der Rollläden, eine weitere Taste für die Steuerung der Beleuchtung und weitere Taste für die Steuerung der Heizung belegt werden.</p>
      ]
    },
    {
      sideImage: modalSideImage5,
      subtitle: "Bedienung",
      title: "Fernbedienung",
      description: [
      <p>Auch die Steuerung der Fernbedienung kann in einigen Fällen durchaus sinnvoll sein, wenn das Smartphone mal nicht zur Hand ist. Beispielsweise bietet sich die Steuerung per Fernbedienung im Außenbereich, beispielsweise bei Garagentoren oder der Gartenbeleuchtung an.</p>,
      ]
    }
  ]

  return (
    <div className={`modal-wrapper ${props.modalExtraClass}`}>
      <div className="modal-dialog">
        <Swiper
            slidesPerView={1}
            spaceBetween={24}
            centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              800: {
                slidesPerView: 1,
                spaceBetween: 24,
              },
              0: {
                slidesPerView: 1.2,
                spaceBetween: 16,
              }
            }}
            navigation={{
              prevEl: '.prev',
              nextEl: '.next',
            }}
            modules={[Pagination,Navigation]}
            className="mySwiper"
        >
          {
            detailSlideData.map(({sideImage,title,subtitle,description}, index)=>{
              return(
                  <SwiperSlide key={index}>
                    <OutsideClickHandler
                        onOutsideClick={props.closeModal}
                    >
                    <div className="comon-ref prev"></div>
                    <div className="comon-ref next"></div>
                    <div className="modal-content">
                      <div className="modal-body">
                        <img src={crossIcon} alt="crossIcon" className="crossIcon" onClick={props.closeModal}/>
                        <div className="detailed-modal flex">
                          <figure>
                            <img src={sideImage} alt="modalSideImage"/>
                          </figure>
                          <section>
                            <span>{subtitle}</span>
                            <h2>{title}</h2>
                            {description}
                          </section>
                        </div>
                      </div>
                    </div>
                    </OutsideClickHandler>
                  </SwiperSlide>
              )
            })
          }
        </Swiper>
      </div>
    </div>
  );
};
