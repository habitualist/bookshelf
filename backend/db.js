/**
 * db.js — PostgreSQL connection via pg
 *
 * Uses environment variables so credentials never live in source code.
 * Supports both a direct connection string (DATABASE_URL) and
 * individual Supabase host/port/user/password/db variables.
 */

import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

// Build connection config — prefer DATABASE_URL (Supabase connection string)
const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }, // required for Supabase
    }
  : {
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "bookshelf",
    };

const pool = new Pool(poolConfig);

// Verify connection on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error("❌  Database connection failed:", err.message);
  } else {
    console.log("✅  Connected to PostgreSQL");
    release();
  }
});

export default pool;
