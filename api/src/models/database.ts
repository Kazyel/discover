import { drizzle } from 'drizzle-orm/neon-http';

/**
 * DatabaseInstance class to manage the database connection.
 *
 * If you need to change the database provider, modify the generic type T and the drizzle import.
 *
 * @template T - The type of the database instance.
 * @throws Will throw an error if the DATABASE_URL environment variable is not set or if the connection fails.
 * @returns The initialized database instance
 */

export class Database<T> {
  private database: T;
  private databaseUrl = process.env.DATABASE_URL;

  constructor() {
    this.database = this.initDatabase();
  }

  private initDatabase(): T {
    if (!this.databaseUrl) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    const db = drizzle(this.databaseUrl);

    if (!db) {
      throw new Error('Failed to connect to the database');
    }

    return db as T;
  }

  public getDatabase(): T {
    if (!this.database) {
      throw new Error('Database not initialized');
    }
    return this.database;
  }
}
