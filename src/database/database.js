import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg;

// const connection = new Pool({
//     connectionString: process.env.DATABASE_URL,
//   });

const configDb = {
  connectionString: process.env.DATABASE_URL,
};

  if(process.env.MODE === "prod") configDb.ssl = true;

  export const db = new Pool(configDb);
