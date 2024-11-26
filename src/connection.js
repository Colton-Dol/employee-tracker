import dotenv from "dotenv";
dotenv.config();
import pg from "pg";
const { Pool } = pg;

const pool = new Pool ({
    uri: process.env.POSTGRES_URI
});