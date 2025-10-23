import type { APIContext } from '../../models/api';

import { Elysia } from 'elysia';
import { GuildService } from './service';
import { GuildModel } from './model';

export const guild = new Elysia<string, APIContext>({
  prefix: '/guild',
})
  .get('/', (ctx) => {
    ctx.log.info('Guild endpoint accessed');
    return { message: 'Guild endpoint' };
  })
  .post(
    '/',
    async ({ body }) => {
      const { guildId, guildName } = body;
      return await GuildService.guildCreated({ guildId, guildName });
    },
    {
      body: GuildModel.guildCreatedBody,
    },
  );
