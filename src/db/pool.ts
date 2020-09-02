import { Pool } from 'pg';
import 'dotenv/config';


const databaseConfig = {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: +process.env.POSTGRES_PORT!,
};

const pool = new Pool(databaseConfig);

export default pool;