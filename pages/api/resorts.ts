import getData from "./getData";

async function resorts() {
  return await getData("/auto/jsonResorts.json");
}

export default async function handler(req, res) {
  const resort = await resorts();
  res.status(200).json(resort);
}
