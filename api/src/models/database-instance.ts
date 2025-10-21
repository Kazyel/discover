import { drizzle } from 'drizzle-orm/neon-http';

export class DatabaseInstance<T> {
  public database: T;
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
}
