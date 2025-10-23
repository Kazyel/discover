import { Elysia } from 'elysia';
import { GuildService } from './service';
import { GuildModel } from './model';

export const guild = new Elysia({ prefix: '/guild' })
  .get('/', () => {
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
