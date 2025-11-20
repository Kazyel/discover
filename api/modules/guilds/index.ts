import type { APIContext } from '@/api/core/api';

import { Elysia } from 'elysia';
import { GuildService } from '@/api/modules/guilds/service';
import { guildCreate, guildRetrieve } from '@/api/modules/guilds/model';
import { keywordsRoute } from '@/api/modules/keywords';

const { retrieveResponse } = guildRetrieve;
const { createRequestBody, createResponse } = guildCreate;

export const guildsRoute = new Elysia<string, APIContext>({ prefix: '/guilds' })
  /**
   * Health Check Endpoint
   */
  .get('/', ({ log, status }) => {
    log.info('Guild endpoint accessed');
    return status(200, { data: { message: 'Guild endpoint is working' } });
  })

  /**
   * Retrieve Guild by ID
   */
  .get(
    '/:guildId',
    async ({ log, status, params, db, request }) => {
      log.info(`${request.method} | Request at: ${request.url}`);

      const guildService = new GuildService(db);

      try {
        const guild = await guildService.getGuildById(params.guildId);

        return status(200, {
          data: {
            message: 'Guild retrieved successfully',
            guilds: guild,
          },
        });
      } catch (error) {
        log.error(`Failed to retrieve guild: ${error}`);
        return status(404, {
          data: { message: 'Guild not found', guilds: [null] },
        });
      }
    },
    {
      response: {
        404: retrieveResponse,
        200: retrieveResponse,
      },
    },
  )

  /**
   * Retrieve All Guilds
   */
  .get(
    '/all',
    async ({ log, status, db, request }) => {
      log.info(`${request.method} | Request at: ${request.url}`);

      const guildService = new GuildService(db);

      try {
        const guilds = await guildService.getAllGuilds();

        return status(200, {
          data: {
            message: 'Guilds retrieved successfully',
            guilds,
          },
        });
      } catch (error) {
        log.error(`Failed to retrieve guilds: ${error}`);

        return status(404, {
          data: { message: 'No guilds found', guilds: [null] },
        });
      }
    },
    {
      response: {
        404: retrieveResponse,
        200: retrieveResponse,
      },
    },
  )

  /**
   * Create Guild
   */
  .post(
    '/',
    async ({ body, log, request, db, status }) => {
      log.info(`${request.method} | Request at: ${request.url}`);

      const { guildId, guildName } = body;
      const guildService = new GuildService(db);

      try {
        await guildService.createGuild({
          guildId,
          guildName,
        });

        log.info(`Guild created: ${guildName} (ID: ${guildId})`);

        return status(201, { data: { message: 'Guild created successfully' } });
      } catch (error) {
        log.error(`GuildService.guildCreated: ${error}`);

        return status(400, {
          data: {
            message: 'Error creating guild',
            error: (error as Error).message,
          },
        });
      }
    },
    {
      body: createRequestBody,
      response: {
        400: createResponse,
        201: createResponse,
      },
    },
  )
  /**
   * Delete Guild
   */
  .delete(
    '/:guildId',
    async ({ log, status, params, db, request }) => {
      log.info(`${request.method} | Request at: ${request.url}`);

      const guildService = new GuildService(db);

      try {
        await guildService.deleteGuildById(params.guildId);

        log.info(`Guild deleted: ID ${params.guildId}`);

        return status(200, {
          data: { message: 'Guild deleted successfully' },
        });
      } catch (error) {
        log.error(`Failed to delete guild: ${error}`);

        return status(404, {
          data: { message: 'Guild not found', error: (error as Error).message },
        });
      }
    },
    { response: { 404: createResponse, 200: createResponse } },
  )
  .use(keywordsRoute);
