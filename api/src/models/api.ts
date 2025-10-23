import { type Logger } from '@bogeychan/elysia-logger/types';
import type { AnyElysia, SingletonBase } from 'elysia';

import { Elysia } from 'elysia';
import { openapi } from '@elysiajs/openapi';
import { logger } from '@bogeychan/elysia-logger';

/**
 * API class to initialize and start the Elysia server with database support.
 * This class is responsible for setting up the server and connecting to the database.
 */

export interface APIConfig {
  port?: number;
  prefix?: string;
}

export type APIContext = SingletonBase & {
  derive: {
    readonly log: Logger;
  };
};

export type APIElysia = Elysia<string, APIContext>;

export class API {
  private app: APIElysia;
  private config: APIConfig;

  constructor(config: APIConfig = { port: 3000, prefix: '/api/v1' }) {
    this.config = config;

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
      .get('/', () => 'Welcome to the API');
  }

  /**
   * Adds a new route to the Elysia application.
   * @param route - The route to add.
   * @example
   * api.addRoute(guildRoute);
   */
  public addRoute(route: AnyElysia) {
    this.app.use(route);
  }

  /**
   * Decorate the Elysia app with a new property or method.
   * @param key - The key under which to store the value.
   * @param value - The value to store.
   * @example
   * api.decorate('myService', new MyService());
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public decorate(key: string, value: any) {
    this.app.decorate(key, value);
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

  /*
   *  Returns the Elysia application instance for type inference in plugins.
   */
  public get setup() {
    return this.app;
  }
}
