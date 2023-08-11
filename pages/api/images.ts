// const google = require('googlethis');
import { NextApiRequest, NextApiResponse } from "next";
import google from 'googlethis';

// Image Search
async function getImages(query: string) {
    const images = await google.image(query, { safe: false });
    console.log(images); 
    return images;
}

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const images = await getImages(req.query);
    res.status(200).json(images);
  }
  