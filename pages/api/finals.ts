import type { NextApiRequest, NextApiResponse } from 'next';
import getData from './getData';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {url} = req.query;
    if (typeof url === 'string') {
        console.log(url.split('http://export.bgoperator.ru')[1]);
        const data = await getData(url.split('http://export.bgoperator.ru')[1]!);
        // console.log(data)
        res.status(200).json(data);
    }
}