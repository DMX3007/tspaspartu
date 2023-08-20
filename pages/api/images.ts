// const google = require('googlethis');
import { NextApiRequest, NextApiResponse } from "next";
import google from 'googlethis';
import { HotelInfo } from '../../components/HotelInfo/HotelInfo';
import { insert } from "@/database";
import { url } from "inspector";


interface IQuery {
    hotelName: string
}

// Image Search
async function getImages(query: IQuery) {
    
    const pattern = /([A-Za-z_])'([A-Za-z_])/;
    console.log(pattern.test("hello x'x lox"))

    console.log(query.hotelName);
    const images = await google.image(query.hotelName, { safe: false });
    const urls = images.filter(im => im.width >= 600 && (im.url.endsWith('.jpg') || im.url.endsWith('.webp')) && !pattern.test(im.url));
    // .map(im => im.url);
    return urls;
}

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const images = await getImages(req.query);
    res.status(200).json(images);
  }
  
