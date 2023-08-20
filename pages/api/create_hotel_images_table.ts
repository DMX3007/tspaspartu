// import { NextApiRequest, NextApiResponse } from 'next';
// import { sql } from '@vercel/postgres';

import { NextApiRequest, NextApiResponse } from "next";
import { createTable, insert, update } from "@/database";
import { create } from "domain";
import { data } from '../../new'

 
// export default async function handler(
//   request: NextApiRequest,
//   response: NextApiResponse,
// ) {
//   try {
//     const result =
//       await sql`CREATE TABLE Hotel ( Name varchar(255), Owner varchar(255) );`;
//     return response.status(200).json({ result });
//   } catch (error) {
//     return response.status(500).json({ error });
//   }
// }

// export async function insertHotel(hotelData: {
//   key: string;
//   name: string;
//   stars: string;
//   countryKey: string;
//   cityKey: string;
//   cityName: string;
//   countryName: string;
// }): Promise<void> {
//   const insertQuery = `
//     INSERT INTO hotels (key, name, stars, countrykey, citykey, cityname, countryname)
//     VALUES ($1, $2, $3, $4, $5, $6, $7)
//     ON CONFLICT (key) DO NOTHING;
//   `;

//   const values = [
//     hotelData.key,
//     hotelData.name,
//     hotelData.stars,
//     hotelData.countryKey,
//     hotelData.cityKey,
//     hotelData.cityName,
//     hotelData.countryName,
//   ];

//   await insert(insertQuery, values);
// }



// const hotelData = {
//   key: '102610338399',
//   name: 'LE ZENITH',
//   stars: '3*',
//   countryKey: '100410000045',
//   cityKey: '100510000986',
//   cityName: 'Хаммамет',
//   countryName: 'Тунис',
// };

interface HotelData {
  id: string;
  url: string;
  width: number;
  height: number;
  color: string;
  preview: {
    url: string;
    width: number;
    height: number;
  };
  origin: {
    title: string;
    website: {
      name: string;
      domain: string;
      url: string;
    };
  };
}

export async function filldatabase() {
  const dat = data;
  // for (let i = 9334; i < dat.length; i++) {
  //   const response = await fetch(`http://localhost:3000/api/images/?hotelName=${dat[i]?.name} ${dat[i]?.cityName} ${dat[i]?.countryName}`);
  //   const imageUrl = await response.json() as HotelData[];
  //   const arrayValue = `ARRAY[${imageUrl.map(img => `'${img.url}'`).join(', ')}]`;
  //   console.log(i)
  //   await update(`
  //     UPDATE hotels 
  //     SET imageurl = ${arrayValue}
  //     WHERE key = '${dat[i]?.key}'
  //   ;`);
  // }
}


export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const hotel = await filldatabase();
  res.status(200).json(hotel);
}



/*LE ZENITH Хаммамет Тунис
tspapartu_1  | CENTARA GRAND AT CENTRAL PLAZA LADPRAO BANGKOK Бангкок Таиланд
tspapartu_1  | MARHABA SALEM Сусс Тунис
tspapartu_1  | JINENE Сусс Тунис
tspapartu_1  | PEACE RESORT о.Самуи Таиланд*/ 

/*
 102610001323 | CENTARA GRAND AT CENTRAL PLAZA LADPRAO BANGKOK                                                         | 4*        | 100410000051 | 100510000905 | Бангкок                                                               | Таиланд                       | 
 102610001436 | MARHABA SALEM                                                                                          | 4*        | 100410000045 | 100510000987 | Сусс                                                                  | Тунис                         | 
 102610001421 | JINENE                                                                                                 | 3*        | 100410000045 | 100510000987 | Сусс                                                       --Mo           | Тунис                
 */