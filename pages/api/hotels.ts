const { parseString } = require("xml2js");
import { NextApiRequest, NextApiResponse } from "next";
import getData from "./getData";

interface Hotel {
  key: string;
  name: string;
  stars: string;
  countryName: string;
  cityName: string;
  countryKey: string;
  cityKey:string
}

export async function enrichData() {
  try {
    const hotels = await getData("/yandex?action=hotelsJson");
    const cities = await getData("/auto/jsonResorts.json");
    const countries = await getData("/yandex?action=countries");

    const citiesMap = new Map(cities.map((city:any) => [city.id, city.title_ru]));
    const countriesMap = new Map(
      countries.map((country:any) => [country.id, country.title_ru])
    );

    const enrichedHotels = hotels.map((hotel:any) => ({
      ...hotel,
      cityName: citiesMap.get(hotel.cityKey) || hotel.cityKey,
      countryName: countriesMap.get(hotel.countryKey) || hotel.countryKey,
    }));

    return enrichedHotels as Hotel[];
  } catch (error) {
    console.error("Error while enriching data:", error);
    throw error;
  }
}

async function hotels() {
  try {
    const hotels = await enrichData();
    return hotels;
  } catch (error) {
    console.error(error);
  }
  // const json = xmlToJson(hotels);
}

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const hotel = await hotels();
  res.status(200).json(hotel);
}
