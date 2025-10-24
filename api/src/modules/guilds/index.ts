import type { APIContext } from '@/api/src/core/api';

import { GuildService } from '@/api/src/modules/guilds/service';
import { GuildModel } from '@/api/src/modules/guilds/model';
import { Elysia } from 'elysia';

export const guildsRoute = new Elysia<string, APIContext>({ prefix: '/guilds' })
  .get('/', ({ log, status }) => {
    log.info('Guild endpoint accessed');
    return status(200, { data: { message: 'Guild endpoint is working' } });
  })
  .post(
    '/',
    async ({ body, log, request, db, status }) => {
      log.info(`Request at: ${request.url}`);
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
      body: GuildModel.requestBody,
      response: {
        400: GuildModel.createResponse,
        200: GuildModel.createResponse,
      },
    },
  );
