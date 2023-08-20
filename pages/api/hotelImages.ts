import { Pool } from 'pg';
import { NextApiRequest, NextApiResponse } from "next";

const pool = new Pool({
    user: 'admin',
    password: 'admin',
    host: 'db', // Assuming the database container is linked as 'db' in the Docker Compose network
    port: 5432,
    database: 'enrichedHotels',
});

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  try {
    const { rawKeys } = req.query;
    console.log('rawKeys ' + rawKeys);
    const preparedKeys = Array.isArray(rawKeys) ? rawKeys : [rawKeys];
    const client = await pool.connect();
    const imagesUrls = [];
    for (let key in preparedKeys) {
        const result = await client.query(`SELECT imageurl FROM hotels WHERE key='${key}';`);
        imagesUrls.push(result);
    }
    client.release();
    res.json(imagesUrls);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
}