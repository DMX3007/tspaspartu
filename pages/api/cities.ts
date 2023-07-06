import getData from "./getData";

async function cities() {
  const cities = await getData("/auto/jsonResorts.json");
  return cities;
}

export default async function handler(req, res) {
  const city = await cities();
  res.status(200).json(city);
}
