import { Elysia } from 'elysia';
import { openapi } from '@elysiajs/openapi';

/**
 * API class to initialize and start the Elysia server with database support.
 *
 * This class is responsible for setting up the server and connecting to the database.
 */

export class API {
  private app: Elysia<'/api/v1'>;

  constructor() {
    this.app = new Elysia({ prefix: '/api/v1' })
      .use(openapi())
      .get('/', () => 'Welcome to the API');
  }

  public start() {
    this.app.listen(3000);

    console.log(
      `🦊 Elysia is running at ${this.app.server?.hostname}:${this.app.server?.port}`,
    );

    return this.app;
  }
}
