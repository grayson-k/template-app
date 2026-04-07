import { Pool } from "pg";

// This ensures we reuse the connection pool in development 
// to prevent hitting connection limits during hot reloads.
const globalForDb = global as unknown as { pool: Pool };

export const pool = globalForDb.pool || new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true, // Required for Neon
});

if (process.env.NODE_ENV !== "production") globalForDb.pool = pool;