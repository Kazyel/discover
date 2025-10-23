import { t } from 'elysia';

export namespace GuildModel {
  export const guildCreatedBody = t.Object({
    guildId: t.String(),
    guildName: t.String(),
  });

  export type guildCreatedBody = typeof guildCreatedBody.static;
}
