import { type Logger } from '@bogeychan/elysia-logger/types';
import type { AnyElysia, SingletonBase } from 'elysia';

import { Elysia } from 'elysia';
import { openapi } from '@elysiajs/openapi';
import { logger } from '@bogeychan/elysia-logger';
import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import type { Database } from './database';

/**
 * API class to initialize and start the Elysia server with database support.
 * This class is responsible for setting up the server and connecting to the database.
 */

export interface APIConfig {
  port?: number;
  prefix?: string;
}

export type APIContext = SingletonBase & {
  decorator: {
    db: Database<NeonHttpDatabase>;
  };
  derive: {
    readonly log: Logger;
  };
};

export type APIElysia = Elysia<string, APIContext>;

export class API {
  private app: APIElysia;
  private config: APIConfig;
  private database: Database<NeonHttpDatabase>;

  constructor(
    config: APIConfig = { port: 3000, prefix: '/api/v1' },
    db: Database<NeonHttpDatabase>,
  ) {
    this.config = config;
    this.database = db;

    this.app = new Elysia({ prefix: config.prefix })
      .use(openapi())
      .use(
        logger({
          autoLogging: false,
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
            },
          },
        }),
      )
      .decorate('db', this.database)
      .get('/', () => 'Welcome to the API');
  }

  /**
   * Starts the Elysia server.
   * @returns The started Elysia application instance.
   */
  public async start() {
    const { port, prefix } = this.config;
    this.app.listen(port);

    console.log(
      `🦊 Elysia is running at ${this.app.server?.hostname}:${port}${prefix}`,
    );

    return this.app;
  }

  public addRoute(route: APIElysia) {
    this.app.use(route);
  }

  /*
   *  Returns the Elysia application instance for type inference in plugins.
   */
  public get setup() {
    return this.app;
  }
}
