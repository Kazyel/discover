import type { APIContext } from '@/api/src/core/api';

import { Elysia } from 'elysia';
import { GuildService } from '@/api/src/modules/guilds/service';
import { create, retrieve } from '@/api/src/modules/guilds/model';
import { keywordsRoute } from '../keywords';

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
            guild,
          },
        });
      } catch (error) {
        log.error(`Failed to retrieve guild: ${error}`);
        return status(404, {
          data: { message: 'Guild not found', guild: [null] },
        });
      }
    },
    {
      response: {
        404: retrieve.retrieveResponse,
        200: retrieve.retrieveResponse,
      },
      body: retrieve.retrieveBody,
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

        return status(200, { data: { message: 'Guild created successfully' } });
      } catch (error) {
        log.error(`GuildService.guildCreated: ${error}`);

        return status(400, { data: { message: 'Error creating guild' } });
      }
    },
    {
      body: create.createRequestBody,
      response: {
        400: create.createResponse,
        200: create.createResponse,
      },
    },
  )
  .use(keywordsRoute);
