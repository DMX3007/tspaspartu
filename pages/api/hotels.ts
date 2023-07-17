const { parseString } = require("xml2js");
import { NextApiRequest, NextApiResponse } from "next";
import getData from "./getData";

async function hotels() {
  try {
    const hotels = await getData("/yandex?action=hotels");
    return hotels;
  } catch (error) {
    console.error(error);
  }
  // const json = xmlToJson(hotels);
}

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const hotel = await hotels();

  console.log(hotel);
  res.status(200).json(hotel);
}
