import axios from "axios";
import { sampleApiData } from "./sampleData";
const BASE_URL = "https://api.vays.de/api/v1";

export const fetchInitialDataApi = async () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const data = fetch(BASE_URL + "/defaultconfigurator", requestOptions)
    .then(async function (response) {
      return await response.json();
    })
    .catch(function (error) {
      throw new Error(error.response.data.message);
    });
  return data;
  // return sampleApiData;
};

export const saveDataToServerApi = async (serverData) => {
  console.log("Data being sent to server: ", serverData);

  const config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: BASE_URL + "/saveconfigurator/json ",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(serverData),
  };

  try {
    const response = await axios(config);
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error(error);
  }

  //For localhost only due to CORS issue

  // try {
  //   const response = await axios(config);
  //   const data = response.data;
  //   console.log(data);
  //   return {
  //     success: "true",
  //     result: "success",
  //     message: "data saved successfully",
  //     error: "",
  //     temp_trans_id: "3218",
  //     quotation_id: "5109",
  //     redirect_url: "MzIxOA==",
  //     redirect_quotation_url: "NTEwOQ==",
  //     checkout_url: "https://api.vays.de/devorder/checkout/MzIxOA==/NTEwOQ==",
  //   };
  // } catch (error) {
  //   console.log(error);
  //   return {
  //     success: "true",
  //     result: "success",
  //     message: "data saved successfully",
  //     error: "",
  //     temp_trans_id: "3218",
  //     quotation_id: "5109",
  //     redirect_url: "MzIxOA==",
  //     redirect_quotation_url: "NTEwOQ==",
  //     checkout_url: "https://api.vays.de/devorder/checkout/MzIxOA==/NTEwOQ==",
  //   };
  // }
};

export const fetchConfiguratorSummaryAPI = async (id1, id2) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const data = fetch(
    `https://api.vays.de/api/v1/configuratorsummery?temp_trans_id=${id1}&quotation_id=${id2}`,
    requestOptions
  )
    .then(async function (response) {
      return await response.json();
    })
    .catch(function (error) {
      throw new Error(error.response.data.message);
    });
  return data;
};

export const findDataPair = (name1, name2, initialData) => {
  const findDataArray = (obj) => {
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        const result = findDataArray(obj[i]);
        if (result) {
          return result;
        }
      }
    } else if (typeof obj === "object" && obj !== null) {
      if (
        Array.isArray(obj.data) &&
        obj.data.some((item) => item.name === name1) &&
        obj.data.some((item) => item.name === name2)
      ) {
        return obj.data;
      }

      for (const key in obj) {
        const result = findDataArray(obj[key]);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  const result = findDataArray(initialData);
  return result;
};

export const calculatePriceTotal = (data, name) => {
  const priceTotals = [];

  data.forEach((item) => {
    if (item.name === name) {
      item.productdetail.forEach((detail) => {
        priceTotals.push(detail.price_total);
      });
    }
  });
  let totalPrice = 0;
  priceTotals.forEach((i) => (totalPrice += i));
  return totalPrice;
};

export function formatGermanPrice(price) {
  // Convert the price to a number if it's not already
  const numericPrice = Number(price);

  // Format the price with German formatting
  const formattedPrice = numericPrice.toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedPrice;
}

export function findObjectByKeyValue(arrayName, key = "options", value, data) {
  if (data.hasOwnProperty(arrayName) && Array.isArray(data[arrayName])) {
    // Iterate over each item in the specified array
    for (const item of data[arrayName]) {
      // Check if the item has the desired key-value pair
      if (item[key] === value) {
        return item; // Return the matching object
      }
    }
  }
  return null; // Return null if no match found
}

export function findValueByLabel(array, label) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].label === label) {
      return array[i].value;
    }
  }
  return null;
}

export function findIdByLabel(array, label) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].label === label) {
      return array[i].id;
    }
  }
  return null;
}
