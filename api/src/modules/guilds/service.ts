import type { GuildModel } from './model';

export abstract class GuildService {
  static async guildCreated({
    guildId,
    guildName,
  }: GuildModel.guildCreatedBody) {
    console.log(`Guild created: ${guildName} (ID: ${guildId})`);

    return { message: 'Guild created', guild: { guildId, guildName } };
  }
}
