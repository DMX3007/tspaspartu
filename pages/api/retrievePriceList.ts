import getData from "./getData";
import type { NextApiRequest, NextApiResponse } from 'next';

async function retrievePriceList(cityFromId:string, countryToId:string) {
    console.log(`/yandex?action=files&flt=${countryToId}&flt2=${cityFromId}&xml=11`)
    return await getData(`/yandex?action=files&flt=${countryToId}&flt2=${cityFromId}&xml=11`);
}
  
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.query);
    const { countryToId, cityFromId } = req.query;

    try {
        let priceList = null;
        if (typeof cityFromId === 'string' && typeof countryToId === 'string') {
            priceList = await retrievePriceList(cityFromId,countryToId)
            .catch(error => console.log(error));
        }   
        res.status(200).json(priceList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
  