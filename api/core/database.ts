import { drizzle } from 'drizzle-orm/neon-http';

function createDatabase() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  return drizzle(databaseUrl);
}

export const db = createDatabase();
export type Database = typeof db;
