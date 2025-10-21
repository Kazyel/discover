import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';

import { Elysia } from 'elysia';
import { openapi } from '@elysiajs/openapi';

export class API {
  private app: Elysia;
  private database: NeonHttpDatabase | null;

  constructor() {
    this.app = new Elysia()
      .get('/', () => 'Hello Elysia')
      .use(openapi())
      .listen(3000);

    this.database = null;
  }

  public init(database?: NeonHttpDatabase) {
    if (database) {
      this.database = database;
    }

    console.log(
      `🦊 Elysia is running at ${this.app.server?.hostname}:${this.app.server?.port}`,
    );
  }
}
