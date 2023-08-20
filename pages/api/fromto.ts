import getData from "./getData";
import parseJson from 'parse-json';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponseStructure } from "../../types/biblioGlobusApi";

async function fromTo() {
  const js = await getData("/auto/homepage-124331253701.js");
  if (typeof js === 'string') {
    const arr = js.slice(14, -1);
    const data = parseJson(arr);
    return data;
  }
  throw new Error('Custom error: Wrong data format from fromTo function');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponseStructure>) {
  const citiesCountryes = await fromTo().catch(error => console.log(error)) as ApiResponseStructure;
  if (citiesCountryes) {
    res.status(200).json(citiesCountryes);
  }
}
