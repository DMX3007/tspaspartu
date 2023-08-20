import { Pool, PoolConfig, QueryResultRow } from 'pg';

const dbConfig: PoolConfig = {
  user: 'admin',
  password: 'admin',
  host: 'db', // Assuming the database container is linked as 'db' in the Docker Compose network
  port: 5432,
  database: 'enrichedHotels',
};

const pool = new Pool(dbConfig);

export async function query<T = QueryResultRow>(text: string, values?: any[]): Promise<T[]> {
  const client = await pool.connect();
  try {
    //TODO: fix any T
    //@ts-ignore
    const result = await client.query<T>(text, values);
    return result.rows;
  } finally {
    client.release();
  }
}

export async function insert<T = QueryResultRow>(text: string, values?: any[]): Promise<T[]> {
  return query<T>(text, values);
}

export async function update<T = QueryResultRow>(text: string, values?: any[]): Promise<T[]> {
  return query<T>(text, values);
}

export async function remove<T = QueryResultRow>(text: string, values?: any[]): Promise<T[]> {
  return query<T>(text, values);
}

export async function createTable(): Promise<void> {
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS hotels (
    key VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    stars VARCHAR(10),
    countryKey VARCHAR(255),
    cityKey VARCHAR(255),
    cityName VARCHAR(255),
    countryName VARCHAR(255)
  );
`;

 await query(createTableQuery);
}