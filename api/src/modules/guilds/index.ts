import type { APIContext } from '@/api/src/core/api';

import { GuildService } from '@/api/src/modules/guilds/service';
import { GuildModel } from '@/api/src/modules/guilds/model';
import { Elysia } from 'elysia';

export const guildsRoute = new Elysia<string, APIContext>({ prefix: '/guilds' })
  .get('/', ({ log, status }) => {
    log.info('Guild endpoint accessed');

    return status(200, { data: { message: 'Guild endpoint is working' } });
  })
  .get('/:id', async ({ log, status, params, db, request }) => {
    log.info(`${request.method} | Request at: ${request.url}`);

    try {
      const guild = await GuildService.getGuildById({
        guildId: params.id,
        db,
      });

      return status(200, { data: guild });
    } catch (error) {
      log.error(`Failed to retrieve guild: ${error}`);
      return status(404, { data: { message: 'Guild not found' } });
    }
  })
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
      body: GuildModel.CreateRequestBody,
      response: {
        400: GuildModel.CreateResponse,
        200: GuildModel.CreateResponse,
      },
    },
  );
