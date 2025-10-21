import { Elysia } from 'elysia';
import { openapi } from '@elysiajs/openapi';

/**
 * API class to initialize and start the Elysia server with database support.
 *
 * This class is responsible for setting up the server and connecting to the database.
 */

export class API {
  private app: Elysia;

  constructor() {
    this.app = new Elysia()
      .get('/', () => 'Hello Elysia')
      .use(openapi())
      .listen(3000);
  }

  public start() {
    console.log(
      `🦊 Elysia is running at ${this.app.server?.hostname}:${this.app.server?.port}`,
    );
  }
}
