import dotenv from "dotenv";
dotenv.config();
import pg from "pg";
const { Pool } = pg;

const pool = new Pool ({
    uri: process.env.POSTGRES_URI
});

const connectToDb = async () => {
    try {
        await pool.connect();
    } catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1);
    }
};

export { pool, connectToDb };