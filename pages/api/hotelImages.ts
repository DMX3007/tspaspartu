import { Pool } from 'pg';
import { NextApiRequest, NextApiResponse } from "next";
export interface HotelUrls {
  [key: number]: { image_url: string }[];
}

const pool = new Pool({
    user: 'admin',
    password: 'admin',
    host: 'db', // Assuming the database container is linked as 'db' in the Docker Compose network
    port: 5432,
    database: 'enrichedHotels',
});

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  try {
    const hotelIds = req.body;
    const set = JSON.parse(hotelIds) as [];
    const client = await pool.connect();
    const map: HotelUrls = {};
    for (let key of set) {
      // console.log(key)
        const row = await client.query(`SELECT image_url FROM hotel_images WHERE hotel_key='${key}';`);
        // console.log(row.rows);
        map[key] = row.rows;
    }
    client.release();
    // const arr = (rows.map(img => img.rows)).flat();
    // const arr2 = arr.map(im => im[0]?.imageurl)
    res.json(map);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
}