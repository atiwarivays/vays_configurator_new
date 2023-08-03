import { calculatePriceTotal, findDataPair, formatGermanPrice } from "../constants/api";

export const formatDropdownData = (data) => {
  const options = [];
  let selectedOption = 0;

  data.map((d, index) => {
    options.push({ value: index, label: d.options });
    if (d.is_default_option === "1") {
      selectedOption = index;
    }
  });
  const values = { selectedOption, options, pricingData: null };
  return values;
};

export const formatCheckboxData = (data) => {
  const options = [];
  data.map((d, index) => {
    options.push({
      id: index,
      label: d.options,
      checked: d.is_default_option === "1",
    });
  });
  const values = { options };
  return values;
};

export const extractSelectedValuesFromCheckboxes = (data) => {
  const selectedValues = [];
  data.map((i) => {
    if (i.checked) {
      selectedValues.push(i.label);
    }
  });
  return selectedValues;
};

const getFunktionenDataToSendToApi = (funktion, hersteller, initialData) => {
  const result = findDataPair(funktion, hersteller, initialData);
  let filteredResultArray = result;
  if (result.length > 2) {
    filteredResultArray = result.filter((data, index) => {
      return data.name === hersteller || index === 0;
    });
  }
  return filteredResultArray;
};

const updateQuantityInDataForApi = (funktion, hersteller, quantity, initialData, totalNumberOfDevices) => {
  const apiFunktionenObjects = getFunktionenDataToSendToApi(funktion, hersteller, initialData);
  const clonnedApiFunktionenObjects = JSON.parse(JSON.stringify(apiFunktionenObjects));

  clonnedApiFunktionenObjects.map((f) => {
    if (f.productdetail[0]) {
      const noOfDevices = f.productdetail[0].product_uom_qty * quantity;
      f.productdetail[0].product_uom_qty = noOfDevices;
      totalNumberOfDevices.push(noOfDevices);
    }
  });

  return clonnedApiFunktionenObjects;
};

export const getFunktionenPriceImpact = (
  selectedFunktionen,
  selectedHersteller,
  funktionenPricingData,
  rooms,
  apiData,
  funktionen,
  initialData
) => {
  let funktionenPrice = 0;
  //For calculating installation price.
  let totalNumberOfDevices = [];
  apiData.data = [];
  selectedFunktionen.map((i) => {
    switch (i) {
      case "Heizung":
      case "Beschattung":
      case "Beleuchtung":
      case "Steckdosen": {
        if (selectedHersteller === "Bosch" || selectedHersteller === "homematic") {
          funktionenPrice += funktionenPricingData[i][selectedHersteller] * rooms;
          apiData.data.push(
            updateQuantityInDataForApi(i, selectedHersteller, rooms, initialData, totalNumberOfDevices)
          );
        } else if (selectedHersteller === "FIBARO" || selectedHersteller === "homey") {
          funktionenPrice += funktionenPricingData[i]["Z-Wave"] * rooms;
          apiData.data.push(updateQuantityInDataForApi(i, "Z-Wave", rooms, initialData, totalNumberOfDevices));
        }
        break;
      }
      case "Energie": {
        if (selectedHersteller === "FIBARO" || selectedHersteller === "homey") {
          const roomsToUse = Math.ceil(rooms / 3);
          funktionenPrice += funktionenPricingData[i]["Z-Wave"] * roomsToUse;
          apiData.data.push(updateQuantityInDataForApi(i, "Z-Wave", roomsToUse, initialData, totalNumberOfDevices));
        }
        break;
      }
      case "Bewegungsmelder":
      case "Rauchmelder": {
        const roomsToUse = Math.ceil(rooms / 2);

        if (selectedHersteller === "Bosch" || selectedHersteller === "homematic") {
          funktionenPrice += funktionenPricingData[i][selectedHersteller] * roomsToUse;
          apiData.data.push(
            updateQuantityInDataForApi(i, selectedHersteller, roomsToUse, initialData, totalNumberOfDevices)
          );
        } else if (selectedHersteller === "FIBARO" || selectedHersteller === "homey") {
          funktionenPrice += funktionenPricingData[i]["Z-Wave"] * roomsToUse;
          apiData.data.push(updateQuantityInDataForApi(i, "Z-Wave", roomsToUse, initialData, totalNumberOfDevices));
        }
        break;
      }
      case "Alarmsystem": {
        let alarmsPrice = 0;
        if (selectedHersteller === "Bosch" || selectedHersteller === "homematic") {
          alarmsPrice = funktionenPricingData[i]["Alarmsystem-Sirene"][selectedHersteller];
          alarmsPrice += funktionenPricingData[i]["Alarmsystem-Tür-/Fensterkontakte"][selectedHersteller] * rooms;

          apiData.data.push(
            updateQuantityInDataForApi("Alarmsystem-Sirene", selectedHersteller, 1, initialData, totalNumberOfDevices)
          );
          apiData.data.push(
            updateQuantityInDataForApi(
              "Alarmsystem-Tür-/Fensterkontakte",
              selectedHersteller,
              rooms,
              initialData,
              totalNumberOfDevices
            )
          );
        } else if (selectedHersteller === "FIBARO" || selectedHersteller === "homey") {
          alarmsPrice = funktionenPricingData[i]["Alarmsystem-Sirene"]["Z-Wave"];
          alarmsPrice += funktionenPricingData[i]["Alarmsystem-Tür-/Fensterkontakte"]["Z-Wave"] * rooms;

          apiData.data.push(
            updateQuantityInDataForApi("Alarmsystem-Sirene", "Z-Wave", 1, initialData, totalNumberOfDevices)
          );
          apiData.data.push(
            updateQuantityInDataForApi(
              "Alarmsystem-Tür-/Fensterkontakte",
              "Z-Wave",
              rooms,
              initialData,
              totalNumberOfDevices
            )
          );
        }

        funktionenPrice += alarmsPrice;
        break;
      }
      case "Kameras": {
        funktionenPrice += funktionenPricingData["Sicherheitskameras"]["Bosch"];
        apiData.data.push(
          updateQuantityInDataForApi("Sicherheitskameras", "Bosch", 1, initialData, totalNumberOfDevices)
        );

        break;
      }
      case "Türstation":
      case "Garten": {
        funktionenPrice += funktionenPricingData[i]["Bosch"];
        apiData.data.push(updateQuantityInDataForApi(i, "Bosch", 1, initialData, totalNumberOfDevices));

        break;
      }
      case "Zugang": {
        if (selectedHersteller === "Bosch" || selectedHersteller === "homematic") {
          funktionenPrice += funktionenPricingData[i][selectedHersteller];
          apiData.data.push(updateQuantityInDataForApi(i, selectedHersteller, 1, initialData, totalNumberOfDevices));
        } else if (selectedHersteller === "FIBARO" || selectedHersteller === "homey") {
          funktionenPrice += funktionenPricingData[i]["Z-Wave"];
          apiData.data.push(updateQuantityInDataForApi(i, "Bosch", 1, initialData, totalNumberOfDevices));
        }
        break;
      }
      case "Sound": {
        let soundPrice = 0;
        const roomsToUse = Math.ceil(rooms / 4);
        if (selectedHersteller === "Bosch" || selectedHersteller === "homematic") {
          soundPrice = funktionenPricingData["Sound-Heimkino"][selectedHersteller];
          soundPrice += funktionenPricingData["Sound-Lautsprecher"][selectedHersteller] * roomsToUse;

          apiData.data.push(
            updateQuantityInDataForApi("Sound-Heimkino", selectedHersteller, 1, initialData, totalNumberOfDevices)
          );
          apiData.data.push(
            updateQuantityInDataForApi(
              "Sound-Lautsprecher",
              selectedHersteller,
              roomsToUse,
              initialData,
              totalNumberOfDevices
            )
          );
        } else if (selectedHersteller === "FIBARO" || selectedHersteller === "homey") {
          soundPrice = funktionenPricingData["Sound-Heimkino"]["Z-Wave"];
          soundPrice += funktionenPricingData["Sound-Lautsprecher"]["Z-Wave"] * roomsToUse;

          apiData.data.push(
            updateQuantityInDataForApi("Sound-Heimkino", "Z-Wave", 1, initialData, totalNumberOfDevices)
          );
          apiData.data.push(
            updateQuantityInDataForApi("Sound-Lautsprecher", "Z-Wave", roomsToUse, initialData, totalNumberOfDevices)
          );
        }
        funktionenPrice += soundPrice;
        break;
      }
      case "Lüftung": {
        if (selectedHersteller === "FIBARO" || selectedHersteller === "homey") {
          const roomsToUse = Math.ceil(rooms / 4);
          funktionenPrice += funktionenPricingData[i]["Z-Wave"] * roomsToUse;
          apiData.data.push(updateQuantityInDataForApi(i, "Z-Wave", roomsToUse, initialData, totalNumberOfDevices));
        }
        break;
      }
    }
  });

  //Uncomment this line if need to see individual quantities added by selection of each funktion
  //apiData.quantities = totalNumberOfDevices;

  let sumOfDeviceQuantities = 0;
  totalNumberOfDevices.forEach((q) => (sumOfDeviceQuantities += q));
  apiData.no_of_devices = sumOfDeviceQuantities;
  //console.log("Funcs: " + sumOfDeviceQuantities);

  const unSelectedPricing = getFunktionenUnselectedPriceImpact(
    selectedFunktionen,
    selectedHersteller,
    funktionenPricingData,
    rooms
  );

  funktionen.map((f) => {
    if (unSelectedPricing[f.label]) {
      f.included = `+ ${formatGermanPrice(unSelectedPricing[f.label])}`;
    } else {
      f.included = "Inklusive";
    }
  });

  return funktionenPrice;
};

export const getFunktionenUnselectedPriceImpact = (
  selectedFunktionen,
  selectedHersteller,
  funktionenPricingData,
  rooms
) => {
  const allFunktionen = [
    "Heizung",
    "Beleuchtung",
    "Beschattung",
    "Steckdosen",
    "Energie",
    "Bewegungsmelder",
    "Alarmsystem",
    "Kameras",
    "Rauchmelder",
    "Türstation",
    "Zugang",
    "Sound",
    "Lüftung",
    "Garten",
  ];

  const unselectedFunktionen = allFunktionen.filter((funktion) => !selectedFunktionen.includes(funktion));
  const unselectedFunktionenPricePairs = {};

  unselectedFunktionen.map((i) => {
    switch (i) {
      case "Heizung":
      case "Beschattung":
      case "Beleuchtung":
      case "Steckdosen": {
        if (selectedHersteller === "Bosch" || selectedHersteller === "homematic") {
          unselectedFunktionenPricePairs[i] = funktionenPricingData[i][selectedHersteller] * rooms;
        } else if (selectedHersteller === "FIBARO" || selectedHersteller === "homey") {
          unselectedFunktionenPricePairs[i] = funktionenPricingData[i]["Z-Wave"] * rooms;
        }
        break;
      }
      case "Energie": {
        if (selectedHersteller === "FIBARO" || selectedHersteller === "homey") {
          const roomsToUse = Math.ceil(rooms / 3);
          unselectedFunktionenPricePairs[i] = funktionenPricingData[i]["Z-Wave"] * roomsToUse;
        }
        break;
      }
      case "Bewegungsmelder":
      case "Rauchmelder": {
        const roomsToUse = Math.ceil(rooms / 2);
        if (selectedHersteller === "Bosch" || selectedHersteller === "homematic") {
          unselectedFunktionenPricePairs[i] = funktionenPricingData[i][selectedHersteller] * roomsToUse;
        } else if (selectedHersteller === "FIBARO" || selectedHersteller === "homey") {
          unselectedFunktionenPricePairs[i] = funktionenPricingData[i]["Z-Wave"] * roomsToUse;
        }
        break;
      }
      case "Alarmsystem": {
        let alarmsPrice = 0;
        if (selectedHersteller === "Bosch" || selectedHersteller === "homematic") {
          alarmsPrice = funktionenPricingData[i]["Alarmsystem-Sirene"][selectedHersteller];
          alarmsPrice += funktionenPricingData[i]["Alarmsystem-Tür-/Fensterkontakte"][selectedHersteller] * rooms;
        } else if (selectedHersteller === "FIBARO" || selectedHersteller === "homey") {
          alarmsPrice = funktionenPricingData[i]["Alarmsystem-Sirene"]["Z-Wave"];
          alarmsPrice += funktionenPricingData[i]["Alarmsystem-Tür-/Fensterkontakte"]["Z-Wave"] * rooms;
        }
        unselectedFunktionenPricePairs[i] = Math.round(alarmsPrice);
        break;
      }
      case "Kameras": {
        unselectedFunktionenPricePairs[i] = funktionenPricingData["Sicherheitskameras"]["Bosch"];
        break;
      }
      case "Türstation":
      case "Garten": {
        unselectedFunktionenPricePairs[i] = funktionenPricingData[i]["Bosch"];
        break;
      }
      case "Zugang": {
        if (selectedHersteller === "Bosch" || selectedHersteller === "homematic") {
          unselectedFunktionenPricePairs[i] = funktionenPricingData[i][selectedHersteller];
        } else if (selectedHersteller === "FIBARO" || selectedHersteller === "homey") {
          unselectedFunktionenPricePairs[i] = funktionenPricingData[i]["Z-Wave"];
        }
        break;
      }
      case "Sound": {
        let soundPrice = 0;
        const roomsToUse = Math.ceil(rooms / 4);
        if (selectedHersteller === "Bosch" || selectedHersteller === "homematic") {
          soundPrice = funktionenPricingData["Sound-Heimkino"][selectedHersteller];
          soundPrice += funktionenPricingData["Sound-Lautsprecher"][selectedHersteller] * roomsToUse;
        } else if (selectedHersteller === "FIBARO" || selectedHersteller === "homey") {
          soundPrice = funktionenPricingData["Sound-Heimkino"]["Z-Wave"];
          soundPrice += funktionenPricingData["Sound-Lautsprecher"]["Z-Wave"] * roomsToUse;
        }
        unselectedFunktionenPricePairs[i] = Math.round(soundPrice);
        break;
      }
      case "Lüftung": {
        if (selectedHersteller === "FIBARO" || selectedHersteller === "homey") {
          const roomsToUse = Math.ceil(rooms / 4);
          unselectedFunktionenPricePairs[i] = funktionenPricingData[i]["Z-Wave"] * roomsToUse;
        }
        break;
      }
    }
  });
  return unselectedFunktionenPricePairs;
};

const getBedienungDataToSendToApi = (bedienung, hersteller, initialData) => {
  const result = findDataPair(bedienung, hersteller, initialData);
  let filteredResultArray = result;
  if (result.length > 2) {
    filteredResultArray = result.filter((data, index) => {
      return data.name === hersteller || index === 0;
    });
  }
  return filteredResultArray;
};

const updateBedienungQuantityInDataForApi = (bedienung, hersteller, quantity, initialData, totalNumberOfDevices) => {
  const apiBedienungObjects = getBedienungDataToSendToApi(bedienung, hersteller, initialData);
  const clonnedApiBedienungObjects = JSON.parse(JSON.stringify(apiBedienungObjects));

  clonnedApiBedienungObjects.map((b) => {
    if (b.productdetail[0]) {
      const noOfDevices = b.productdetail[0].product_uom_qty * quantity;
      b.productdetail[0].product_uom_qty = noOfDevices;
      totalNumberOfDevices.push(noOfDevices);
    }
  });

  return clonnedApiBedienungObjects;
};

export const getBedienungPriceImpact = (
  selectedBedienung,
  selectedHersteller,
  bedienungPricingData,
  rooms,
  bedienung,
  apiData,
  initialData
) => {
  let bedienungPrice = 0;
  let totalNumberOfDevices = [];
  apiData.data = [];

  selectedBedienung.map((i) => {
    switch (i) {
      case "App": {
        totalNumberOfDevices.push(1);
        break;
      }
      case "Sprachsteuerung": {
        bedienungPrice += bedienungPricingData[i]["Bosch"] * rooms;
        apiData.data.push(updateBedienungQuantityInDataForApi(i, "Bosch", rooms, initialData, totalNumberOfDevices));
        break;
      }
      case "Fernbedienung":
      case "Bedienpanel": {
        if (selectedHersteller === "Bosch" || selectedHersteller === "homematic") {
          bedienungPrice += bedienungPricingData[i][selectedHersteller];
          apiData.data.push(
            updateBedienungQuantityInDataForApi(i, selectedHersteller, 1, initialData, totalNumberOfDevices)
          );
        } else if (selectedHersteller === "FIBARO" || selectedHersteller === "homey") {
          bedienungPrice += bedienungPricingData[i]["Z-Wave"];
          apiData.data.push(updateBedienungQuantityInDataForApi(i, "Z-Wave", 1, initialData, totalNumberOfDevices));
        }

        break;
      }
      case "Szenenschalter": {
        if (selectedHersteller === "Bosch" || selectedHersteller === "homematic") {
          bedienungPrice += bedienungPricingData[i][selectedHersteller] * rooms;
          apiData.data.push(
            updateBedienungQuantityInDataForApi(i, selectedHersteller, rooms, initialData, totalNumberOfDevices)
          );
        } else if (selectedHersteller === "FIBARO" || selectedHersteller === "homey") {
          bedienungPrice += bedienungPricingData[i]["Z-Wave"] * rooms;
          apiData.data.push(updateBedienungQuantityInDataForApi(i, "Z-Wave", rooms, initialData, totalNumberOfDevices));
        }

        break;
      }
    }
  });

  //Uncomment this line if need to see individual quantities added by selection of each bedienung
  //apiData.quantities = totalNumberOfDevices;

  let sumOfDeviceQuantities = 0;
  totalNumberOfDevices.forEach((q) => (sumOfDeviceQuantities += q));
  apiData.no_of_devices = sumOfDeviceQuantities;
  //console.log("Beden: " + sumOfDeviceQuantities);

  const unSelectedPricing = getUnselectedBedienungPriceImpact(
    selectedBedienung,
    selectedHersteller,
    bedienungPricingData,
    rooms
  );

  bedienung.map((b) => {
    if (unSelectedPricing[b.label]) {
      b.included = `+ ${formatGermanPrice(unSelectedPricing[b.label])}`;
    } else {
      b.included = "Inklusive";
    }
  });

  return bedienungPrice;
};

export const getUnselectedBedienungPriceImpact = (
  selectedBedienung,
  selectedHersteller,
  bedienungPricingData,
  rooms
) => {
  const allBedienung = ["Sprachsteuerung", "Fernbedienung", "Bedienpanel", "Szenenschalter"];

  const unselectedBedienung = allBedienung.filter((b) => !selectedBedienung.includes(b));

  const unselectedBedienungPricePairs = {};

  unselectedBedienung.map((i) => {
    switch (i) {
      case "Sprachsteuerung": {
        unselectedBedienungPricePairs[i] = bedienungPricingData[i]["Bosch"] * rooms;
        break;
      }
      case "Fernbedienung":
      case "Bedienpanel": {
        if (selectedHersteller === "Bosch" || selectedHersteller === "homematic") {
          unselectedBedienungPricePairs[i] = bedienungPricingData[i][selectedHersteller];
        } else if (selectedHersteller === "FIBARO" || selectedHersteller === "homey") {
          unselectedBedienungPricePairs[i] = bedienungPricingData[i]["Z-Wave"];
        }
        break;
      }
      case "Szenenschalter": {
        if (selectedHersteller === "Bosch" || selectedHersteller === "homematic") {
          unselectedBedienungPricePairs[i] = bedienungPricingData[i][selectedHersteller] * rooms;
        } else if (selectedHersteller === "FIBARO" || selectedHersteller === "homey") {
          unselectedBedienungPricePairs[i] = bedienungPricingData[i]["Z-Wave"] * rooms;
        }
        break;
      }
    }
  });
  return unselectedBedienungPricePairs;
};

export const getIntegration_vorhandener_systeme_priceimpact = (selectedIntegration, pricingData, options) => {
  let priceImpact = 0;
  if (selectedIntegration !== "Keine Integration") {
    priceImpact = pricingData["Installation Services"][selectedIntegration];
  }

  options.map((data) => {
    if (data.label !== "Keine Integration") {
      data.included = `+ ${formatGermanPrice(pricingData["Installation Services"][data.label])}`;
    }
  });

  return priceImpact;
};

export const getInstallationsservicePriceImpact = (
  selectedService,
  pricingData,
  selectedBedienungNo,
  selectedFunktionenNo
) => {
  let installationServicePrice = 0;
  if (selectedService === "Installation") {
    installationServicePrice = pricingData.extension * (selectedBedienungNo + selectedFunktionenNo);
    installationServicePrice += pricingData.basePackage;
  }
  return installationServicePrice;
};

export const get_laufzeit_wartungsservice_price_impact = (selectedWartung, pricingData, options) => {
  let laufzeit_wartungsservice_price = 0;
  if (selectedWartung === "0 Jahr") {
    laufzeit_wartungsservice_price = 0;
  } else if (selectedWartung === "1 Jahr") {
    laufzeit_wartungsservice_price = pricingData.Wartungsservice["1 Jahr"];
  } else if (selectedWartung === "2 Jahre") {
    laufzeit_wartungsservice_price = pricingData.Wartungsservice["2 Jahre"];
  } else if (selectedWartung === "3 Jahre") {
    laufzeit_wartungsservice_price = pricingData.Wartungsservice["3 Jahre"];
  }

  options.map((data) => {
    if (data.label === "1 Jahr") {
      data.included = `+ ${formatGermanPrice(pricingData.Wartungsservice["1 Jahr"])}`;
    } else if (data.label === "2 Jahre") {
      data.included = `+ ${formatGermanPrice(pricingData.Wartungsservice["2 Jahre"])}`;
    } else if (data.label === "3 Jahre") {
      data.included = `+ ${formatGermanPrice(pricingData.Wartungsservice["3 Jahre"])}`;
    } else if (data.label === "0 Jahr") {
      data.included = "";
    }
  });

  return laufzeit_wartungsservice_price;
};

export const get_laufzeit_gewahrleistung_price_impact = (selectedGewahrleistung, pricingData, options) => {
  let laufzeit_gewahrleistung_price = 0;
  if (selectedGewahrleistung === "2 Jahre") {
    laufzeit_gewahrleistung_price = 0;
  } else if (selectedGewahrleistung === "3 Jahre") {
    laufzeit_gewahrleistung_price = pricingData.Gewährleistung["3 Jahre"];
  } else if (selectedGewahrleistung === "5 Jahre") {
    laufzeit_gewahrleistung_price = pricingData.Gewährleistung["5 Jahre"];
  }

  options.map((data) => {
    if (data.label === "3 Jahre") {
      data.included = `+ ${formatGermanPrice(pricingData.Gewährleistung["3 Jahre"])}`;
    } else if (data.label === "5 Jahre") {
      data.included = `+ ${formatGermanPrice(pricingData.Gewährleistung["5 Jahre"])}`;
    } else if (data.label === "2 Jahre") {
      data.included = "";
    }
  });

  return laufzeit_gewahrleistung_price;
};

export const calculateFinalPrice = (finalSelections) => {
  let totalPrice = 0;
  for (let key in finalSelections) {
    if (finalSelections[key].hasOwnProperty("priceImpact")) {
      totalPrice += finalSelections[key].priceImpact;
    }
  }
  if (
    finalSelections.fordermittelservice === "15% Förderung" &&
    finalSelections.bauvorhaben !== "Neubau" &&
    finalSelections.installationsservice.selectedValue === "Installation"
  ) {
    const discount = totalPrice * 0.15;
    totalPrice = totalPrice - discount;
  }
  return totalPrice.toFixed(2);
};

export const updateFunktionenSelectionsBasedOnIntentions = (selectedIntentions, funktionen) => {
  const intentionsEffect = {
    0: [0],
    1: [4, 3],
    2: [0, 1, 2],
    3: [7, 6, 8],
    4: [0, 1, 2, 7, 6, 8, 4, 3],
    5: [0, 1, 2, 7, 6, 8],
  };

  const funktionenToSelect = [];

  selectedIntentions.options.map((i, index) => {
    if (i.checked) {
      intentionsEffect[index].map((j) => {
        if (!funktionenToSelect.includes(j)) {
          funktionenToSelect.push(j);
        }
      });
    }
  });
  //Reset all functions
  funktionen.map((f) => (f.checked = false));

  //Apply latest selection to functions as per intention
  funktionenToSelect.map((f) => {
    funktionen[f].checked = true;
  });
};

export const get_installationsdauer_calculation = (bedienungQty, funktionenQty) => {
  // const installationsdauer = Math.round((bedienungQty + funktionenQty) * 0.5);
  var installationsdauer_final = ((bedienungQty + funktionenQty) / 15).toFixed(2);
  let decimalValue = installationsdauer_final.toString().indexOf(".");
  let only_decimal_value = installationsdauer_final.toString().substring(decimalValue+1);

  const installationsdauer = Math.round((bedienungQty + funktionenQty) / 15);
  if (installationsdauer_final > 0 && installationsdauer_final < 1) {
    installationsdauer_final = 1;
  }
  else
  {
    if(only_decimal_value>49)
    {
      installationsdauer_final = installationsdauer;
    }
    else
    {
      installationsdauer_final = installationsdauer+1;
    }
    
  }
  return installationsdauer_final;
};

export const get_heimautomatisierung_price_impact = (pricingData, selectedHeimautomatisierung, options) => {
  let heimautomatisierungPrice = 0;
  if (selectedHeimautomatisierung !== "3 Automatisierungen") {
    heimautomatisierungPrice = pricingData["Installation Services"][selectedHeimautomatisierung];
  }

  options.map((data) => {
    if (data.label !== "3 Automatisierungen") {
      data.included = `+ ${formatGermanPrice(pricingData["Installation Services"][data.label])}`;
    }
  });

  return heimautomatisierungPrice;
};

export const formatPricingData = (data) => {
  const mappedArray = data.map((item) => {
    return {
      functionValue: item.data[0].name,
      herstellerValue: item.data[1].name,
      totalPrice: item.data[1].productdetail[0].price_total,
    };
  });

  const pricingData = {};
  mappedArray.forEach((item) => {
    const { functionValue, herstellerValue, totalPrice } = item;
    if (!pricingData[functionValue]) {
      pricingData[functionValue] = {};
    }
    if (!pricingData[functionValue][herstellerValue]) {
      pricingData[functionValue][herstellerValue] = 0;
    }
    pricingData[functionValue][herstellerValue] += totalPrice;
  });

  return pricingData;
};

export const calculateFunktionenPricingData = (data, initialData) => {
  const mappedArray = data.map((item) => {
    return {
      functionValue: item.data[0].name,
      herstellerValue: item.data[1].name,
      totalPrice: item.data[1].productdetail[0].price_total,
    };
  });

  const pricingData = {};
  mappedArray.forEach((item) => {
    const { functionValue, herstellerValue, totalPrice } = item;
    if (!pricingData[functionValue]) {
      pricingData[functionValue] = {};
    }
    if (!pricingData[functionValue][herstellerValue]) {
      pricingData[functionValue][herstellerValue] = 0;
    }
    pricingData[functionValue][herstellerValue] += totalPrice;
  });

  pricingData.Garten.Bosch = calculatePriceTotal(findDataPair("Garten", "Bosch", initialData), "Bosch");
  pricingData.Garten.homematic = pricingData.Garten.Bosch;
  pricingData.Garten["Z-Wave"] = pricingData.Garten.Bosch;

  pricingData["Sound-Heimkino"].Bosch = calculatePriceTotal(
    findDataPair("Sound-Heimkino", "Bosch", initialData),
    "Bosch"
  );
  pricingData["Sound-Heimkino"].homematic = pricingData["Sound-Heimkino"].Bosch;
  pricingData["Sound-Heimkino"]["Z-Wave"] = pricingData["Sound-Heimkino"].Bosch;

  pricingData["Sound-Lautsprecher"].Bosch = calculatePriceTotal(
    findDataPair("Sound-Lautsprecher", "Bosch", initialData),
    "Bosch"
  );
  pricingData["Sound-Lautsprecher"].homematic = pricingData["Sound-Lautsprecher"].Bosch;
  pricingData["Sound-Lautsprecher"]["Z-Wave"] = pricingData["Sound-Lautsprecher"].Bosch;

  pricingData.Türstation.Bosch = +calculatePriceTotal(
    findDataPair("Türstation", "Bosch", initialData),
    "Bosch"
  ).toFixed(2);
  pricingData.Türstation.homematic = pricingData.Türstation.Bosch;
  pricingData.Türstation["Z-Wave"] = pricingData.Türstation.Bosch;

  pricingData.Sicherheitskameras.Bosch = calculatePriceTotal(
    findDataPair("Sicherheitskameras", "Bosch", initialData),
    "Bosch"
  );
  pricingData.Sicherheitskameras.homematic = pricingData.Sicherheitskameras.Bosch;
  pricingData.Sicherheitskameras["Z-Wave"] = pricingData.Sicherheitskameras.Bosch;

  pricingData.Energie["Z-Wave"] = calculatePriceTotal(findDataPair("Energie", "Z-Wave", initialData), "Z-Wave");

  pricingData.Beleuchtung.homematic = calculatePriceTotal(
    findDataPair("Beleuchtung", "homematic", initialData),
    "homematic"
  );
  pricingData.Beleuchtung["Z-Wave"] = calculatePriceTotal(findDataPair("Beleuchtung", "Z-Wave", initialData), "Z-Wave");

  pricingData.Beschattung.homematic = calculatePriceTotal(
    findDataPair("Beschattung", "homematic", initialData),
    "homematic"
  );

  pricingData["Alarmsystem-Sirene"].homematic = calculatePriceTotal(
    findDataPair("Alarmsystem-Sirene", "homematic", initialData),
    "homematic"
  );
  pricingData.Alarmsystem = {
    "Alarmsystem-Sirene": pricingData["Alarmsystem-Sirene"],
    "Alarmsystem-Tür-/Fensterkontakte": pricingData["Alarmsystem-Tür-/Fensterkontakte"],
  };

  pricingData["Zugang"].homematic = calculatePriceTotal(findDataPair("Zugang", "homematic", initialData), "homematic");

  return pricingData;
};

export const calculateBedienungPricingData = (data) => {
  const pricingData = {
    Sprachsteuerung: {
      Bosch: 0,
      homematic: 0,
      "Z-Wave": 0,
    },
    Fernbedienung: { Bosch: 0, homematic: 0, "Z-Wave": 0 },
    Szenenschalter: { Bosch: 0, homematic: 0, "Z-Wave": 0 },
    Bedienpanel: { Bosch: 0, homematic: 0, "Z-Wave": 0 },
  };
  pricingData.Fernbedienung.Bosch = data[0].data[1].productdetail[0].price_total;
  pricingData.Fernbedienung["Z-Wave"] = data[3].data[1].productdetail[0].price_total;
  pricingData.Fernbedienung.homematic = data[2].data[1].productdetail[0].price_total;
  pricingData.Sprachsteuerung.Bosch = data[4].data[1].productdetail[0].price_total;
  pricingData.Sprachsteuerung.Bosch = data[1].data[1].productdetail[0].price_total;
  // + data[1].data[2].productdetail[0].price_total +
  // data[1].data[3].productdetail[0].price_total;
  pricingData.Sprachsteuerung.homematic = pricingData.Sprachsteuerung.Bosch;
  pricingData.Sprachsteuerung["Z-Wave"] = pricingData.Sprachsteuerung.Bosch;

  pricingData.Szenenschalter.Bosch = findDataPair("Szenenschalter", "Bosch", data)[1].productdetail[0].price_total;
  pricingData.Szenenschalter.homematic = findDataPair(
    "Szenenschalter",
    "homematic",
    data
  )[1].productdetail[0].price_total;
  pricingData.Szenenschalter["Z-Wave"] = findDataPair("Szenenschalter", "Z-Wave", data)[1].productdetail[0].price_total;

  const bedienpanelData = findDataPair("Bedienpanel", "Bosch", data);

  pricingData.Bedienpanel.Bosch =
    bedienpanelData[2].productdetail[0].price_total +
    bedienpanelData[4].productdetail[0].price_total +
    bedienpanelData[7].productdetail[0].price_total;

  pricingData.Bedienpanel["Z-Wave"] = pricingData.Bedienpanel.Bosch;
  pricingData.Bedienpanel.homematic = pricingData.Bedienpanel.Bosch;
  return pricingData;
};

export const calculateInstallationServicePricing = (data) => {
  const pricing = {
    basePackage: null,
    extension: null,
  };
  data[0].data.map((i) => {
    if (i.productdetail[0]) {
      pricing.basePackage += i.productdetail[0].price_total;
    }
  });
  data[1].data.map((i) => {
    if (i.productdetail[0]) {
      pricing.extension += i.productdetail[0].price_total;
    }
  });
  return pricing;
};

export const calculateHerstellerPricing = (initialData) => {
  return {
    Bosch: calculatePriceTotal(findDataPair("Zentrale", "Bosch", initialData), "Bosch"),
    homematic: calculatePriceTotal(findDataPair("Zentrale", "homematic", initialData), "homematic"),
    FIBARO: calculatePriceTotal(findDataPair("Zentrale", "FIBARO", initialData), "FIBARO"),
    homey: calculatePriceTotal(findDataPair("Zentrale-Homey", "homey", initialData), "homey"),
  };
};

// export const getTotalPrice = (functionValue, herstellerValue) => {
//   if (finalArray[functionValue] && finalArray[functionValue][herstellerValue]) {
//     return finalArray[functionValue][herstellerValue];
//   }
//   return 0;
// };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const getDateToStringWithoutTime = (date) => {
  return date.getDate() + " " + MONTHS[date.getMonth()] + " " + date.getFullYear();
};

//For changing structure of data to send to API

export const modifyDataForServer = (dataForServer) => {
  const newDataForServer = {
    temp_trans_id: dataForServer.temp_trans_id,
    quotation_id: dataForServer.quotation_id,
    installationsort: [{ id: dataForServer.installationsort.id, options: dataForServer.installationsort.options }],
    bauvorhaben: [{ id: dataForServer.bauvorhaben.id, options: dataForServer.bauvorhaben.options }],
    bauphase: [{ id: dataForServer.bauphase.id, options: dataForServer.bauphase.options }],
    raume: dataForServer.raume,
    intention: dataForServer.intention.map((i, index) => {
      return { id: index, options: i };
    }),
    system_hersteller: [
      {
        id: dataForServer.system_hersteller[1].id,
        name: dataForServer.system_hersteller[1].name,
        price: dataForServer.system_hersteller[1].productdetail[0].price_total,
      },
    ],
    funktionen: dataForServer.funktionen.data.map((i) => {
      if (i.length === 2) {
        return {
          id: i[1].id,
          name: i[0].name,
          price: i[1].productdetail[0].price_total,
          qty: i[1].productdetail[0].product_uom_qty,
        };
      } else {
        const funktions = [];
        i.map((j, index) => {
          if (index > 0) {
            funktions.push({
              id: j.id,
              name: i[0].name,
              price: j.productdetail[0].price_total,
              qty: j.productdetail[0].product_uom_qty,
            });
          }
        });
        return funktions;
      }
    }),
    bedienung: dataForServer.bedienung.data.map((i) => {
      if (i.length === 2) {
        return {
          id: i[1].id,
          name: i[0].name,
          price: i[1].productdetail[0].price_total,
          qty: i[1].productdetail[0].product_uom_qty,
        };
      } else {
        const bedienungs = [];
        i.map((j, index) => {
          if (index > 0) {
            bedienungs.push({
              id: j.id,
              name: i[0].name,
              price: j.productdetail[0].price_total,
              qty: j.productdetail[0].product_uom_qty,
            });
          }
        });
        return bedienungs;
      }
    }),
    installationsservice: dataForServer.installationsservice,
    installation_wunschtermin:
      dataForServer.installationsservice === "Keine Installation" ? null : dataForServer.installation_wunschtermin,
    heimautomatisierung: dataForServer.heimautomatisierung && [
      {
        id: dataForServer.heimautomatisierung[1].id,
        name: dataForServer.heimautomatisierung[1].name,
        price: dataForServer.heimautomatisierung[1].productdetail[0].price_total,
        qty: dataForServer.heimautomatisierung[1].productdetail[0].product_uom_qty,
      },
    ],

    integration_vorhandener_systeme: dataForServer.integration_vorhandener_systeme && [
      {
        id: dataForServer.integration_vorhandener_systeme[1].id,
        name: dataForServer.integration_vorhandener_systeme[1].name,
        price: dataForServer.integration_vorhandener_systeme[1].productdetail[0].price_total,
        qty: dataForServer.integration_vorhandener_systeme[1].productdetail[0].product_uom_qty,
      },
    ],

    fördermittelservice:
      dataForServer.installationsservice === "Keine Installation"
        ? null
        : [
          {
            id: dataForServer.fordermittelservice.id,
            options: dataForServer.fordermittelservice.options,
          },
        ],
    laufzeit_wartungsservice: dataForServer.laufzeit_wartungsservice && [
      {
        id: dataForServer.laufzeit_wartungsservice[1].id,
        name: dataForServer.laufzeit_wartungsservice[1].name,
        price: dataForServer.laufzeit_wartungsservice[1].productdetail[0].price_total,
        qty: dataForServer.laufzeit_wartungsservice[1].productdetail[0].product_uom_qty,
      },
    ],
    laufzeit_gewahrleistung: dataForServer.laufzeit_gewahrleistung && [
      {
        id: dataForServer.laufzeit_gewahrleistung[1].id,
        name: dataForServer.laufzeit_gewahrleistung[1].name,
        price: dataForServer.laufzeit_gewahrleistung[1].productdetail[0].price_total,
        qty: dataForServer.laufzeit_gewahrleistung[1].productdetail[0].product_uom_qty,
      },
    ],
    gesamtpreis: dataForServer.gesamtpreis,
    firstName: dataForServer.firstName,
    lastName: dataForServer.lastName,
    email: dataForServer.email,
    phone: dataForServer.phone,
  };

  newDataForServer.funktionen = makeOneLevelArray(newDataForServer.funktionen);
  newDataForServer.bedienung = makeOneLevelArray(newDataForServer.bedienung);

  return newDataForServer;
};

const makeOneLevelArray = (data) => {
  const oneLevelArray = [];
  data.map((i) => {
    if (Array.isArray(i)) {
      i.map((j) => {
        oneLevelArray.push(j);
      });
    } else {
      oneLevelArray.push(i);
    }
  });
  return oneLevelArray;
};
