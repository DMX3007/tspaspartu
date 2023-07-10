import getData from "./getData";
import parseJson from 'parse-json';


async function fromTo() {
  const js = await getData("/auto/homepage-124331253701.js");
  const arr = js.slice(14, -1);
  const data = parseJson(arr);
  return data;
}

export default async function handler(req, res) {
  const citiesCountryes = await fromTo();
  res.status(200).json(citiesCountryes);
}
