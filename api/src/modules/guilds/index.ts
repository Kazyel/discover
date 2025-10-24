import type { APIContext } from '@/api/src/core/api';

import { GuildService } from '@/api/src/modules/guilds/service';
import { create, retrieve } from '@/api/src/modules/guilds/model';
import { Elysia } from 'elysia';

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
    '/:id',
    async ({ log, status, params, db, request }) => {
      log.info(`${request.method} | Request at: ${request.url}`);

      try {
        const guild = await GuildService.getGuildById({
          guildId: params.id,
          db,
        });

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

      try {
        await GuildService.createGuild({
          guildId,
          guildName,
          db,
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
  );
