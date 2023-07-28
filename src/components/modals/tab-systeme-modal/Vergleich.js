import download from "../../../assets/images/download-black.svg";
import m1 from "../../../assets/images/m1.webp";
import m2 from "../../../assets/images/m2.webp";
import m3 from "../../../assets/images/m3.webp";
import m4 from "../../../assets/images/m4.webp";

export default function Vergleich() {
  const tabOneDataList = [
    {
      icon: m1,
      subtitle: "Modernste Technologie",
      title: "BOSCH",
      description:
        "Der namenhafte Hersteller Bosch setzt mit der neuesten Generation auf den neuen innovativen Verbindungs-standard Matter und hochwertige Komponenten.",
      listTitle: "Verbindungsstandards",
      listData: ["Matter", "ZigBee"],
      urlTitle: "Dokumente",
      linkList: [
        {
          linkTitle: "Bosch_Broschüre.pdf",
          linkUrl:
            "https://drive.google.com/file/d/1Ctgi9M2Qjc-mRWElQUTcfGTnAVysGU8o/view?usp=share_link",
        },
        {
          linkTitle: "Bosch_Zentrale.pdf",
          linkUrl:
            "https://www.bosch-smarthome.com/de/de/produkte/geraete/smart-home-controller",
        },
      ],
    },
    {
      icon: m2,
      subtitle: "Der Marktführer",
      title: "Homematic ",
      description:
        "Mit homematic setzen Sie auf den Marktführer aus Deutschland mit hochwertiger, sicherer und vollkommen aufeinander abgestimmter Technik für die gängigsten Smart Home Bereiche. ",
      listTitle: "Verbindungsstandards",
      listData: ["homematic IP", "homematic Wired"],
      urlTitle: "Dokumente",
      linkList: [
        {
          linkTitle: "homematic_Broschüre.pdf",
          linkUrl:
            "https://homematic-ip.com/de",
        },
        {
          linkTitle: "homematic_Zentrale.pdf",
          linkUrl:
            "https://drive.google.com/file/d/1Hen-OSCUpUzhgyyvFp06Aw2incWnPR_k/view?usp=share_link",
        },
      ],
    },
    {
      icon: m3,
      subtitle: "Für umfangreiche Projekte",
      title: "FIBARO",
      description:
        "Das Home Center 3 von FIBARO überzeugt vor allem bei umfangreichen Projekten und großen Installation durch Tiefe der Funktionalität und Möglichkeiten der individuellen Programmierung.",
      listTitle: "Verbindungsstandards",
      listData: ["Z-Wave Plus", "ZigBee"],
      urlTitle: "Dokumente",
      linkList: [
        {
          linkTitle: "FIBARO_Broschüre.pdf",
          linkUrl:
            "https://drive.google.com/file/d/1BBV_kd8M13cffYthObO822Mq3pP6QM78/view?usp=share_link",
        },
        {
          linkTitle: "FIBARO_Zentrale.pdf",
          linkUrl:
            "https://drive.google.com/file/d/1xbSYNRWe4OnxhMkZq7N4fJIuSESaLQk5/view?usp=share_link",
        },
      ],
    },
    {
      icon: m4,
      subtitle: "Grenzenlose Integrationen",
      title: "Homey",
      description:
        "Wenn für Sie vor allem die Kompatibilität zu Drittsystemen und eine Vielfalt an Integrationen und Schnittstellen wichtig ist, sind Sie bei Homey genau richtig. ",
      listTitle: "Verbindungsstandards",
      listData: [
        "Z-Wave Plus",
        "ZigBee",
        "Wifi",
        "Bluetooth",
        "Infrared",
        "433 MHz",
        "868 MHz",
      ],
      urlTitle: "Dokumente",
      linkList: [
        {
          linkTitle: "homey_Broschüre.pdf",
          linkUrl:
            "https://homey.app/de-de/",
        },
        {
          linkTitle: "homey_Zentrale.pdf",
          linkUrl:
            "https://homey.app/de-de/",
        },
      ],
    },
  ];

  return (
    <>
      <div className="table-responsive">
        <table>
          <tr>
            {tabOneDataList.map(
              ({ icon, subtitle, title, description }, index) => {
                return (
                  <td key={`top-1-${index}`}>
                    <figure>
                      <img src={icon} alt="icon" />
                    </figure>
                    <span>{subtitle}</span>
                    <h2>{title}</h2>
                    <p>{description}</p>
                  </td>
                );
              }
            )}
          </tr>
          <tr>
            {tabOneDataList.map(({ listTitle, listData }, index) => {
              return (
                <td key={`top-2-${index}`}>
                  <h6>{listTitle}</h6>
                  <ul>
                    {listData.map((listData, index) => {
                      return <li key={`data-${index}`}>{listData}</li>;
                    })}
                  </ul>
                </td>
              );
            })}
          </tr>
          <tr>
            {tabOneDataList.map(({ urlTitle, linkList }, index) => {
              return (
                <td key={`top-3-${index}`}>
                  <h6>{urlTitle}</h6>
                  {linkList.map(({ linkTitle, linkUrl }, index) => {
                    return (
                      <a key={`link-${index}`} target="_blank" href={linkUrl}>
                        {linkTitle} <img src={download} alt={download} />
                      </a>
                    );
                  })}
                </td>
              );
            })}
          </tr>
        </table>
      </div>
    </>
  );
}
