import "./modals.scss";
import crossIcon from "../../assets/images/close.svg";
import mobileImage1 from "../../assets/images/mobile1.png";
import mobileImage2 from "../../assets/images/mobile2.png";
import mobileImage3 from "../../assets/images/mobile3.png";
import mobileImage4 from "../../assets/images/mobile4.png";
import cover1 from "../../assets/images/automatisierung1.webp";
import cover2 from "../../assets/images/automatisierung2.webp";
import cover3 from "../../assets/images/automatisierung3.webp";
import cover4 from "../../assets/images/automatisierung4.webp";
import icon1 from "../../assets/images/i1.svg";
import icon2 from "../../assets/images/i2.svg";
import icon3 from "../../assets/images/i3.svg";
import icon4 from "../../assets/images/i4.svg";
import icon5 from "../../assets/images/i5.svg";
import icon6 from "../../assets/images/i6.svg";
import icon7 from "../../assets/images/i7.svg";
import icon8 from "../../assets/images/i8.svg";
import icon9 from "../../assets/images/i9.svg";
import icon10 from "../../assets/images/i10.svg";
import icon11 from "../../assets/images/i11.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css/pagination";
import OutsideClickHandler from "react-outside-click-handler";

const AutomatisierungSliderModal = (props) => {
  const detailSlideData = [
    {
      sideImage: mobileImage1,
      coverImage: cover2,
      title: "“Guten Morgen” Szene  ",
      list: [
        {
          icon: icon6,
          listText: "Rollläden hochgefahren",
        },
        {
          icon: icon3,
          listText: "Heizung auf 21°C",
        },
        {
          icon: icon7,
          listText: "Frühstücks-Playlist an",
        },
        {
          icon: icon8,
          listText: "Kaffeemaschine an",
        },
      ],
    },
    {
      sideImage: mobileImage2,
      coverImage: cover1,
      title: "“Außer Haus” Szene ",
      list: [
        {
          icon: icon1,
          listText: "Alle Fenster schließen",
        },
        {
          icon: icon2,
          listText: "Alle Lichter aus",
        },
        {
          icon: icon3,
          listText: "Heizung auf 16°C",
        },
        {
          icon: icon4,
          listText: "Alle Geräte abschalten",
        },
        {
          icon: icon5,
          listText: "Alarmanlage aktiviert",
        },
      ],
    },
    {
      sideImage: mobileImage3,
      coverImage: cover3,
      title: "“Entspannung” Szene ",
      list: [
        {
          icon: icon2,
          listText: "Licht auf 20% gedimmt",
        },
        {
          icon: icon3,
          listText: "Heizung auf 21°C",
        },
        {
          icon: icon7,
          listText: "TV angeschaltet",
        },
        {
          icon: icon9,
          listText: "Saugroboter starten",
        },
      ],
    },
    {
      sideImage: mobileImage4,
      coverImage: cover4,
      title: "“Gute Nacht” Szene ",
      list: [
        {
          icon: icon7,
          listText: "“Gute Nacht”-Playlist an",
        },
        {
          icon: icon10,
          listText: "Haustür abschließen",
        },
        {
          icon: icon6,
          listText: "Rollläden herunterfahren",
        },
        {
          icon: icon5,
          listText: "Alarmanlage aktiviert",
        },
        {
          icon: icon11,
          listText: "Nachtsicht bei Kameras aktiv",
        },
        {
          icon: icon2,
          listText: "Licht im Haus ausschalten",
        },
      ],
    },
  ];

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
            },
          }}
          navigation={{
            prevEl: ".prev",
            nextEl: ".next",
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {detailSlideData.map(
            ({ sideImage, coverImage, title, list }, index) => {
              return (
                <SwiperSlide key={index}>
                  <OutsideClickHandler onOutsideClick={props.closeModal}>
                    <div className="comon-ref prev"></div>
                    <div className="comon-ref next"></div>
                    <div className="modal-content">
                      <div className="modal-body">
                        <img
                          src={crossIcon}
                          alt="crossIcon"
                          className="crossIcon"
                          onClick={props.closeModal}
                        />
                        <div
                          className={`automatisierung-detailed-modal flex image-${index}`}
                        >
                          <section>
                            <h2>{title}</h2>
                            <ul className="list-none">
                              {list.map(({ listText, icon }, index) => {
                                return (
                                  <li key={`list-${index}`}>
                                    <img src={icon} alt="icon" />
                                    <span>{listText}</span>
                                  </li>
                                );
                              })}
                            </ul>
                          </section>
                          <figure>
                            <img src={sideImage} alt="SideImage" />
                          </figure>
                          <img
                            className="coverImage"
                            src={coverImage}
                            alt="coverImage"
                          />
                        </div>
                      </div>
                    </div>
                  </OutsideClickHandler>
                </SwiperSlide>
              );
            }
          )}
        </Swiper>
      </div>
    </div>
  );
};
export default AutomatisierungSliderModal;
