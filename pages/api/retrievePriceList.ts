import getData from "./getData";
import type { NextApiRequest, NextApiResponse } from 'next';

async function retrievePriceList(countryToId:string, cityFromId:string) {
    return await getData(`/yandex?action=files&flt=${countryToId}&flt2=${cityFromId}&xml=11`);
}
  
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { countryToId, cityFromId } = req.query;

    try {
        let priceList = null;
        if (typeof cityFromId === 'string' && typeof countryToId === 'string') {
            priceList = await retrievePriceList(countryToId,cityFromId)
            .catch(error => console.log(error));
        }   
        res.status(200).json(priceList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}