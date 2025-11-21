import type { APIContext } from '@/api/core/api';

import { Elysia } from 'elysia';
import { GuildService } from '@/api/modules/guilds/service';
import { GuildModel } from '@/api/modules/guilds/model';
import { keywordsRoute } from '@/api/modules/keywords';

const { readResponse } = GuildModel.read;
const { deleteResponse } = GuildModel.delete;
const { updateRequestBody, updateResponse } = GuildModel.update;
const { createRequestBody, createResponse } = GuildModel.create;

export const guildsRoute = new Elysia<string, APIContext>({ prefix: '/guilds' })
  /**
   * Health Check Endpoint
   */
  .get('/', ({ log, status }) => {
    log.info('Guild endpoint accessed');
    return status(200, { data: { message: 'Guild endpoint is working' } });
  })

  /**
   * Retrieve a Guild by ID
   */
  .get(
    '/:guildId',
    async ({ log, params, db, request, status }) => {
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
          data: {
            message: 'Guild not found',
            guilds: [],
            error: (error as Error).message,
          },
        });
      }
    },
    {
      response: {
        404: readResponse,
        200: readResponse,
      },
    },
  )

  /**
   * Retrieve All Guilds (limit 20)
   */
  .get(
    '/all',
    async ({ log, db, request, status }) => {
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
          data: {
            message: 'No guilds found',
            guilds: [],
            error: (error as Error).message,
          },
        });
      }
    },
    {
      response: {
        404: readResponse,
        200: readResponse,
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
   * Update Guild
   */
  .patch(
    '/:guildId',
    async ({ body, log, request, db, params, status }) => {
      log.info(`${request.method} | Request at: ${request.url}`);

      const { guildName } = body;
      const guildService = new GuildService(db);

      try {
        await guildService.updateGuildName({
          guildId: params.guildId,
          newName: guildName,
        });

        log.info(`Guild updated: ${guildName} (ID: ${params.guildId})`);

        return status(200, { data: { message: 'Guild updated successfully' } });
      } catch (error) {
        log.error(`GuildService.updateGuildName: ${error}`);

        return status(400, {
          data: {
            message: 'Error updating guild',
            error: (error as Error).message,
          },
        });
      }
    },
    {
      body: updateRequestBody,
      response: {
        400: updateResponse,
        200: updateResponse,
      },
    },
  )

  /**
   * Delete Guild
   */
  .delete(
    '/:guildId',
    async ({ log, params, db, request, status }) => {
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
    { response: { 404: deleteResponse, 200: deleteResponse } },
  )
  .use(keywordsRoute);
