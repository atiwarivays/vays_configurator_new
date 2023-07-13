//Function to find an object with specific name:

const findName = (obj) => {
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      const result = findName(obj[i]);
      if (result) {
        return result;
      }
    }
  } else if (typeof obj === "object" && obj !== null) {
    if (obj.hasOwnProperty("name") && obj.name === "Gewährleistung") {
      return obj;
    }

    for (const key in obj) {
      const result = findName(obj[key]);
      if (result) {
        return result;
      }
    }
  }

  return null;
};

const data = [
  {
    laufzeit_gewährleistung: [
      {
        productarray: [
          {
            data: [
              {
                id: 110385,
                name: "Gewährleistung",
                productdetail: [],
              },
              {
                id: 110386,
                name: "3 Jahre",
                productdetail: [
                  {
                    product_uom_qty: 1,
                    product_type: "product",
                    price_tax: 39.76,
                    price_unit: 209.24,
                    price_total: 249,
                    price_subtotal: 209.24,
                  },
                ],
              },
            ],
          },
          {
            data: [
              {
                id: 110382,
                name: "Gewährleistung",
                productdetail: [],
              },
              {
                id: 110384,
                name: "5 Jahre",
                productdetail: [
                  {
                    product_uom_qty: 1,
                    product_type: "product",
                    price_tax: 55.72,
                    price_unit: 293.28,
                    price_total: 349,
                    price_subtotal: 293.28,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const result = findName(data);
console.log(result);

//===================