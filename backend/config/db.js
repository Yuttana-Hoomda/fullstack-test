import { Pool } from "pg";
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD
})

pool.on("connect", () => {
    console.log("connected to database")
})

pool.on("error", (err) => {
    console.error("Database error", err)
})

export default pool;