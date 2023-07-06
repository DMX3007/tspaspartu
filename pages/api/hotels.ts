const { parseString } = require("xml2js");
import getData from "./getData";

function xmlToJson(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function hotels() {
  try {
    const hotels = await getData("/yandex?action=hotels");
    return hotels;
  } catch (error) {
    console.error(error);
  }
  // const json = xmlToJson(hotels);
}

export default async function handler(req, res) {
  const hotel = await hotels();

  console.log(hotel);
  res.status(200).json(hotel);
}
